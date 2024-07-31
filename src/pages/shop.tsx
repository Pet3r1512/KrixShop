import CardSkeleton from "@/components/Shop/Skeleton/card-skeleton";
import ProductCard, { Product } from "@/components/Shop/Product-card";
import Layout from "@/components/UI/Layout";
import { trpc } from "@/server/utils/tRPC";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/UI/ui/input";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);

  const productsQuery = trpc.product.getProducts.useQuery();

  useEffect(() => {
    if (productsQuery.data) {
      const delay = setTimeout(() => {
        const filteredProducts = productsQuery.data.products.filter((product) =>
          product.product_name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(filteredProducts);
        console.log(search);
      }, 750);

      return () => clearTimeout(delay);
    }
  }, [search, productsQuery.data]);

  if (productsQuery.isLoading) {
    return (
      <Layout pageName="Shop">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 grid-cols-2 justify-center lg:py-16 py-4">
          {[...Array(4)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
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
        Something goes wrong! Please come back later!!!
      </Layout>
    );
  }

  return (
    <Layout pageName="Shop">
      <div className="flex items-center gap-x-2 lg:mt-8">
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search: type keywords and wait for the results!!!"
          className="lg:text-xl lg:w-1/2 w-full"
        />
      </div>
      {searchResult.length > 0 ? (
        <section
          className={`${
            search.length === 0 ||
            (searchResult.length > 0 && search.length > 0)
              ? "grid md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 grid-cols-2 justify-center lg:py-16 py-4"
              : ""
          }`}
        >
          {searchResult.length === 0 &&
          search.length === 0 &&
          productsQuery.data
            ? productsQuery.data.products.map((product) => (
                <Link key={product.id} href={`shop/item/${product.xata_id}`}>
                  <ProductCard product={product} />
                </Link>
              ))
            : searchResult.map((product) => (
                <Link key={product.id} href={`shop/item/${product.xata_id}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
        </section>
      ) : (
        <p className="w-full text-lg lg:text-xl font-semibold">
          There is no product with{" "}
          <span className="text-primary">{search}</span> keyword!!!
        </p>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
