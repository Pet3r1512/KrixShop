import Layout from "@/components/UI/Layout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { trpc } from "@/server/utils/tRPC";
import ProductCard from "@/components/Shop/Product-card";

export default function ItemDetail() {
  const [product, setProduct] = useState<any>();
  const router = useRouter();

  const productQuery = trpc.product.getProductById.useQuery({
    xid: router.asPath.split("/")[3].toString(),
  });

  useEffect(() => {
    if (productQuery.isSuccess) {
      setProduct(productQuery.data.item!);
    }
    console.log(product);
  }, [productQuery]);

  return (
    <Layout>
      {product ? <ProductCard key={product.id} product={product} /> : <></>}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
