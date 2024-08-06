import { useCart } from "@/lib/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartButton() {
  const { count } = useCart();

  return (
    <Link className="relative" href={"/checkout"}>
      <div className="lg:h-12 lg:px-2.5 size-10 lg:w-auto rounded-xl lg:bg-primary lg:text-white flex items-center gap-x-2 justify-center">
        <p className="hidden lg:block font-semibold">Your Cart</p>
        <ShoppingCart />
      </div>
      {count() && count() > 0 ? (
        <p className="absolute bg-red-400 text-white font-bold rounded-full size-4 lg:size-6 text-sm flex items-center justify-center -top-1.5 lg:-top-2.5 -right-1.5 lg:-right-2.5 animate-bounce">
          {count()}
        </p>
      ) : (
        <></>
      )}
    </Link>
  );
}
