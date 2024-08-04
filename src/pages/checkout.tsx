import ItemsTable from "@/components/Cart/ItemsTable";
import Layout from "@/components/UI/Layout";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Checkout() {
  return (
    <Layout pageName="Checkout">
      <main className="lg:my-8 my-4 min-h-screen lg:min-h-0 px-4 lg:px-0">
        <p className="text-2xl lg:text-4xl font-semibold">Checkout</p>
        <section className="flex flex-col lg:flex-row lg:items-center gap-x-2.5 mt-6">
          {/* Cart items */}
          <ItemsTable />
          {/* Money check */}
          <div className="lg:w-[35%]"></div>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
