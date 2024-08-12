import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/ui/accordion";
import { Button } from "@/components/UI/ui/button";
import { toast } from "@/components/UI/ui/use-toast";
import { useCart } from "@/lib/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { Address } from "@/pages/shipment";
import { useRouter } from "next/router";

export default function OrderSummary({ address }: { address: Address }) {
  const router = useRouter();
  const { getCurrentOrder } = useCart();
  return (
    <section className="flex-1">
      <p className="lg:text-2xl font-bold">Order Summary</p>
      <Accordion className="lg:text-xl font-semibold" type="multiple">
        <AccordionItem value="cart">
          <AccordionTrigger>{"Cart's Info"}</AccordionTrigger>
          <AccordionContent className="lg:text-lg font-normal">
            <p>
              Items:{" "}
              <span className="font-bold">
                {getCurrentOrder().NumberOfItems}
              </span>
            </p>
            <p>
              Subtotal:{" "}
              <span className="font-bold">
                {formatCurrency(getCurrentOrder().subtotal.toString())}
              </span>
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipment">
          <AccordionTrigger>Ship Location</AccordionTrigger>
          <AccordionContent className="lg:text-lg font-normal">
            <p>{address.province ? address.province.split("|")[0] : ""}</p>
            <p>{address.district ? address.district.split("|")[0] : ""}</p>
            <p>
              <span>{address.ward ? address.ward.split("|")[0] : ""}</span>
            </p>
            <p>{address.street ? address.street : ""}</p>
            <p>{address.note ? address.note : ""}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="payment">
          <AccordionTrigger>Payment</AccordionTrigger>
          <AccordionContent className="lg:text-lg font-normal">
            <p>
              Method: <span>Transfer</span>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        onClick={() => {
          address.district === "" ||
          address.province === "" ||
          address.ward === "" ||
          address.street === ""
            ? toast({
                title: "Please Select All Fields",
                duration: 1500,
                className:
                  "bg-[#fcbf49] text-white fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-2 sm:right-2 sm:top-auto sm:flex-col md:max-w-[420px] rounded-xl",
              })
            : router.push("/payment");
        }}
        className="w-full"
      >
        Next Step
      </Button>
    </section>
  );
}
