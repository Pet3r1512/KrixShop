import OrderSummary from "@/components/Cart/Order/OrderSummary";
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

export type Address = {
  province: string;
  district: string;
  ward: string;
  street: string;
  note?: string;
};

type Province = {
  province_id: number;
  province_name: string;
  province_type: string;
};

export default function Shipment() {
  const [address, setAddress] = useState<Address>({
    province: "",
    district: "",
    ward: "",
    street: "",
    note: "",
  });
  const [orderId, setOrderId] = useState("");
  const { readItems } = useCart();
  const router = useRouter();

  const provincesQuery = trpc.province.getProvince.useQuery();
  const provinces = provincesQuery.isSuccess ? provincesQuery.data.results : [];

  useEffect(() => {
    if (readItems().length === 0) {
      router.push("/shop");
    }
    setOrderId(new Date().getTime().toString().slice(-8));
  }, []);

  return (
    <Layout pageName="Shipment">
      <main className="lg:my-8 my-4 min-h-screen lg:min-h-0 px-4 lg:px-0 flex">
        <div className="flex flex-col gap-y-4 lg:w-[75%]">
          <p className="text-2xl lg:text-4xl font-semibold">
            Order ID: <span className="text-lg lg:text-2xl">{orderId}</span>
          </p>
          <section className="lg:my-8">
            <div className="flex flex-col gap-y-5">
              <label className="lg:text-lg font-semibold" htmlFor="province">
                Province/City
              </label>
              <Select
                onValueChange={(e) => {
                  setAddress((prevAddress) => ({
                    ...prevAddress,
                    province: e,
                  }));
                }}
              >
                <SelectTrigger className="lg:w-1/2">
                  <SelectValue placeholder="Please select your province/city" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((item: Province) => {
                    return (
                      <SelectItem
                        key={item.province_id}
                        value={item.province_name}
                      >
                        {item.province_name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </section>
        </div>
        <OrderSummary address={address!} />
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
