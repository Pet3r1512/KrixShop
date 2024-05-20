import { publicProcedure, router } from "../tRPC";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productRouter = router({
  getCategoriesProducts: publicProcedure.query(async () => {
    prisma.$connect();
    const products = await prisma.categories.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
    prisma.$disconnect();
    if (products) {
      return { products: products };
    }
  }),
});

export type AppRouter = typeof productRouter;
