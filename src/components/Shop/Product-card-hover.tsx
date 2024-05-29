import { Eye, Star } from "lucide-react";

export default function ProductCardHover() {
  return (
    <div className="absolute hidden bg-transparent lg:group-hover:flex lg:w-64 w-24 md:w-32 h-full flex-col justify-between py-4 px-2.5 z-10">
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
  );
}
