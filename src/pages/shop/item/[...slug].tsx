import Layout from "@/components/UI/Layout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { trpc } from "@/server/utils/tRPC";
import Image from "next/image";

export default function ItemDetail() {
  const router = useRouter();

  const productQuery = trpc.product.getProductById.useQuery({
    xid: router.asPath.split("/")[3].toString(),
  });

  return (
    <Layout pageName="Shop">
      {!productQuery.isLoading &&
      productQuery.isSuccess &&
      productQuery.data ? (
        <section className="lg:my-16 lg:flex lg:flex-row lg:gap-x-24">
          <div className="lg:w-2/5">
            <Image
              src={productQuery.data.item.image}
              alt=""
              width={1000}
              height={1000}
              quality={75}
              priority
            />
          </div>
          <div className="flex-1">
            <p className="lg:text-5xl font-bold text-primary">
              {productQuery.data.item.product_name}
            </p>
          </div>
        </section>
      ) : (
        <>No product found</>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
