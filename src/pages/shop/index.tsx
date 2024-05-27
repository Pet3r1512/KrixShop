import ProductCard, { Product } from "@/components/Shop/Product-card";
import Layout from "@/components/UI/Layout";
import { trpc } from "@/server/utils/tRPC";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);

  const productsQuery = trpc.product.getProducts.useQuery();

  useEffect(() => {
    if (productsQuery.isSuccess) {
      setProducts(productsQuery.data?.products!);
    }
  }, [productsQuery]);

  return (
    <Layout>
      <section className="grid lg:grid-cols-3 gap-y-3.5 grid-cols-2 justify-center my-4 lg:my-0">
        {productsQuery.isSuccess ? (
          products.map((product: Product) => {
            return <ProductCard key={product.product_name} product={product} />;
          })
        ) : (
          <></>
        )}
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
