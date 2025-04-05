import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { config } from "dotenv";
import { UserTopic } from 'src/common/topic/user.topic';
config();

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka = new Kafka({ brokers: [ process.env.KAFKA_BROKER ] });
  private consumer = this.kafka.consumer({ groupId: 'chat-message-service-group' });

  private handlers = new Map<string, (message: any) => Promise<void>>();

  constructor() {}

  async onModuleInit() {
    await this.consumer.connect();

    const topics = Object.values(UserTopic);
    for (const topic of topics) {
      await this.consumer.subscribe({ topic, fromBeginning: false });
    }

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const parsedMessage = JSON.parse(message.value.toString());
        console.log(`Received message on topic "${topic}":`, parsedMessage);

        const handler = this.handlers.get(topic);
        if (handler) {
          await handler(parsedMessage);
        } else {
          console.warn(`No handler found for topic "${topic}"`);
        }
      },
    });
  }

  registerHandler(topic: string, handler: (message: any) => Promise<void>) {
    this.handlers.set(topic, handler);
  }
}
