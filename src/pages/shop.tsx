import CardSkeleton from "@/components/Shop/Skeleton/card-skeleton";
import ProductCard from "@/components/Shop/Product-card";
import Layout from "@/components/UI/Layout";
import { trpc } from "@/server/utils/tRPC";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

export default function Shop() {
  const productsQuery = trpc.product.getProducts.useQuery();

  if (productsQuery.isLoading) {
    return (
      <Layout pageName="Shop">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 grid-cols-2 justify-center lg:py-16 py-4">
          {[...Array(4)].map((each) => {
            return <CardSkeleton key={each} />;
          })}
        </div>
      </Layout>
    );
  }

  if (
    !productsQuery.isLoading &&
    (productsQuery.isError || !productsQuery.data)
  ) {
    return (
      <Layout pageName="Shop">
        "Something goes wrong! Please come back later!!!"
      </Layout>
    );
  }

  if (!productsQuery.isLoading && productsQuery.data) {
    const products = productsQuery.data.products;

    return (
      <Layout pageName="Shop">
        <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 grid-cols-2 justify-center lg:py-16 py-4">
          {products.map((product) => {
            return (
              <Link key={product.id} href={`shop/item/${product.xata_id}`}>
                <ProductCard product={product} />
              </Link>
            );
          })}
        </section>
      </Layout>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
