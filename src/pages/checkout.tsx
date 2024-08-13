import ItemsTable from "@/components/Cart/ItemsTable";
import Layout from "@/components/UI/Layout";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import OrderSummary from "@/components/Cart/Order/OrderSummary";

export default function Checkout() {
  const [subtotal, setSubtotal] = useState(0);

  const { readItems } = useCart();

  return (
    <Layout pageName="Checkout">
      {readItems().length === 0 ? (
        <p className="px-4 lg:px-0">Empty cart!</p>
      ) : (
        <main className="lg:my-8 my-4 min-h-screen lg:min-h-0 px-4 lg:px-0">
          <p className="text-2xl lg:text-4xl font-semibold">Checkout</p>
          <section className="flex flex-col lg:flex-row gap-x-10 mt-6">
            <ItemsTable subtotal={subtotal} setSubtotal={setSubtotal} />
            <div className="w-full lg:w-[25%] self-start mt-24 lg:mt-0">
              <OrderSummary />
            </div>
          </section>
        </main>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
