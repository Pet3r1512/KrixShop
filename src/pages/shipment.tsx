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
import { useAddress } from "@/lib/hooks/useAddress";
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
  id: string;
  name: string;
  type: number;
  typeText: string;
  slug: string;
};

export type District = {
  id: string;
  name: string;
  provinceId: string;
  typeText: string;
  slug: string;
};

export type Ward = {
  id: string;
  name: string;
  districtId: string;
  typeText: string;
  slug: string;
};

const Shipment = () => {
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
  const { getAddress } = useAddress();
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
  const provinces = provincesQuery.isSuccess ? provincesQuery.data : [];

  const districtsQuery = trpc.address.getDistricts.useQuery({
    province_code:
      address.province.toString().split("|")[1] ||
      getAddress().province.toString().split("|")[1],
  });
  const districts = districtsQuery.isSuccess ? districtsQuery.data : [];

  const wardsQuery = trpc.address.getWards.useQuery({
    district_code:
      address.district.toString().split("|")[1] ||
      getAddress().district.toString().split("|")[1],
  });
  const wards = wardsQuery.isSuccess ? wardsQuery.data : [];

  useEffect(() => {
    if (readItems().length === 0) {
      router.push("/shop");
    }
    setOrderId(new Date().getTime().toString().slice(-8));
  }, []);

  return (
    <Layout pageName="Shipment">
      <main className="lg:my-8 my-4 min-h-screen lg:min-h-0 px-4 lg:px-0">
        <p className="text-2xl lg:text-4xl font-semibold">
          Order ID: <span className="text-lg lg:text-2xl">{orderId}</span>
        </p>
        <section className="flex flex-col lg:flex-row gap-x-10 mt-6">
          <section className="w-full lg:my-8 flex flex-col gap-y-8 min-h-full">
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
                defaultValue={getAddress().province}
              >
                <SelectTrigger className="lg:w-2/3">
                  <SelectValue placeholder="Please select your province/city" />
                </SelectTrigger>
                <SelectContent>
                  {provincesQuery.isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    provinces.map((item: Province) => {
                      return (
                        <SelectItem
                          key={item.id}
                          value={item.name + "|" + item.id}
                        >
                          {item.name}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-y-3.5">
              <label className="lg:text-lg font-semibold" htmlFor="province">
                District
              </label>
              <Select
                disabled={
                  getAddress().district
                    ? false
                    : address.province !== "" && !districtsQuery.isLoading
                    ? false
                    : true
                }
                onValueChange={(e) => {
                  setAddress((prevAddress) => ({
                    ...prevAddress,
                    district: e,
                  }));
                }}
                defaultValue={getAddress().district}
              >
                <SelectTrigger className="lg:w-2/3">
                  <SelectValue placeholder="Please select your district" />
                </SelectTrigger>
                <SelectContent>
                  {districtsQuery.isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    districts.map((item: District) => {
                      return (
                        <SelectItem
                          key={item.id}
                          value={item.name + "|" + item.id}
                          defaultValue={getAddress().district}
                        >
                          {item.name}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-y-3.5">
              <label className="lg:text-lg font-semibold" htmlFor="province">
                Wards
              </label>
              <Select
                disabled={
                  getAddress().ward
                    ? false
                    : address.district !== "" && !wardsQuery.isLoading
                    ? false
                    : true
                }
                onValueChange={(e) => {
                  setAddress((prevAddress) => ({
                    ...prevAddress,
                    ward: e,
                  }));
                }}
                defaultValue={getAddress().ward}
              >
                <SelectTrigger className="lg:w-2/3">
                  <SelectValue placeholder="Please select your ward" />
                </SelectTrigger>
                <SelectContent>
                  {wardsQuery.isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    wards.map((item: Ward) => {
                      return (
                        <SelectItem
                          key={item.id}
                          value={item.name + "|" + item.id}
                        >
                          {item.name}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
            </div>
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
                defaultValue={getAddress().street}
              />
            </div>
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
                defaultValue={getAddress().note}
              />
            </div>
          </section>
          <div className="w-full lg:w-[25%] self-start mt-24 lg:mt-0">
            <OrderSummary
              isAddressDone={address.street !== "" ? true : false}
              address={address!}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Shipment;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
