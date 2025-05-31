import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMonthlyCrawledUrlCountsQueryResponse } from "./getMonthlyCrawledUrlCounts.response";
import { GetMonthlyCrawledUrlCountsQuery } from "./getMonthlyCrawledUrlCounts.query";
import { MongoDataCrawlService } from "../../services";
import { MONGO_DATA_CRAWL_COLLECTION } from "../../statistics.constant";

@QueryHandler(GetMonthlyCrawledUrlCountsQuery)
export class GetMonthlyCrawledUrlCountsHandler
  implements IQueryHandler<GetMonthlyCrawledUrlCountsQuery> {
  constructor(private readonly mongoDataCrawlService: MongoDataCrawlService) { }

  public async execute({ }: GetMonthlyCrawledUrlCountsQuery): Promise<GetMonthlyCrawledUrlCountsQueryResponse> {
    const response = await this.mongoDataCrawlService.getMonthlyDistinctUrlCounts(MONGO_DATA_CRAWL_COLLECTION);
    return { data: response } as GetMonthlyCrawledUrlCountsQueryResponse;
  }
}
