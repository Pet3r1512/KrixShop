import CategoryCard from "./_category-card";
import { trpc } from "../../server/utils/tRPC";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../UI/ui/carousel";
import LoadingCircle from "../UI/ui/utils/loading-circle";
import { cn } from "@/lib/utils";

type CategoryProduct = {
  id: number;
  name: string;
  image: string;
};

export default function Categories() {
  const [products, setProducts] = useState<CategoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const productsQuery = trpc.product.getCategoriesProducts.useQuery();

  useEffect(() => {
    setProducts(productsQuery.data?.products!);
  }, [productsQuery.data]);

  useEffect(() => {
    setLoading(productsQuery.isSuccess ? false : true);
  }, [productsQuery.isSuccess]);

  return (
    <section
      className={cn(
        "min-h-screen relative  items-center ",
        loading ? "flex justify-center" : ""
      )}
    >
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="flex items-center lg:px-4">
          {!products ? (
            <></>
          ) : loading ? (
            <LoadingCircle />
          ) : (
            products.map((product) => {
              return (
                <CarouselItem
                  key={product.id}
                  className="basis-1/2 md:basis-1/4"
                >
                  <CategoryCard
                    key={product.id}
                    name={product.name}
                    image={product.image}
                    id={product.id}
                  />
                </CarouselItem>
              );
            })
          )}
        </CarouselContent>
        {loading ? (
          <></>
        ) : (
          <>
            <div className="hidden lg:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:hidden">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </>
        )}
      </Carousel>
    </section>
  );
}
