import { ApiProperty } from "@nestjs/swagger";

export class GetMonthlyCrawledUrlCountsResponse {
  month: string;
  amount: number;
}

export class GetMonthlyCrawledUrlCountsQueryResponse {
  @ApiProperty({
    description: "List of monthly crawled URLs count",
    isArray: true,
  })
  data: GetMonthlyCrawledUrlCountsResponse[];
}