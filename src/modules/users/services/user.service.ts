import { Injectable } from "@nestjs/common";
import _ from "lodash";
import { PrismaService } from "src/database";
import { UserDto } from "../user.dto";

@Injectable()
export class UserService {
  constructor(private readonly dbContext: PrismaService) { }

  public async createUser(user: UserDto) {
    await this.dbContext.user.create({
      data: {
        ...user,
        id_db: user.id,
      },
    });
  }

  public async updateUser(user: UserDto) {
    const { id, ...userData } = user;
    await this.dbContext.user.updateMany({
      where: {
        id_db: id
      },
      data: userData,
    });
  }

  public async deleteUserById(id: string) {
    await this.dbContext.user.deleteMany({
      where: {
        id_db: id,
      },
    });
  }
}
