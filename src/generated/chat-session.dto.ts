import { ApiProperty } from "@nestjs/swagger";

export class ChatSessionDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  createdAt: Date;
}
