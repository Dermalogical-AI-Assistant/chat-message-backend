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

    console.log({ response });

    await Promise.all([
      // Create message for user
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

      // Update session createdAt timestamp (createdAt is used to determine the last activity in the session)
      this.dbContext.chatSession.update({
        where: { id: sessionId },
        data: { createdAt: new Date() },
      })
    ]);


    const chatMessageBot = await this.dbContext.chatMessage.create({
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
    });

    return chatMessageBot;
  }
}
