import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SendMessageCommand } from "./sendMessage.command";
import { PrismaService } from "src/database";

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute({ body }: SendMessageCommand) {
    const { sessionId, sender, message } = body;

    const chat = await this.dbContext.chatMessage.create({
      data: {
        sessionId,
        sender,
        message,
      },
    });

    return chat;
  }
}
