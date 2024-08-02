import { Button } from "@/components/UI/ui/button";

export default function QuantityCount({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
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
