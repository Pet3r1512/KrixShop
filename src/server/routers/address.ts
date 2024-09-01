import { publicProcedure, router } from "../tRPC";
import { z } from "zod";

export const addressRouter = router({
  getProvinces: publicProcedure.query(async () => {
    const res = await fetch("https://vapi.vnappmob.com/api/province", {
      method: "GET",
    });

    const data = await res.json();

    return data;
  }),
  getDistricts: publicProcedure
    .input(z.object({ province_id: z.string() }))
    .query(async ({ input }) => {
      const { province_id } = input;
      const res = await fetch(
        "https://vapi.vnappmob.com/api/province/district/" + province_id
      );

      const data = await res.json();

      return data;
    }),
  getWards: publicProcedure
    .input(z.object({ district_id: z.string() }))
    .query(async ({ input }) => {
      const { district_id } = input;
      const res = await fetch(
        "https://vapi.vnappmob.com/api/province/ward/" + district_id
      );

      const data = await res.json();

      return data;
    }),
});
