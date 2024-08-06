import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  money: string,
  includeCurrencySymbol: boolean = true
): string {
  // Parse the money string to a number
  const amount = parseFloat(money);

  // Check if the parsed amount is a valid number
  if (isNaN(amount)) {
    throw new Error("Invalid number format");
  }

  // Format the number as currency
  const formattedAmount = (Math.floor(amount / 1000) * 1000).toLocaleString(
    "it-IT",
    {
      style: includeCurrencySymbol ? "currency" : "decimal",
      currency: "VND",
    }
  );

  return includeCurrencySymbol
    ? formattedAmount
    : formattedAmount.replace("₫", "");
}
