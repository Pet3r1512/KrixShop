import { publicProcedure, router } from "../tRPC";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

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
  getProducts: publicProcedure.query(async () => {
    prisma.$connect();
    const products = await prisma.products.findMany({
      include: { color_quantity: true },
    });
    prisma.$disconnect();

    if (products) {
      return { message: true, products: products };
    } else {
      return { message: false, products: [] };
    }
  }),
  getProductsByCategoryAndClass: publicProcedure
    .input(z.object({ category: z.string(), class: z.string() }))
    .query(async ({ input }) => {
      prisma.$connect();
      const productsByCategory = await prisma.products.findMany({
        where: {
          category: input.category,
          class: input.class,
        },
      });
      prisma.$disconnect();

      if (productsByCategory) {
        return {
          message: true,
          category: input.category,
          class: input.class,
          products: productsByCategory,
        };
      } else {
        return { message: false, products: [] };
      }
    }),
});

export type AppRouter = typeof productRouter;
