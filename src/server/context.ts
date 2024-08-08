import { inferAsyncReturnType } from "@trpc/server";
import prisma from "./prisma";

export const createContext = () => {
  return {
    prisma,
  };
};

// Inferring the type of the context
export type Context = inferAsyncReturnType<typeof createContext>;
