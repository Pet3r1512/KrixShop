import { formatCurrency } from "@/lib/utils";
import { Button } from "../UI/ui/button";

export default function MoneyCheck({ total }: { total: number }) {
  return (
    <section className="flex flex-col gap-y-6 lg:mt-2">
      <div className="flex items-center justify-between">
        <p className="lg:text-xl font-bold">Subtotal</p>
        <p className="lg:text-lg">{formatCurrency(total.toString(), false)}</p>
      </div>
      <Button className="lg:px-4 py-1.5 w-fit lg:w-auto px-6 ml-auto lg:ml-0">
        Next Step
      </Button>
    </section>
  );
}
