import { publicProcedure, router } from "../tRPC";

export const provinceRouter = router({
  getProvince: publicProcedure.query(async () => {
    const res = await fetch("https://vapi.vnappmob.com/api/province", {
      method: "GET",
    });

    const data = await res.json();

    return data;
  }),
});
