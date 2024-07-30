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
  getProductsByCategoryAndType: publicProcedure
    .input(z.object({ category: z.string(), type: z.string() }))
    .query(async ({ input }) => {
      prisma.$connect();
      const productsByCategory = await prisma.products.findMany({
        where: {
          category: input.category,
          class: input.type,
        },
      });
      prisma.$disconnect();

      if (productsByCategory) {
        return {
          message: true,
          category: input.category,
          class: input.type,
          products: productsByCategory,
        };
      } else {
        return { message: false, products: [] };
      }
    }),
  getProductById: publicProcedure
    .input(z.object({ xid: z.string() }))
    .query(async ({ input }) => {
      prisma.$connect();
      const product = await prisma.products.findUnique({
        where: {
          xata_id: input.xid,
        },
      });
      prisma.$disconnect();

      if (product) {
        return { message: true, item: product };
      }
    }),
});

export type AppRouter = typeof productRouter;
