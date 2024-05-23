import ProductCard, { Product } from "@/components/Shop/Product-card";
import Layout from "@/components/UI/Layout";
import { trpc } from "@/server/utils/tRPC";
import { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);

  const productsQuery = trpc.product.getProducts.useQuery();

  useEffect(() => {
    if (productsQuery.isSuccess) {
      setProducts(productsQuery.data?.products!);
    }
  }, [productsQuery]);

  return (
    <Layout>
      <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {productsQuery.isSuccess ? (
          products.map((product: Product) => {
            return <ProductCard key={product.product_name} product={product} />;
          })
        ) : (
          <></>
        )}
      </section>
    </Layout>
  );
}
