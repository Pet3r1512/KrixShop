import { publicProcedure, router } from "../tRPC";
import { z } from "zod";

export const productRouter = router({
  getCategoriesProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.categories.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    if (products) {
      return { products: products };
    }
  }),
  getProducts: publicProcedure
    .input(
      z.object({
        start: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const products = await ctx.prisma.products.findMany({
        include: { color_quantity: true },
        skip: input.start,
        take: 10,
      });

      if (products) {
        return { message: true, products: products };
      } else {
        return { message: false, products: [] };
      }
    }),
  getProductsByCategoryAndType: publicProcedure
    .input(z.object({ category: z.string(), type: z.string() }))
    .query(async ({ input, ctx }) => {
      const productsByCategory = await ctx.prisma.products.findMany({
        where: {
          category: input.category,
          class: input.type,
        },
      });

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
    .query(async ({ input, ctx }) => {
      const product = await ctx.prisma.products.findUnique({
        where: {
          xata_id: input.xid,
        },
      });

      if (product) {
        return { message: true, item: product };
      }
    }),
  search: publicProcedure
    .input(z.object({ keywords: z.string() }))
    .query(async ({ input, ctx }) => {
      const matchedProducts = await ctx.prisma.products.findMany({
        where: {
          product_name: {
            contains: input.keywords,
            mode: "insensitive",
          },
        },
      });

      return { result: matchedProducts || [] };
    }),
});

export type AppRouter = typeof productRouter;
