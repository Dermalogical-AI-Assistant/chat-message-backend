import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SendMessageCommand } from "./sendMessage.command";
import { SendMessageRequestBody } from "./sendMessage.request-body";
import { AuthenGuard } from "src/common/guard/authen.guard";

@ApiTags("Chat")
@Controller({
  path: "v1/messages",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class SendMessageEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Send an message" })
  @Post()
  public create(@Body() body: SendMessageRequestBody) {
    return this.commandBus.execute<SendMessageCommand>(
      new SendMessageCommand(body)
    );
  }
}
