import { router } from "../tRPC";
import { productRouter } from "./product";
import { provinceRouter } from "./province_api";

export const appRouter = router({
  product: productRouter,
  province: provinceRouter,
});

export type AppRouter = typeof appRouter;
