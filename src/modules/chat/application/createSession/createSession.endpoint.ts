import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateSessionCommand } from "./createSession.command";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { RequestUser } from "src/common/decorator/requestUser.decorator";
import { LoginUserDto } from "src/common/dto/loginUser.dto";

@ApiTags("Chat")
@Controller({
  path: "v1/session",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class CreateSessionEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Create a chat session" })
  @Post()
  public create(@RequestUser() user: LoginUserDto) {
    return this.commandBus.execute<CreateSessionCommand>(
      new CreateSessionCommand(user.id)
    );
  }
}
