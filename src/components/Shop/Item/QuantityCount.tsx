import { Button } from "@/components/UI/ui/button";
import { useState } from "react";

export default function QuantityCount() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex items-center gap-x-1">
      <Button
        className="text-xl w-[35px]"
        onClick={() => {
          setQuantity(quantity - 1);
        }}
      >
        -
      </Button>
      <input
        className="!w-[40px] text-center border-2 border-primary !h-[35px] rounded-xl"
        value={quantity}
        type="number"
        min={1}
      />
      <Button
        className="text-xl w-[35px]"
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        +
      </Button>
    </div>
  );
}
