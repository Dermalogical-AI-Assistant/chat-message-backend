import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { GetMyChatSessionsRequestQuery } from "./getMyChatSessions.request-query";
import { GetMyChatSessionsQueryResponse } from "./getMyChatSessions.response";
import { GetMyChatSessionsQuery } from "./getMyChatSessions.query";
import { RequestUser } from "src/common/decorator/requestUser.decorator";
import { LoginUserDto } from "src/common/dto/loginUser.dto";

@ApiTags("Chat")
@Controller({
  path: "v1/my-sessions",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class GetMyChatSessionsEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get my chat sessions" })
  @Get()
  public get(
    @RequestUser() user: LoginUserDto,
    @Query() query: GetMyChatSessionsRequestQuery
  ): Promise<GetMyChatSessionsQueryResponse> {
    return this.queryBus.execute<GetMyChatSessionsQuery, GetMyChatSessionsQueryResponse>(
      new GetMyChatSessionsQuery(user.id, query)
    );
  }
}
