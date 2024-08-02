import CardSkeleton from "@/components/Shop/Skeleton/card-skeleton";
import ProductCard, { Product } from "@/components/Shop/Product-card";
import Layout from "@/components/UI/Layout";
import { trpc } from "@/server/utils/tRPC";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/UI/ui/input";
import { Skeleton } from "@/components/UI/ui/skeleton";
import { useDebounce } from "@/lib/hooks/hooks";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);

  const debouncedSearch = useDebounce(search, 750);

  const productsQuery = trpc.product.getProducts.useQuery();

  useEffect(() => {
    if (productsQuery.data) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setFiltering(true);
    if (productsQuery.data?.products) {
      const filteredProducts = productsQuery.data.products.filter((product) =>
        product.product_name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      );
      setSearchResult(filteredProducts);
    }
    setFiltering(false);
  }, [debouncedSearch, productsQuery.data]);

  if (productsQuery.isLoading) {
    return (
      <Layout pageName="Shop">
        <div className="px-4 lg:px-0">
          <Skeleton className="lg:w-1/2 h-[35px] w- lg:mt-8" />
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 grid-cols-2 justify-center lg:py-16 py-4">
            {[...Array(4)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
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
      <div className="flex items-center gap-x-2 lg:mt-8 px-4 lg:px-0">
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
              ? "grid md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 grid-cols-2 justify-center lg:py-16 py-4 px-4 lg:px-0"
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
        debouncedSearch !== "" &&
        searchResult.length === 0 &&
        !filtering && (
          <p className="w-full text-lg lg:text-xl font-semibold px-4 lg:px-0">
            There is no product with{" "}
            <span className="text-primary">{debouncedSearch}</span> keyword!!!
          </p>
        )
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
