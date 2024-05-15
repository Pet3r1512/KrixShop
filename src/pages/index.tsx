import Navigation from "@/components/Home/Navigation";
import Layout from "@/components/UI/Layout";
import Logo from "@/components/UI/Logo";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <Layout pageName="Home">
      <Logo />
      <Navigation />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
