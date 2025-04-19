import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { PaginatedOutputDto } from "src/common/dto/pageOutput.dto";

export type GetMessagesBySessionIdResponse = Prisma.ChatMessageGetPayload<{
  select: {
    id: true;
    message: true;
    sender: true;
    createdAt: true,
  };
}>;

export class GetMessagesBySessionIdQueryResponse extends PaginatedOutputDto<GetMessagesBySessionIdResponse> {
  @ApiProperty({
    description: "List of chat messages by chat session id",
    isArray: true,
  })
  data: GetMessagesBySessionIdResponse[];
}
