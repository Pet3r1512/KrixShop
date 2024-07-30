import Layout from "@/components/UI/Layout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { trpc } from "@/server/utils/tRPC";
import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";
import SaleoffBadge from "@/components/Shop/SaleoffBadge";
import ItemSkeleton from "@/components/Shop/Item/item-skeleton";

export default function ItemDetail() {
  const router = useRouter();

  const productQuery = trpc.product.getProductById.useQuery({
    xid: router.asPath.split("/")[3].toString(),
  });

  return (
    <Layout pageName="Shop">
      {!productQuery.isLoading && !productQuery.data ? (
        <p className="text-xl font-semibold mt-16">Product is not existed!!!</p>
      ) : productQuery.isSuccess && productQuery.data ? (
        <section className="lg:my-16 my-8 md:flex md:flex-row lg:gap-x-24 px-4 lg:px-0">
          <Image
            src={productQuery.data.item.image}
            alt=""
            width={1000}
            height={1000}
            quality={75}
            priority
            className="max-h-[350px] w-auto md:w-2/5 md:h-auto lg:w-2/5 lg:max-h-[600px] mx-auto lg:mx-0"
          />
          <div className="flex-1 flex flex-col gap-y-6 lg:gap-y-14">
            <div className="flex justify-between items-center relative gap-x-1">
              <p className="lg:text-5xl text-2xl font-bold text-primary flex-1 text-wrap">
                {productQuery.data.item.product_name}
              </p>
              <div className="flex items-center gap-x-2 w-fit">
                {productQuery.data.item.saleoff && (
                  <SaleoffBadge
                    className="size-10 text-sm"
                    saleoff={productQuery.data.item.saleoff}
                  />
                )}
                {productQuery.data.item.quantity > 0 && <InStockBadge />}
                {productQuery.data.item.quantity <= 0 && <OutStockBadge />}
              </div>
            </div>
            <div className="flex items-center">
              <p
                className={cn(
                  !productQuery.data.item.saleoff
                    ? "hidden"
                    : "text-black mr-4 text-xl lg:text-2xl font-bold"
                )}
              >
                {formatCurrency(
                  (
                    productQuery.data.item.price -
                    (productQuery.data.item.price *
                      productQuery.data.item.saleoff!) /
                      100
                  ).toString()
                )}
              </p>
              <p
                className={cn(
                  `lg:text-2xl font-bold`,
                  productQuery.data.item.saleoff &&
                    "text-slate-300 line-through lg:text-xl"
                )}
              >
                {formatCurrency(productQuery.data.item.price.toString())}
              </p>
            </div>
            <p className="lg:text-xl">{productQuery.data.item.description}</p>
            <div className="flex flex-col justify-center gap-y-2">
              <p className="text-lg lg:text-xl font-semibold">Color</p>
              <div className="flex items-center gap-x-3">
                {productQuery.data.item.color.map((color) => {
                  return (
                    <div
                      style={{
                        backgroundColor: color,
                      }}
                      className={`size-10 rounded-lg ${
                        color === "#fff" ||
                        (color === "#FFF" && "border-2 border-black")
                      }`}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <p className="text-lg lg:text-xl font-semibold">Size</p>
              <div className="flex items-center gap-x-3">
                {productQuery.data.item.clothes_size &&
                  productQuery.data.item.clothes_size.split(",").map((size) => {
                    return (
                      <div className="flex items-center justify-center size-10 border-2 border-black rounded-lg font-semibold">
                        {size}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <ItemSkeleton />
      )}
    </Layout>
  );
}

function InStockBadge() {
  return (
    <button className="px-2.5 py-1.5 rounded-xl text-green-500 bg-green-100 font-semibold cursor-default">
      In Stock
    </button>
  );
}

function OutStockBadge() {
  return (
    <button className="px-2.5 py-1.5 rounded-xl bg-red-100 text-red-600 font-semibold cursor-default">
      Run Out
    </button>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
