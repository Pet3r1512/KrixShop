import { cn } from "@/lib/utils";

export default function SaleoffBadge({
  saleoff,
  className,
  isOutStock,
}: {
  saleoff: number;
  className?: string;
  isOutStock?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-full lg:size-16 lg:text-[20px] font-bold flex text-wrap items-center text-center justify-center bg-red-600 text-white",
        className
      )}
    >
      {isOutStock ? "Run Out" : `${saleoff}%`}
    </div>
  );
}
