import { Prisma } from "@prisma/client"

export type LoginUserDto = Prisma.UserGetPayload<{
    select: {
        id: true,
        name: true,
        email: true,
        location: true,
        dob: true,
        gender: true,
        avatar: true,
        role: true,
    }
}> 