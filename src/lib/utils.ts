import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(money: string): string {
  // Parse the money string to a number
  const amount = parseFloat(money);

  // Check if the parsed amount is a valid number
  if (isNaN(amount)) {
    throw new Error("Invalid number format");
  }

  // Format the number as currency
  return amount.toLocaleString("it-IT", { style: "currency", currency: "VND" });

  {
    /* {!product.saleoff ? (
            <></>
          ) : (
            <p className="text-[#adb5bd] relative z-0 w-fit">
              {formatCurrency(
                (product.saleoff
                  ? (product.price * (100 - product.saleoff)) / 100
                  : product.price
                ).toString()
              )}
              <span className="w-full h-[0.5px] bg-[#adb5bd] absolute left-0 top-1/2 -translate-y-1/2"></span>
            </p>
          )} */
  }
}
