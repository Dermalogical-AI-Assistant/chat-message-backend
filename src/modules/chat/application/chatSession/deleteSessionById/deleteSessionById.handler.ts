import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteSessionByIdCommand } from "./deleteSessionById.command";
import { PrismaService } from "src/database";
import { ValidationService } from "src/modules/services/validation.service";

@CommandHandler(DeleteSessionByIdCommand)
export class DeleteSessionByIdHandler
  implements ICommandHandler<DeleteSessionByIdCommand>
{
  constructor(
    private readonly dbContext: PrismaService,
    private readonly validationService: ValidationService,
  ) {}

  public async execute(command: DeleteSessionByIdCommand): Promise<void> {
    const sessionId = command.id;
    await this.validationService.validateChatSessionExistById(sessionId);
    await this.dbContext.chatSession.delete({ where: { id: sessionId } });
  }
}
