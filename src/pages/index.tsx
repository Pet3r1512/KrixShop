import Categories from "@/components/Home/Categories";
import Hero from "@/components/Home/Hero";
import Layout from "@/components/UI/Layout";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <Layout pageName="Home">
      <Hero />
      <Categories />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
