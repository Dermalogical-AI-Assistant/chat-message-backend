import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { PaginatedOutputDto } from "src/common/dto/pageOutput.dto";

export type GetMyChatSessionsResponse = Prisma.ChatSessionGetPayload<{
  select: {
    id: true;
    title: true;
    createdAt: true;
  };
}>;

export class GetMyChatSessionsQueryResponse extends PaginatedOutputDto<GetMyChatSessionsResponse> {
  @ApiProperty({
    description: "List of my chat sessions",
    isArray: true,
  })
  data: GetMyChatSessionsResponse[];
}
