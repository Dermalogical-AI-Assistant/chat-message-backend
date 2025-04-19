import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSessionCommand } from "./createSession.command";
import { PrismaService } from "src/database";
import { ChatService } from "../../../services";

@CommandHandler(CreateSessionCommand)
export class CreateSessionHandler
  implements ICommandHandler<CreateSessionCommand>
{
  constructor(
    private readonly dbContext: PrismaService,
    private readonly chatService: ChatService
  ) {}

  public async execute({ userId }: CreateSessionCommand) {
    const session = await this.dbContext.chatSession.create({
      data: {
        userId,
        title: this.chatService.generateChatSessionTitle(),
      },
    });

    return session;
  }
}
