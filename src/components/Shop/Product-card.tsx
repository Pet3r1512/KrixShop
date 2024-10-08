import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import ProductCardHover from "./Product-card-hover";
import SaleoffBadge from "./SaleoffBadge";

export type Categories = {
  id: number;
  name: string;
  image: string;
  xata_id: string;
  xata_version: number;
  xata_createdat: Date;
  xata_updatedat: Date;
};

export type Product = {
  image: string;
  price: number;
  product_name: string;
  saleoff: number | null;
  quantity: number;
  xata_id: string;
  id: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="lg:w-64 w-40 md:w-56 py-2 lg:py-0 group relative transition-all duration-200 ease-linear shadow-2xl rounded-2xl mx-auto lg:mx-0">
      <ProductCardHover quantity={product.quantity} />
      <div
        className={`h-full lg:p-2.5 ${
          product.quantity < 1 ? "opacity-45" : "lg:group-hover:opacity-45"
        }`}
      >
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={50}
          priority
          className="w-full h-[186.23px] md:h-[260.72px] lg:h-[300px] object-contain"
        />
        <div className="px-2.5 lg:px-0 flex flex-col gap-y-2.5 lg:gap-y-0.5">
          <p className="text-lg lg:text-xl font-semibold lg:font-bold lg:group-hover:invisible h-[56px] line-clamp-3 lg:h-none break-words">
            {product.product_name}
          </p>
          <div className="flex items-center gap-x-2.5 lg:group-hover:invisible">
            {product.saleoff && product.saleoff > 0 ? (
              <p className="text-red-600 text-sm lg:text-lg font-semibold">
                {formatCurrency(
                  (
                    product.price -
                    (product.price * product.saleoff) / 100
                  ).toString()
                )}
              </p>
            ) : (
              <p className="text-black text-sm lg:text-lg font-semibold">
                {formatCurrency(product.price.toString())}
              </p>
            )}
          </div>
        </div>
      </div>
      {product.saleoff !== null && product.saleoff > 0 && (
        <SaleoffBadge
          isOutStock={product.quantity < 1}
          className="absolute -top-1.5 -left-1.5 size-10 text-sm"
          saleoff={product.saleoff}
        />
      )}
    </div>
  );
}
