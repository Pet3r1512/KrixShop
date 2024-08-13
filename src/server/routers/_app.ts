import { router } from "../tRPC";
import { productRouter } from "./product";
import { addressRouter } from "./address";

export const appRouter = router({
  product: productRouter,
  address: addressRouter,
});

export type AppRouter = typeof appRouter;
