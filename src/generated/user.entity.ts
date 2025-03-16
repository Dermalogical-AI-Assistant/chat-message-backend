import { ApiProperty } from "@nestjs/swagger";
import { ChatSessionEntity } from "./chat-session.entity";

export class UserEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  name: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  avatar: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  phone: string | null;
  @ApiProperty({
    required: false,
  })
  email: string;
  @ApiProperty({
    required: false,
  })
  password: string;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  sessions?: ChatSessionEntity[];
}
