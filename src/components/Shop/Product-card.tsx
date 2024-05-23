import { formatCurrency } from "@/lib/utils";
import { Eye, Star } from "lucide-react";
import Image from "next/image";

export type ColorQuantity = {
  productId: number;
  color: string;
  quantity: number;
};

export type Product = {
  product_name: string;
  price: number;
  saleoff: number;
  category: string;
  class: string;
  color: string[];
  type: string | null;
  clothes_size: string[];
  footwear_size: number[];
  image: string;
  description: string;
  rated: number;
  reviews: number;
  quantity: number;
  color_quantity: ColorQuantity[];
  xata_version: number;
  xata_createdat: string;
  xata_updatedat: string;
  xata_id: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="lg:w-64 w-24 md:w-32 group relative transition-all duration-200 ease-linear shadow-2xl rounded-2xl">
      <div className="absolute hidden bg-transparent group-hover:flex lg:w-64 w-24 md:w-32 h-full flex-col justify-between py-4 px-2.5 z-10">
        <div className="ml-auto flex flex-col gap-y-4 mt-8 mr-2">
          <div className="bg-white rounded-full p-1.5 text-primary shadow-xl hover:bg-primary hover:text-white transition-all duration-100 ease-linear">
            <Star />
          </div>
          <div className="bg-white rounded-full p-1.5 text-primary shadow-xl hover:bg-primary hover:text-white transition-all duration-100 ease-linear">
            <Eye />
          </div>
        </div>
        <button className="px-3.5 py-2 rounded-xl bg-white border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-150 ease-linear">
          Add to Cart
        </button>
      </div>
      <div className="h-full group-hover:opacity-45 lg:p-2.5">
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={50}
          className="w-full lg:h-[300px]"
        />
        <p className="text-xl font-bold lg:group-hover:invisible">
          {product.product_name}
        </p>
        <div className="flex items-center gap-x-2.5 lg:group-hover:invisible">
          <p className="text-black text-lg font-semibold">
            {formatCurrency(product.price.toString())}
          </p>
          {!product.saleoff ? (
            <></>
          ) : (
            <p className="text-[#adb5bd] relative z-0">
              {formatCurrency(
                (product.saleoff
                  ? (product.price * (100 - product.saleoff)) / 100
                  : product.price
                ).toString()
              )}
              <span className="w-full h-[0.5px] bg-[#adb5bd] absolute left-0 top-1/2 -translate-y-1/2"></span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
