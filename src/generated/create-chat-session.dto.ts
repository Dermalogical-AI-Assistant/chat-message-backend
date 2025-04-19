import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChatSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}
