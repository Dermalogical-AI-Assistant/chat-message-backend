import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMyChatSessionsQueryResponse } from "./getMyChatSessions.response";
import { PrismaService } from "src/database";
import { GetMyChatSessionsQuery } from "./getMyChatSessions.query";
import { Prisma } from "@prisma/client";

@QueryHandler(GetMyChatSessionsQuery)
export class GetMyChatSessionsHandler
  implements IQueryHandler<GetMyChatSessionsQuery>
{
  constructor(private readonly dbContext: PrismaService) {}

  public async execute({
    userId: sessionId,
    query,
  }: GetMyChatSessionsQuery): Promise<GetMyChatSessionsQueryResponse> {
    const { perPage, page } = query;

    const { total, sessions } = await this.getChatSessions({ userId: sessionId, query });

    const response = {
      meta: {
        page,
        perPage,
        total,
      },
      data: sessions,
    };

    return response as GetMyChatSessionsQueryResponse;
  }

  private async getChatSessions({ userId, query }: GetMyChatSessionsQuery) {
    const { page, perPage } = query;

    const [total, sessions] = await Promise.all([
      this.dbContext.chatSession.count({
        where: {
          userId
        },
      }),
      this.dbContext.chatSession.findMany({
        where: {
          userId
        },
        select: {
          id: true,     
          title: true,     
          createdAt: true,
        },
        skip: (page - 1) * perPage,
        take: Number(perPage),
        orderBy: {
          createdAt: Prisma.SortOrder.desc,
        }
      }),
    ]);

    return { total, sessions };
  }
}
