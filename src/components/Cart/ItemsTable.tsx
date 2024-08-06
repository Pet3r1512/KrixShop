import { Item } from "@/store/cart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/ui/table";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/hooks/useCart";
import { useEffect } from "react";

export default function ItemsTable({
  subtotal,
  setSubtotal,
}: {
  subtotal: number;
  setSubtotal: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { readItems } = useCart();

  useEffect(() => {
    let total = readItems().reduce(
      (acc, item) => acc + item.price * item.selectedQuantity,
      0
    );
    setSubtotal(total);
  }, []);

  return (
    <Table>
      <TableHeader>
        {/* Desktop's table head */}
        <TableRow className="text-xl font-semibold hidden lg:table-row">
          <TableHead className="">{"Product's Name"}</TableHead>
          <TableHead className="w-[100px] text-center">Price</TableHead>
          <TableHead className="w-[150px] text-center">Quantity</TableHead>
          <TableHead className="text-right w-[100px]">Subtotal</TableHead>
        </TableRow>
        {/* Mobile's table head */}
        <TableRow className="text-xl font-semibold lg:hidden">
          <TableHead className="">{"Product's Detail"}</TableHead>
          <TableHead className="text-right w-[50px]">Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      {/* Desktop's table */}
      <TableBody className="hidden lg:table-row-group">
        {readItems().map((item: Item) => {
          return (
            <TableRow key={item.xata_id} className="text-[16px]">
              <TableCell className="font-medium truncate">
                {item.name}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.price.toString(), false)}
              </TableCell>
              <TableCell className="text-center">
                {item.selectedQuantity}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(
                  (item.price * item.selectedQuantity).toString(),
                  false
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      {/* Mobile's table */}
      <TableBody className="lg:hidden">
        {readItems().map((item: Item) => {
          const price = item.price * item.selectedQuantity;
          return (
            <TableRow key={item.xata_id} className="text-[16px]">
              <TableCell className="flex flex-col gap-y-1.5">
                <p className="font-semibold text-base sm:text-lg">
                  {item.name}
                </p>
                <p className="text-[16px]">
                  Price: {formatCurrency(item.price.toString(), false)}
                </p>
                <p className="text-sm">{"x" + item.selectedQuantity}</p>
              </TableCell>
              <TableCell className="text-right">
                <p>{formatCurrency(price.toString(), false)}</p>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
