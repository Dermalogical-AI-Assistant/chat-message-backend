import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateSessionCommand } from "./createSession.command";
import { CreateSessionRequestBody } from "./createSession.request-body";

@ApiTags("Chat")
@Controller({
  path: "chat",
  version: "1",
})
@ApiBearerAuth()
export class CreateSessionEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Send an message" })
  @Post()
  public create(@Body() body: CreateSessionRequestBody) {
    return this.commandBus.execute<CreateSessionCommand>(
      new CreateSessionCommand(body)
    );
  }
}
