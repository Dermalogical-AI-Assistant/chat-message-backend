import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { config } from "dotenv";
config();

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private kafka = new Kafka({ brokers: [ process.env.KAFKA_BROKER ] });
  private producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
