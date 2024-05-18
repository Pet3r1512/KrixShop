import Hero from "@/components/Home/Hero";
import Header from "@/components/UI/Header";
import Layout from "@/components/UI/Layout";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <Layout pageName="Home">
      <Hero />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
