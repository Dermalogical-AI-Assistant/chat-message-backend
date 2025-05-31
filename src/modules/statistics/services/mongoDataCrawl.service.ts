import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { config } from "dotenv";

config();

@Injectable()
export class MongoDataCrawlService implements OnModuleInit, OnModuleDestroy {
    private client: MongoClient;
    private db: Db;
    private readonly logger = new Logger(MongoDataCrawlService.name);

    constructor() {
        this.client = new MongoClient(process.env.CRAWL_DATABASE_URL);
    }

    async onModuleInit() {
        await this.client.connect();
        this.db = this.client.db(process.env.CRAWL_DATABASE_NAME);
        console.log(`Connected to MongoDB: ${process.env.CRAWL_DATABASE_NAME}!`);
    }

    async onModuleDestroy() {
        await this.client.close();
    }

    getDb(): Db {
        return this.db;
    }

    async findAll(collectionName: string, filter = {}) {
        return this.db.collection(collectionName).find(filter).toArray();
    }

    async findOne(collectionName: string, filter = {}) {
        return this.db.collection(collectionName).findOne(filter);
    }

    async getMonthlyDistinctUrlCounts(collectionName: string) {
        return this.db.collection(collectionName).aggregate([
            {
                $project: {
                    month: { $substr: ["$collected_day", 0, 7] },
                    url: 1
                }
            },
            {
                $group: {
                    _id: "$month",
                    distinctUrls: { $addToSet: "$url" }
                }
            },
            {
                $project: {
                    month: "$_id",
                    count: { $size: "$distinctUrls" },
                    _id: 0
                }
            },
            {
                $sort: { month: 1 } // Sort by month ascending
            }
        ]).toArray();
    }

}