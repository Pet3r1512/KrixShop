import OrderSummary from "@/components/Cart/Order/OrderSummary";
import Layout from "@/components/UI/Layout";
import { useEffect } from "react";

export default function Customer() {
  // useEffect(() => {
  //     if (
  //       getAddress().province === "" &&
  //       getAddress().district === "" &&
  //       getAddress().ward === "" &&
  //       getAddress().street === ""
  //     ) {
  //       router.push("/shipment");
  //     }
  //   }, []);
  return (
    <Layout pageName="Payment">
      <main className="lg:my-8 my-4 h-[calc(100vh-100px)] lg:min-h-0 px-4 lg:px-0">
        <p className="text-2xl lg:text-4xl font-semibold">
          Receiver Information
        </p>
        <section className="flex flex-col lg:flex-row gap-x-10 mt-6">
          <div className="w-full lg:my-8 flex flex-col gap-y-8 min-h-full"></div>
          <div className="w-full lg:w-[25%] self-start mt-24 lg:mt-0">
            <OrderSummary />
          </div>
        </section>
      </main>
    </Layout>
  );
}
