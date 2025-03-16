import { MessageSender } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateChatMessageDto {
  @ApiProperty({
    enum: MessageSender,
    required: false,
  })
  @IsOptional()
  sender?: MessageSender;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
}
