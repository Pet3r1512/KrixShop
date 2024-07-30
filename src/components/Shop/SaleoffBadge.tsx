import { cn } from "@/lib/utils";

export default function SaleoffBadge({
  saleoff,
  className,
}: {
  saleoff: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-full lg:size-16 lg:text-[24px] font-bold flex items-center justify-center bg-red-600 text-white",
        className
      )}
    >
      {saleoff}%
    </div>
  );
}
