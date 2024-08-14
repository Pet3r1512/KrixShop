import { cn } from "@/lib/utils";
import { useTranslation } from "next-i18next";

export default function SaleoffBadge({
  saleoff,
  className,
  isOutStock,
}: {
  saleoff?: number;
  className?: string;
  isOutStock?: boolean;
}) {
  const { t } = useTranslation("common");
  return (
    <div
      className={cn(
        "rounded-full lg:size-16 lg:text-[24px] font-bold flex text-wrap items-center text-center justify-center bg-red-600 text-white",
        className
      )}
    >
      {isOutStock ? (
        <span className="text-[14px] lg:text-[20px] leading-none">
          {t("shop_page.out_stock")}
        </span>
      ) : (
        `${saleoff}%`
      )}
    </div>
  );
}
