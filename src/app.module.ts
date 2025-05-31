import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { ChatModule } from "./modules/chat";
import { UserModule } from "./modules/users";
import { UserTopic } from "./common/topic/user.topic";
import { KafkaModule } from "./modules/kafka";
import { KafkaConsumerService } from "./modules/kafka/services";
import { UserService } from "./modules/users/services";
import { StatisticsModule } from "./modules/statistics/statistics.module";

@Module({
  imports: [
    ChatModule,
    PassportModule,
    UserModule,
    StatisticsModule,
    KafkaModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(
    private readonly kafkaConsumerService: KafkaConsumerService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    this.kafkaConsumerService.registerHandler(UserTopic.CREATE_USER, async (message) => {
      await this.userService.createUser(message);
    });

    this.kafkaConsumerService.registerHandler(UserTopic.UPDATE_USER, async (message) => {
      await this.userService.updateUser(message);
    });

    this.kafkaConsumerService.registerHandler(UserTopic.DELETE_USER, async (message) => {
      await this.userService.deleteUserById(message);
    });
  }
}
