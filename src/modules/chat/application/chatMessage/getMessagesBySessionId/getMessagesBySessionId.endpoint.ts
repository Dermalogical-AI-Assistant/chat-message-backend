import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { GetMessagesBySessionIdRequestParam } from "./getMessagesBySessionId.request-param";
import { GetMessagesBySessionIdRequestQuery } from "./getMessagesBySessionId.request-query";
import { GetMessagesBySessionIdQueryResponse } from "./getMessagesBySessionId.response";
import { GetMessagesBySessionIdQuery } from "./getMessagesBySessionId.query";

@ApiTags("Chat")
@Controller({
  path: "v1/messages",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class GetMessagesBySessionIdEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get chat messages by session id" })
  @Get(":sessionId")
  public get(
    @Param() { sessionId }: GetMessagesBySessionIdRequestParam,
    @Query() query: GetMessagesBySessionIdRequestQuery
  ): Promise<GetMessagesBySessionIdQueryResponse> {
    return this.queryBus.execute<GetMessagesBySessionIdQuery, GetMessagesBySessionIdQueryResponse>(
      new GetMessagesBySessionIdQuery(sessionId, query)
    );
  }
}
