import { z } from "zod";
import { publicProcedure, router } from "../tRPC";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productRouter = router({});
// export type definition of API
export type AppRouter = typeof productRouter;
