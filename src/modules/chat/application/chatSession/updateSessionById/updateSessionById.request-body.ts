import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsOptional,
  MaxLength,
} from "class-validator";

export class UpdateSessionByIdRequestBody {
  @ApiPropertyOptional({
    description: "Title",
    maxLength: 255,
    example: "Beauty Bestie Session ✨",
  })
  @IsOptional()
  @MaxLength(255, { message: "Title cannot exceed 255 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  title?: string;
}
