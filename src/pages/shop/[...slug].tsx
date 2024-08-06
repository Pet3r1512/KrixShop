import Layout from "@/components/UI/Layout";
import { trpc } from "@/server/utils/tRPC";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "@/components/Shop/Product-card";
import EmptyProduct from "@/components/Shop/Empty-product";
import Link from "next/link";
import CardSkeleton from "@/components/Shop/Skeleton/card-skeleton";

export type Params = {
  category: string;
  type: string;
};

export default function ProductPage() {
  const [params, setParams] = useState<Params>({
    category: "",
    type: "",
  });
  const router = useRouter();

  const productsQuery = trpc.product.getProductsByCategoryAndType.useQuery({
    category: params?.category!,
    type: params?.type!,
  });

  useEffect(() => {
    setParams({
      category: router.asPath.split("/")[2],
      type: router.asPath.split("/")[3],
    });
  }, [router.asPath]);

  return (
    <Layout pageName="Shop">
      {productsQuery.isSuccess && productsQuery.data.products.length === 0 && (
        <EmptyProduct />
      )}
      <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 grid-cols-2 justify-center lg:py-16 py-4">
        {productsQuery.isLoading &&
          !productsQuery.isError &&
          [...Array(4)].map((each) => {
            return <CardSkeleton key={each} />;
          })}
        {productsQuery.isSuccess &&
          productsQuery.data.products.map((product) => {
            return (
              <Link
                key={product.xata_id}
                href={`/shop/item/${product.xata_id}`}
              >
                <ProductCard key={product.product_name} product={product} />
              </Link>
            );
          })}
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
