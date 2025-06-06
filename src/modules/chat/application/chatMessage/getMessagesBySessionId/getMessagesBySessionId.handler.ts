import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Prisma } from "@prisma/client";
import { GetMessagesBySessionIdQueryResponse } from "./getMessagesBySessionId.response";
import { filterString } from "src/common/utils/string";
import { PrismaService } from "src/database";
import { GetMessagesBySessionIdQuery } from "./getMessagesBySessionId.query";

@QueryHandler(GetMessagesBySessionIdQuery)
export class GetMessagesBySessionIdHandler
  implements IQueryHandler<GetMessagesBySessionIdQuery>
{
  constructor(private readonly dbContext: PrismaService) {}

  public async execute({
    sessionId,
    query,
  }: GetMessagesBySessionIdQuery): Promise<GetMessagesBySessionIdQueryResponse> {
    const { perPage, page } = query;

    const { total, messages } = await this.getMessages({ sessionId, query });

    const response = {
      meta: {
        page,
        perPage,
        total,
      },
      data: messages,
    };

    return response as GetMessagesBySessionIdQueryResponse;
  }

  private async getMessages({ sessionId, query }: GetMessagesBySessionIdQuery) {
    const { search, page, perPage } = query;

    const andWhereConditions: Prisma.Enumerable<Prisma.ChatMessageWhereInput> =
      [
        {
          sessionId,
        },
      ];

    if (search) {
      andWhereConditions.push({
        OR: [
          {
            message: filterString(search),
          },
        ],
      });
    }

    const [total, messages] = await Promise.all([
      this.dbContext.chatMessage.count({
        where: {
          AND: andWhereConditions,
        },
      }),
      this.dbContext.chatMessage.findMany({
        where: {
          AND: andWhereConditions,
        },
        select: {
          id: true,
          message: true,
          sender: true,
          createdAt: true,
        },
        skip: (page - 1) * perPage,
        orderBy: {
          createdAt: Prisma.SortOrder.desc,
        },
        take: Number(perPage),
      }),
    ]);

    return { total, messages };
  }
}
