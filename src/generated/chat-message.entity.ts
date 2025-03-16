import { MessageSender } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { ChatSessionEntity } from "./chat-session.entity";

export class ChatMessageEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  sessionId: string;
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
  @ApiProperty({
    required: false,
  })
  session?: ChatSessionEntity;
}
