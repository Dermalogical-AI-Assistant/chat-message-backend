import { Prisma } from "@prisma/client";

export const filterString = (
    search?: string,
    mode: Prisma.QueryMode = Prisma.QueryMode.insensitive,
): Prisma.StringFilter | undefined => {
    if (search) {
        return { contains: search, mode };
    }
    return undefined;
};
