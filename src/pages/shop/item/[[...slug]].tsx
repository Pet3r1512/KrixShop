import Layout from "@/components/UI/Layout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { trpc } from "@/server/utils/tRPC";
import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";
import SaleoffBadge from "@/components/Shop/SaleoffBadge";
import ItemSkeleton from "@/components/Shop/Skeleton/item-skeleton";
import { useTranslation } from "next-i18next";
import { Button } from "@/components/UI/ui/button";
import { useEffect, useState } from "react";
import QuantityCount from "@/components/Shop/Item/QuantityCount";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";
import { toast } from "@/components/UI/ui/use-toast";

type ItemParams = {
  color: string;
  size: string;
};

export default function ItemDetail() {
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();
  const [itemParams, setItemParams] = useState<ItemParams>({
    color: (router.query.color as string) || "",
    size: (router.query.size as string) || "",
  });
  const { t } = useTranslation("common");
  const { addItem } = useCart();
  const currentItemId = router.asPath.split("/")[3].split("?")[0].toString();

  const query = {
    ...router.query,
    ...(itemParams.size ? { size: itemParams.size } : {}),
    ...(itemParams.color && !itemParams.size
      ? { color: itemParams.color }
      : {}),
  };

  useEffect(() => {
    if (itemParams.color || itemParams.size) {
      router.replace(
        {
          pathname: router.pathname,
          query: query,
        },
        undefined,
        { shallow: true, scroll: false }
      );
    }
  }, [itemParams]);

  const productQuery = trpc.product.getProductById.useQuery({
    xid: currentItemId,
  });

  const handleAddToCart = () => {
    const data = productQuery.data?.item!;
    // Validate selected
    if (itemParams.color === "" || itemParams.size === "" || quantity < 1) {
      return toast({
        title: t("shop_page.toast.warning"),
        duration: 1500,
        className:
          "bg-[#fcbf49] text-white fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-2 sm:right-2 sm:top-auto sm:flex-col md:max-w-[420px] rounded-xl",
      });
    }
    // Start adding to cart
    addItem({
      xata_id: currentItemId,
      name: data.product_name!,
      selectedColor: itemParams.color,
      selectedSize: itemParams.size,
      selectedQuantity: quantity,
      price: data.saleoff
        ? data.price! - (data.saleoff * data.price) / 100
        : data.price,
    });
    setItemParams({
      color: "",
      size: "",
    });
    router.replace(
      {
        pathname: `/shop/item/${currentItemId}`,
      },
      undefined,
      { shallow: true, scroll: false }
    );
    toast({
      title: `${productQuery.data?.item.product_name} ${t(
        "shop_page.toast.success"
      )}`,
      duration: 1500,
      className:
        "bg-green-500 text-white fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-2 sm:right-2 sm:top-auto sm:flex-col md:max-w-[420px] rounded-xl",
    });
  };

  if (productQuery.isLoading) {
    return (
      <Layout pageName="Shop">
        <ItemSkeleton />
      </Layout>
    );
  }

  if (!productQuery.isLoading && !productQuery.data) {
    return (
      <Layout pageName="Shop">
        <p className="text-xl font-semibold mt-16">Product is not existed!!!</p>
      </Layout>
    );
  }

  if (productQuery.data && productQuery.isSuccess) {
    const product = productQuery.data.item;

    return (
      <Layout pageName="Shop">
        <section className="lg:mt-16 my-8 md:flex md:flex-row lg:gap-x-24 px-4 lg:px-0">
          <Image
            src={product.image}
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
                {product.product_name}
              </p>
              <div className="flex items-center gap-x-2 w-fit">
                {product.saleoff! > 0 && (
                  <SaleoffBadge
                    className="size-10 text-sm"
                    saleoff={product.saleoff || 0}
                  />
                )}
                <button
                  className={`px-2.5 py-1.5 rounded-xl font-semibold cursor-default ${
                    product.quantity > 0
                      ? "text-green-500 bg-green-100"
                      : " bg-red-100 text-red-600 "
                  }`}
                >
                  {product.quantity > 0
                    ? t("shop_page.in_stock")
                    : t("shop_page.out_stock")}
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <p
                className={cn(
                  !product.saleoff
                    ? "hidden"
                    : "text-black mr-4 text-xl lg:text-2xl font-bold"
                )}
              >
                {formatCurrency(
                  (
                    product.price -
                    (product.price * product.saleoff!) / 100
                  ).toString()
                )}
              </p>
              <p
                className={cn(
                  `lg:text-2xl font-bold`,
                  product.saleoff && "text-slate-300 line-through lg:text-xl"
                )}
              >
                {formatCurrency(product.price.toString())}
              </p>
            </div>
            <p className="lg:text-xl">{product.description}</p>
            <div className="flex flex-col justify-center gap-y-2">
              <p className="text-lg lg:text-xl font-semibold">
                {t("shop_page.colors")}
              </p>
              <div className="flex items-center gap-x-3">
                {product.color.map((color) => {
                  return (
                    <Button
                      onClick={() => {
                        setItemParams((prev) => ({
                          ...prev,
                          color: color,
                        }));
                      }}
                      style={{
                        backgroundColor: color,
                      }}
                      key={color}
                      className={`w-10 h-10 rounded-lg ${
                        color === "#fff" || color === "#FFF"
                          ? "border-2 border-black"
                          : ""
                      }`}
                    >
                      {itemParams.color !== "" && itemParams.color === color ? (
                        <span className="text-green-500 text-xl">&#10003;</span>
                      ) : (
                        <></>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <p className="text-lg lg:text-xl font-semibold">
                {t("shop_page.sizes")}
              </p>
              <div className="flex items-center gap-x-3">
                {product.clothes_size &&
                  product.clothes_size.split(",").map((size) => {
                    return (
                      <Button
                        onClick={() => {
                          setItemParams((prevParams) => ({
                            ...prevParams,
                            size: size,
                          }));
                        }}
                        key={size}
                        className="flex items-center justify-center size-10 rounded-lg font-semibold bg-white border-2 border-primary text-primary lg:text-xl"
                      >
                        {itemParams.size !== "" && itemParams.size === size ? (
                          <span className="text-green-500 text-xl">
                            &#10003;
                          </span>
                        ) : (
                          size
                        )}
                      </Button>
                    );
                  })}
                {product.footwear_size &&
                  product.footwear_size
                    .toString()
                    .split(",")
                    .map((size) => {
                      return (
                        <div
                          key={size}
                          className="flex items-center justify-center size-10 rounded-lg font-semibold"
                        >
                          {size}
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="text-lg lg:text-xl font-semibold">
                {t("shop_page.quantity")}
              </p>
              <div className="flex items-center gap-x-6 justify-between !w-full">
                <QuantityCount quantity={quantity} setQuantity={setQuantity} />
                <Button
                  onClick={handleAddToCart}
                  className="w-fit lg:text-lg flex items-center gap-x-1 pt-2 pb-1.5"
                >
                  {t("shop_page.add_to_cart")} <ShoppingCart />
                </Button>
              </div>
            </div>
          </div>
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
