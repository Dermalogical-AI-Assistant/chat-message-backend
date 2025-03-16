import { Prisma } from "@prisma/client";

export const getOrderByDefault = (order?: string): { [key: string]: string } => {
  if (!order) {
    return {
      createdAt: Prisma.SortOrder.desc,
    };
  }
  const [field, direction] = order.split(":");

  return { [field]: direction };
};
