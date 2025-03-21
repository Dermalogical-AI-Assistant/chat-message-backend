import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSessionCommand } from "./createSession.command";
import { PrismaService } from "src/database";

@CommandHandler(CreateSessionCommand)
export class CreateUserHandler implements ICommandHandler<CreateSessionCommand> {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute({ body }: CreateSessionCommand) {
    const session = await this.dbContext.chatSession.create({
      data: {
        // userId
      },
    });

    return session;
  }
}
