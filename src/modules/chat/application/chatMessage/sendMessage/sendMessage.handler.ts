import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SendMessageCommand } from "./sendMessage.command";
import { PrismaService } from "src/database";
import { GrpcClientService } from "src/grpc/services";
import { MessageSender } from "@prisma/client";

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
  constructor(private readonly dbContext: PrismaService, private readonly grpcClient: GrpcClientService) { }

  public async execute({ body }: SendMessageCommand) {
    const { sessionId, message } = body;

    const response = await this.grpcClient.sendMessage(message);

    console.log({response});

    const [chatMessageUser, chatMessageBot] = await Promise.all([
      this.dbContext.chatMessage.create({
        data: {
          sessionId,
          sender: MessageSender.USER,
          message,
        },
        select: {
          id: true,
          message: true,
          sender: true,
          createdAt: true,
        }
      }),
      this.dbContext.chatMessage.create({
        data: {
          sessionId,
          sender: MessageSender.BOT,
          message: response.answer,
        },
        select: {
          id: true,
          message: true,
          sender: true,
          createdAt: true,
        }
      }),
    ])

    return chatMessageBot;
  }
}
