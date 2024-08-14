import OrderSummary from "@/components/Cart/Order/OrderSummary";
import Layout from "@/components/UI/Layout";
import { useAddress } from "@/lib/hooks/useAddress";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

const payments = ["Cash", "Transfer", "Momo", "Cards"];

const Payment = () => {
  const { getAddress } = useAddress();

  const router = useRouter();

  useEffect(() => {
    if (
      getAddress().province === "" &&
      getAddress().district === "" &&
      getAddress().ward === "" &&
      getAddress().street === ""
    ) {
      router.push("/shop");
    }
  }, []);

  return (
    <Layout pageName="Payment">
      <main className="lg:my-8 my-4 min-h-screen lg:min-h-0 px-4 lg:px-0 flex">
        <p className="text-2xl lg:text-4xl font-semibold">Payment</p>
        <section className="flex flex-col gap-y-4 w-full pr-5 h-full"></section>
        <div className="w-full lg:w-[25%] self-start mt-24 lg:mt-0">
          <OrderSummary />
        </div>
      </main>
    </Layout>
  );
};

export default Payment;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
