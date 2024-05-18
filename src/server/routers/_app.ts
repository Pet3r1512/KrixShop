import { router } from "../tRPC";
import { productRouter } from "./product";

export const appRouter = router({
  product: productRouter,
});

export type AppRouter = typeof appRouter;
