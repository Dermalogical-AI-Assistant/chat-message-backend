import {
  Controller,
  Delete,
  Param,
  UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteSessionByIdCommand } from "./deleteSessionById.command";
import { DeleteSessionByIdRequestParam } from "./deleteSessionById.request-param";
import { AuthenGuard } from "src/common/guard/authen.guard";

@ApiTags("Chat")
@Controller({
  path: "v1/sessions",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class DeleteSessionByIdEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Delete session by id" })
  @Delete(":id")
  public delete(@Param() { id }: DeleteSessionByIdRequestParam): Promise<void> {
    return this.commandBus.execute<DeleteSessionByIdCommand, void>(
      new DeleteSessionByIdCommand(id)
    );
  }
}
