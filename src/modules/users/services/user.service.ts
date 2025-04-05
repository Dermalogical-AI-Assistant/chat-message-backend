import { Injectable } from "@nestjs/common";
import _ from "lodash";
import { PrismaService } from "src/database";
import { UserDto } from "../user.dto";

@Injectable()
export class UserService {
  constructor(private readonly dbContext: PrismaService) {}

  public async createUser(user: UserDto) {
    await this.dbContext.user.create({
      data: user,
    });
  }

  public async updateUser(user: UserDto) {
    await this.dbContext.user.update({
      where: {
        id: user.id
      },
      data: user,
    });
  }

  public async deleteUserById(id: string) {
    await this.dbContext.user.delete({
      where: {
        id,
      },
    });
  }
}
