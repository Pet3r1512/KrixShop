import OrderSummary from "@/components/Cart/Order/OrderSummary";
import Layout from "@/components/UI/Layout";
import { Input } from "@/components/UI/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/ui/select";
import { useCart } from "@/lib/hooks/useCart";
import { useDebounce } from "@/lib/hooks/useDebounce";
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

export type Province = {
  province_id: number;
  province_name: string;
  province_type: string;
};

export type District = {
  district_id: number;
  district_name: string;
  district_type: string;
};

export type Ward = {
  ward_id: number;
  ward_name: string;
  ward_type: string;
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
  const [streetInput, setStreetInput] = useState("");
  const [note, setNote] = useState("");
  const { readItems } = useCart();
  const router = useRouter();

  const debouncedStreetInput = useDebounce(streetInput, 750);
  const debouncedNote = useDebounce(note, 750);

  useEffect(() => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      street: debouncedStreetInput,
      note: debouncedNote,
    }));
  }, [debouncedStreetInput, debouncedNote]);

  const provincesQuery = trpc.address.getProvinces.useQuery();
  const provinces = provincesQuery.isSuccess ? provincesQuery.data.results : [];

  const districtsQuery = trpc.address.getDistricts.useQuery({
    province_id: address.province.toString().split("|")[1],
  });
  const districts = districtsQuery.isSuccess ? districtsQuery.data.results : [];

  const wardsQuery = trpc.address.getWards.useQuery({
    district_id: address.district.toString().split("|")[1],
  });
  const wards = wardsQuery.isSuccess ? wardsQuery.data.results : [];

  useEffect(() => {
    if (readItems().length === 0) {
      router.push("/shop");
    }
    setOrderId(new Date().getTime().toString().slice(-8));
  }, []);

  return (
    <Layout pageName="Shipment">
      <main className="lg:my-8 my-4 min-h-screen lg:min-h-0 px-4 lg:px-0 flex">
        <div className="flex flex-col gap-y-4 lg:w-[75%] pr-5 h-full">
          <p className="text-2xl lg:text-4xl font-semibold">
            Order ID: <span className="text-lg lg:text-2xl">{orderId}</span>
          </p>
          <section className="lg:my-8 flex flex-col gap-y-8 min-h-full">
            <div className="flex flex-col gap-y-3.5">
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
                <SelectTrigger className="lg:w-2/3">
                  <SelectValue placeholder="Please select your province/city" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((item: Province) => {
                    return (
                      <SelectItem
                        key={item.province_id}
                        value={item.province_name + "|" + item.province_id}
                      >
                        {item.province_name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            {districts && address.province !== "" ? (
              <div className="flex flex-col gap-y-3.5">
                <label className="lg:text-lg font-semibold" htmlFor="province">
                  District
                </label>
                <Select
                  onValueChange={(e) => {
                    setAddress((prevAddress) => ({
                      ...prevAddress,
                      district: e,
                    }));
                  }}
                >
                  <SelectTrigger className="lg:w-2/3">
                    <SelectValue placeholder="Please select your district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((item: District) => {
                      return (
                        <SelectItem
                          key={item.district_id}
                          value={item.district_name + "|" + item.district_id}
                        >
                          {item.district_name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <></>
            )}
            {wards && address.province !== "" && address.district !== "" ? (
              <div className="flex flex-col gap-y-3.5">
                <label className="lg:text-lg font-semibold" htmlFor="province">
                  Wards
                </label>
                <Select
                  onValueChange={(e) => {
                    setAddress((prevAddress) => ({
                      ...prevAddress,
                      ward: e,
                    }));
                  }}
                >
                  <SelectTrigger className="lg:w-2/3">
                    <SelectValue placeholder="Please select your ward" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards.map((item: Ward) => {
                      return (
                        <SelectItem
                          key={item.ward_id}
                          value={item.ward_name + "|" + item.ward_id}
                        >
                          {item.ward_name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <></>
            )}
            {address.province !== "" &&
            address.district !== "" &&
            address.ward !== "" ? (
              <div className="flex flex-col gap-y-3.5">
                <label className="lg:text-lg font-semibold" htmlFor="province">
                  House Number and Street
                </label>
                <Input
                  onChange={(e) => {
                    setStreetInput(e.target.value);
                  }}
                  className="lg:w-2/3"
                  placeholder="73 Lê Văn Sỹ"
                />
              </div>
            ) : (
              <></>
            )}
            {address.province !== "" &&
            address.district !== "" &&
            address.ward !== "" &&
            address.street !== "" ? (
              <div className="flex flex-col gap-y-3.5">
                <label className="lg:text-lg font-semibold" htmlFor="province">
                  Note
                </label>
                <Input
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  className="lg:w-2/3"
                  placeholder="Block A, B..."
                />
              </div>
            ) : (
              <></>
            )}
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
