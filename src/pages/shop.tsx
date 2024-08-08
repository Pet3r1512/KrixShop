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
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Button } from "@/components/UI/ui/button";
import { LoaderCircle } from "lucide-react";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [range, setRange] = useState({ start: 0 });

  const debouncedSearch = useDebounce(search, 500);

  const productsQuery = trpc.product.getProducts.useQuery(range);
  const searchQuery = trpc.product.search.useQuery({ keywords: search });

  useEffect(() => {
    if (productsQuery.isSuccess && productsQuery.data) {
      setProducts((prev) => [...prev, ...productsQuery.data.products!]);
      setLoading(false);
    }
  }, [range, productsQuery.data]);

  useEffect(() => {
    setSearchResult([]);
    if (searchQuery.data?.result) {
      setSearchResult(searchQuery.data.result);
    }
  }, [debouncedSearch, searchQuery.data]);

  if (productsQuery.isError) {
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
          className="lg:text-xl md:w-2/3 lg:w-1/2 w-full"
        />
        <Button className={`${searchQuery.isLoading ? "md:block" : "hidden"}`}>
          <LoaderCircle className="animate-spin" />
        </Button>
      </div>
      {search !== "" && searchResult.length > 0 ? (
        <section
          className={`${
            search.length === 0 ||
            (searchResult.length > 0 && search.length > 0)
              ? "grid md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 grid-cols-2 justify-center lg:py-16 py-4 px-4 lg:px-0"
              : ""
          }`}
        >
          {searchResult.map((product) => (
            <Link key={product.id} href={`shop/item/${product.xata_id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </section>
      ) : debouncedSearch !== "" &&
        searchResult.length === 0 &&
        !searchQuery.isFetching ? (
        <p className="w-full text-lg lg:text-xl font-semibold px-4 lg:px-0">
          There is no product with{" "}
          <span className="text-primary">{debouncedSearch}</span> keyword!!!
        </p>
      ) : (
        !searchQuery.isLoading && (
          <>
            <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-3.5 grid-cols-2 justify-center lg:py-16 py-4 px-4 lg:px-0 min-h-[1465px]">
              {products.length > 0 &&
                products.map((product) => {
                  return (
                    <Link
                      key={product.id}
                      href={`shop/item/${product.xata_id}`}
                    >
                      <ProductCard product={product} />
                    </Link>
                  );
                })}
              {productsQuery.isLoading &&
                [...Array(4)].map((_, index) => <CardSkeleton key={index} />)}
            </section>
            <Button
              disabled={
                (productsQuery.data &&
                  productsQuery.data.products.length < 10) ||
                productsQuery.isLoading
                  ? true
                  : false
              }
              onClick={() => {
                setRange({
                  start: range.start + 10,
                });
              }}
              className="w-28 px-5 py-2 rounded-lg mx-auto my-5"
            >
              {productsQuery.isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Load More"
              )}
            </Button>
          </>
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
