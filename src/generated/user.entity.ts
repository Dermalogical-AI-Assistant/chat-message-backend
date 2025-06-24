import { Gender, RoleType } from "@prisma/client";
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
  id_db: string;
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
  })
  email: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  location: string | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
    nullable: true,
  })
  dob: Date | null;
  @ApiProperty({
    enum: Gender,
    required: false,
  })
  gender: Gender;
  @ApiProperty({
    enum: RoleType,
    required: false,
  })
  role: RoleType;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  sessions?: ChatSessionEntity[];
}
