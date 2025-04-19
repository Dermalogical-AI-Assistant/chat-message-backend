import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateSessionByIdCommand } from "./updateSessionById.command";
import { UpdateSessionByIdRequestBody } from "./updateSessionById.request-body";
import { PrismaService } from "src/database";
import { ValidationService } from "src/modules/services";

@CommandHandler(UpdateSessionByIdCommand)
export class UpdateUserByIdHandler
  implements ICommandHandler<UpdateSessionByIdCommand>
{
  constructor(
    private readonly dbContext: PrismaService,
    private readonly validationService: ValidationService
  ) {}

  public async execute(command: UpdateSessionByIdCommand): Promise<void> {
    return this.updateUserById(command.id, command.body);
  }

  private async updateUserById(
    id: string,
    body: UpdateSessionByIdRequestBody
  ): Promise<void> {
    const { title } = body;

    await this.validationService.validateChatSessionExistById(id);

    await this.dbContext.chatSession.update({
      where: { id },
      data: {
        title,
      },
    });
  }
}
