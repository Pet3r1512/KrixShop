import { formatCurrency } from "@/lib/utils";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import ProductCardHover from "./Product-card-hover";

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
  id: number;
  product_name: string;
  price: number;
  category: string;
  class: string;
  color: string[];
  image: string;
  description: string;
  rated: number;
  reviews: number;
  quantity: number;
  type: string;
  clothes_size?: string | null;
  footwear_size?: number | null;
  saleoff?: number | null;
  color_quantity: ProductColor[];
};

export type ProductColor = {
  id: number;
  productId: number;
  color: string;
  quantity: number;
  product: Product;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="lg:w-64 w-40 md:w-56 py-2 lg:py-0 group relative transition-all duration-200 ease-linear shadow-2xl rounded-2xl mx-auto lg:mx-0">
      <ProductCardHover />
      <div className="h-full lg:group-hover:opacity-45 lg:p-2.5">
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={50}
          className="w-full lg:h-[300px]"
        />
        <div className="px-2.5 lg:px-0 flex flex-col gap-y-2.5 lg:gap-y-0.5">
          <p className="text-lg lg:text-xl font-semibold lg:font-bold lg:group-hover:invisible h-[49px] line-clamp-3 lg:h-none break-words">
            {product.product_name}
          </p>
          <div className="flex items-center gap-x-2.5 lg:group-hover:invisible">
            <p className="text-black text-sm lg:text-lg font-semibold">
              {formatCurrency(product.price.toString())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
