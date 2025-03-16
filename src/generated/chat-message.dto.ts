import { MessageSender } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class ChatMessageDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    enum: MessageSender,
    required: false,
  })
  sender: MessageSender;
  @ApiProperty({
    required: false,
  })
  message: string;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  createdAt: Date;
}
