import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateSessionByIdCommand } from "./updateSessionById.command";
import { UpdateSessionByIdRequestBody } from "./updateSessionById.request-body";
import { UpdateSessionByIdRequestParam } from "./updateSessionById.request-param";
import { AuthenGuard } from "src/common/guard/authen.guard";

@ApiTags("Chat")
@Controller({
  path: "v1/sessions",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class UpdateSessionByIdEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Update session by id" })
  @Put(":id")
  public update(
    @Param() { id }: UpdateSessionByIdRequestParam,
    @Body() body: UpdateSessionByIdRequestBody
  ): Promise<void> {
    return this.commandBus.execute<UpdateSessionByIdCommand, void>(
      new UpdateSessionByIdCommand(id, body)
    );
  }
}
