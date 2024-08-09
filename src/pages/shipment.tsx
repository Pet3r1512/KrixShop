import Layout from "@/components/UI/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/ui/select";
import { useCart } from "@/lib/hooks/useCart";
import { trpc } from "@/server/utils/tRPC";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Address = {
  province: string;
  district?: string;
  ward?: string;
  street?: string;
  note?: string;
};

type Province = {
  province_id: number;
  province_name: string;
  province_type: string;
};

export default function Shipment() {
  const [address, setAddress] = useState<Address>();
  const { readItems } = useCart();
  const router = useRouter();
  const orderId = new Date().getTime();

  const provincesQuery = trpc.province.getProvince.useQuery();
  const provinces = provincesQuery.isSuccess ? provincesQuery.data.results : [];

  useEffect(() => {
    if (readItems().length === 0) {
      router.push("/shop");
    }
  }, []);

  return (
    <Layout pageName="Shipment">
      <section>
        {"Your order id: " + orderId ? orderId : ""}
        <label htmlFor="province">Please Select Your Province/City</label>
        <Select>
          <SelectTrigger className="lg:w-1/2">
            <SelectValue placeholder="Province/City" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((item: Province) => {
              return (
                <SelectItem key={item.province_id} value={item.province_name}>
                  {item.province_name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
