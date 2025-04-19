import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database";

@Injectable()
export class ValidationService {
  constructor(private readonly dbContext: PrismaService) {}

  public async validateChatSessionExistById(id: string) {
    const session = await this.dbContext.chatSession.findUnique({
      where: { id },
      select: { id: true },
    });
    console.log({ session });

    if (!session) {
      throw new NotFoundException("Session not found!");
    }
    return session;
  }
}
