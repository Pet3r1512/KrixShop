import OrderSummary from "@/components/Cart/Order/OrderSummary";
import OrderSummaryMobile from "@/components/Cart/Order/OrderSummaryMobile";
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
import { useCustomer } from "@/lib/hooks/useCustomer";
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

export type CustomerInfo = {
  name: string;
  phone_number: string;
};

const Shipment = () => {
  const { readItems } = useCart();
  const { setCustomer, getCustomer } = useCustomer();
  const { getAddress } = useAddress();
  const [address, setAddress] = useState<Address>(getAddress());
  const [orderId, setOrderId] = useState("");
  const [streetInput, setStreetInput] = useState("");
  const [note, setNote] = useState("");
  const [customerName, setCustomerName] = useState(getCustomer().name);
  const [customerPhone, setCustomerPhone] = useState(
    getCustomer().phone_number
  );
  const router = useRouter();

  const debouncedStreetInput = useDebounce(streetInput, 750);
  const debouncedNote = useDebounce(note, 750);
  const debounceCustomerName = useDebounce(customerName, 750);
  const debouncePhoneNumber = useDebounce(customerPhone, 750);

  useEffect(() => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      street: debouncedStreetInput,
      note: debouncedNote,
    }));
    setCustomer({
      name: debounceCustomerName,
      phone_number: debouncePhoneNumber,
    });
    console.log(getCustomer());
  }, [
    debouncedStreetInput,
    debouncedNote,
    debounceCustomerName,
    debouncePhoneNumber,
  ]);

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
    if (address) {
      setAddress(address);
    }
  }, []);

  return (
    <Layout pageName="Shipment">
      <main className="lg:my-8 my-4 h-[calc(100dvh-100px)] sm:h-[calc(100vh-150px)] lg:min-h-0 px-4 lg:px-0">
        <p className="text-2xl lg:text-4xl font-semibold">
          Order ID: <span className="text-lg lg:text-2xl">{orderId}</span>
        </p>
        <section className="flex flex-col lg:flex-row gap-x-10 mt-6">
          <section className="w-full lg:my-8 flex flex-col gap-y-5 lg:gap-y-8 min-h-full">
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
                          key={item.province_id}
                          value={item.province_name + "|" + item.province_id}
                        >
                          {item.province_name}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-y-3.5">
              <label className="lg:text-lg font-semibold" htmlFor="district">
                District
              </label>
              <Select
                disabled={districtsQuery.isLoading || districts.length === 0}
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
                          key={item.district_id}
                          value={item.district_name + "|" + item.district_id}
                          defaultValue={getAddress().district}
                        >
                          {item.district_name}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-y-3.5">
              <label className="lg:text-lg font-semibold" htmlFor="ward">
                Wards
              </label>
              <Select
                disabled={
                  wards.length === 0
                    ? true
                    : getAddress().ward
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
                  <SelectValue
                    placeholder={
                      address.district && wards.length === 0
                        ? "This district has no wards!"
                        : "Please select your ward"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {wardsQuery.isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    wards.map((item: Ward) => {
                      return (
                        <SelectItem
                          key={item.ward_id}
                          value={item.ward_name + "|" + item.ward_id}
                        >
                          {item.ward_name}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-y-3.5">
              <label className="lg:text-lg font-semibold" htmlFor="street">
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
              <label className="lg:text-lg font-semibold" htmlFor="note">
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
            <div className="flex flex-col gap-y-3.5">
              <label className="lg:text-lg font-semibold" htmlFor="name">
                {"Receiver's Name"}
              </label>
              <Input
                onChange={(e) => {
                  setCustomerName(e.target.value);
                }}
                className="lg:w-2/3"
                placeholder="John Doe"
                defaultValue={getCustomer().name}
              />
            </div>
            <div className="flex flex-col gap-y-3.5">
              <label
                className="lg:text-lg font-semibold"
                htmlFor="phone_number"
              >
                Phone Number
              </label>
              <Input
                onChange={(e) => {
                  const input = e.target.value;
                  const cleanedInput = input.replace(/\D/g, "");
                  if (cleanedInput.length <= 10) {
                    setCustomerPhone(cleanedInput);
                  }
                }}
                value={customerPhone}
                pattern="[0-9]{10}"
                maxLength={10}
                className="lg:w-2/3"
                placeholder="076 000 xxxx"
              />
            </div>
          </section>
          <div className="w-full lg:w-[25%] self-start mt-24 lg:mt-0">
            <OrderSummary address={address} />
          </div>
        </section>
      </main>
      <OrderSummaryMobile address={address} />
    </Layout>
  );
};

export default Shipment;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
