import OrderSummary from "@/components/Cart/Order/OrderSummary";
import Cards, { CardInfo } from "@/components/Cart/Payment/Instruction/Cards";
import Cash from "@/components/Cart/Payment/Instruction/Cash";
import PaymentMethods from "@/components/Cart/Payment/PaymentMethods";
import Layout from "@/components/UI/Layout";
import { useAddress } from "@/lib/hooks/useAddress";
import { useCart } from "@/lib/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type PayMethod = "COD" | "Cards";

export const initCardInfo = {
  bank: "",
  name: "",
  cardNumber: {
    number: "",
    checked: false,
  },
  cvv: "",
  expired: {
    month: "",
    year: "",
  },
};

const Payment = () => {
  const [payMethod, setPayMethod] = useState<PayMethod>("COD");
  const [typedInfo, setTypedInfo] = useState<CardInfo>(initCardInfo);
  const { getAddress } = useAddress();

  const router = useRouter();
  const { getCurrentOrder } = useCart();

  const PayMethodInstructionView: Record<PayMethod, JSX.Element> = {
    COD: (
      <Cash subtotal={formatCurrency(getCurrentOrder().subtotal.toString())} />
    ),
    Cards: <Cards typedInfo={typedInfo} setTypedInfo={setTypedInfo} />,
  };

  useEffect(() => {
    if (
      getAddress().province === "" &&
      getAddress().district === "" &&
      getAddress().ward === "" &&
      getAddress().street === ""
    ) {
      router.push("/shipment");
    }
  }, []);

  return (
    <Layout pageName="Payment">
      <main className="lg:my-8 my-4 h-[calc(100vh-100px)] sm:h-[calc(100vh-150px)] lg:min-h-0 px-4 lg:px-0">
        <p className="text-2xl lg:text-4xl font-semibold">Pay Method</p>
        <section className="flex flex-col lg:flex-row gap-x-10 mt-6">
          <div className="w-full lg:my-8 flex flex-col gap-y-5 lg:gap-y-8 min-h-full">
            <PaymentMethods setPayMethod={setPayMethod} />
            {PayMethodInstructionView[payMethod]}
          </div>
          <div className="w-full lg:w-[25%] self-start mt-24 lg:mt-0">
            <OrderSummary payMethod={payMethod} typedInfo={typedInfo} />
          </div>
        </section>
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
