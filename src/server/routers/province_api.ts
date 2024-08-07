import { publicProcedure, router } from "../tRPC";

export const provinceRouter = router({
  getProvince: publicProcedure.query(async () => {}),
});
