import Layout from "@/components/UI/Layout";
import { trpc } from "@/server/utils/tRPC";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Skeleton } from "@/components/UI/ui/skeleton";
import { useRouter } from "next/router";
import ProductCard, { Product } from "@/components/Shop/Product-card";
import EmptyProduct from "@/components/Shop/Empty-product";

export type Params = {
  category: string;
  type: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([]);
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
    if (productsQuery.isSuccess) {
      setProducts(productsQuery.data?.products!);
    }
  }, [productsQuery]);

  useEffect(() => {
    setParams({
      category: router.asPath.split("/")[2],
      type: router.asPath.split("/")[3],
    });
  }, [router.asPath]);

  return (
    <Layout pageName="Shop">
      {productsQuery.isSuccess && products.length === 0 && <EmptyProduct />}
      <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 grid-cols-2 justify-center lg:py-16 py-4">
        {productsQuery.isLoading && !productsQuery.isError && (
          <>
            <Skeleton className="lg:w-64 w-40 md:w-56 lg:h-[392.75px] h-[275.84px] md:h-[349.97px] mx-auto lg:mx-0" />
            <Skeleton className="lg:w-64 w-40 md:w-56 lg:h-[392.75px] h-[275.84px] md:h-[349.97px] mx-auto lg:mx-0" />
            <Skeleton className="lg:w-64 w-40 md:w-56 lg:h-[392.75px] h-[275.84px] md:h-[349.97px] mx-auto lg:mx-0" />
          </>
        )}
        {productsQuery.isSuccess &&
          products.map((product: Product) => {
            return <ProductCard key={product.product_name} product={product} />;
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
