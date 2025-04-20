import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { DeleteMyChatSessionsQuery } from "./deleteMyChatSessions.query";

@QueryHandler(DeleteMyChatSessionsQuery)
export class DeleteMyChatSessionsHandler
  implements IQueryHandler<DeleteMyChatSessionsQuery>
{
  constructor(
    private readonly dbContext: PrismaService,
  ) {}

  public async execute({
    userId,
  }: DeleteMyChatSessionsQuery) {
    await this.dbContext.chatSession.deleteMany({
      where: {userId}
    });
  }
}
