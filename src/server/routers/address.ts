import { publicProcedure, router } from "../tRPC";
import { z } from "zod";

export const addressRouter = router({
  getProvinces: publicProcedure.query(async () => {
    const res = await fetch("https://open.oapi.vn/location/provinces?size=63", {
      method: "GET",
    });

    const data = await res.json();

    return data.data;
  }),
  getDistricts: publicProcedure
    .input(z.object({ province_code: z.string() }))
    .query(async ({ input }) => {
      const { province_code } = input;
      const res = await fetch(
        "https://open.oapi.vn/location/districts?provinceId=" + province_code
      );

      const data = await res.json();

      return data.data;
    }),
  getWards: publicProcedure
    .input(z.object({ district_code: z.string() }))
    .query(async ({ input }) => {
      const { district_code } = input;
      const res = await fetch(
        "https://open.oapi.vn/location/wards?districtId= " + district_code
      );

      const data = await res.json();

      return data.data;
    }),
});
