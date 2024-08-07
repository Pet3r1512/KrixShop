import Layout from "@/components/UI/Layout";
import { useCart } from "@/lib/hooks/useCart";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Shipment() {
  const { readItems } = useCart();
  const router = useRouter();
  const orderId = new Date().getTime();

  useEffect(() => {
    if (readItems().length === 0) {
      router.push("/shop");
    }
  }, []);

  return <Layout pageName="Shipment">{"Your order id: " + orderId}</Layout>;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
