import { Controller, Delete, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { DeleteMyChatSessionsQuery } from "./deleteMyChatSessions.query";
import { RequestUser } from "src/common/decorator/requestUser.decorator";
import { LoginUserDto } from "src/common/dto/loginUser.dto";

@ApiTags("Chat")
@Controller({
  path: "v1/my-sessions",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class DeleteMyChatSessionsEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Delete my chat sessions" })
  @Delete()
  public delete(
    @RequestUser() user: LoginUserDto,
  ) {
    return this.queryBus.execute<DeleteMyChatSessionsQuery>(
      new DeleteMyChatSessionsQuery(user.id)
    );
  }
}
