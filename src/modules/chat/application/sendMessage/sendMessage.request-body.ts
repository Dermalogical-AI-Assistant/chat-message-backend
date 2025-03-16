import { ApiProperty } from "@nestjs/swagger";
import { MessageSender } from "@prisma/client";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsString,
  MaxLength,
} from "class-validator";

export class SendMessageRequestBody {
  @ApiProperty({
    description: "Session ID",
    maxLength: 255,
  })
  @IsString()
  sessionId: string;

  @ApiProperty({
    description: "Message sender",
    example: MessageSender.USER,
  })
  @IsEnum(MessageSender)
  sender: MessageSender;


  @ApiProperty({
    description: "Message",
    maxLength: 30000,
    example: "What is the ingredients of moisturizer?",
  })
  @MaxLength(30000, { message: "Location cannot exceed 30000 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  message: string;
}
