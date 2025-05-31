import { Controller, Get, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { GetMonthlyCrawledUrlCountsQueryResponse } from "./getMonthlyCrawledUrlCounts.response";
import { GetMonthlyCrawledUrlCountsQuery } from "./getMonthlyCrawledUrlCounts.query";
import { RoleGuard } from "src/common/role/role.guard";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";

@ApiTags("Statistics")
@Controller({
  path: "v1/urls-monthly",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class GetMonthlyCrawledUrlCountsEndpoint {
  constructor(protected queryBus: QueryBus) { }

  @ApiOperation({ description: "Get monthly crawled urls from other sources (e.g. LookFantastics)" })
  @Get()
  public get(): Promise<GetMonthlyCrawledUrlCountsQueryResponse> {
    return this.queryBus.execute<GetMonthlyCrawledUrlCountsQuery, GetMonthlyCrawledUrlCountsQueryResponse>(
      new GetMonthlyCrawledUrlCountsQuery()
    );
  }
}
