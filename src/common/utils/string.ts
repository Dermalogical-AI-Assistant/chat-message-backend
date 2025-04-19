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
