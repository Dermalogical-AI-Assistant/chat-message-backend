import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database";

@Injectable()
export class ValidationService {
  constructor(private readonly dbContext: PrismaService) {}
}
