import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { ChatMessageEntity } from "./chat-message.entity";

export class ChatSessionEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  userId: string | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  createdAt: Date;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  user?: UserEntity | null;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  messages?: ChatMessageEntity[];
}
