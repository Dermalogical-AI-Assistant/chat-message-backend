import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';
export const filterString = (
    search?: string,
    mode: Prisma.QueryMode = Prisma.QueryMode.insensitive,
): Prisma.StringFilter | undefined => {
    if (search) {
        return { contains: search, mode };
    }
    return undefined;
};

export const hashString = (password: string) => {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}