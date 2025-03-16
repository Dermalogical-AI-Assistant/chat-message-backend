import { MessageSender } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChatMessageDto {
  @ApiProperty({
    enum: MessageSender,
  })
  @IsNotEmpty()
  sender: MessageSender;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
