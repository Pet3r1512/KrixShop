import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/ui/accordion";
import { Address } from "@/pages/shipment";

export default function OrderSummary({ address }: { address: Address }) {
  return (
    <section className="flex-1">
      <p className="lg:text-2xl font-bold">Order Summary</p>
      <Accordion className="lg:text-xl font-semibold" type="multiple">
        <AccordionItem value="cart">
          <AccordionTrigger>{"Cart's Info"}</AccordionTrigger>
          <AccordionContent className="lg:text-lg font-normal">
            <p>
              Number of items: <span>4</span>
            </p>
            <p>
              Subtotal: <span>500.000</span>
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipment">
          <AccordionTrigger>Ship Location</AccordionTrigger>
          <AccordionContent className="lg:text-lg font-normal">
            <p>
              {"Province/City "}
              <span>{address.province ? address.province : ""}</span>
            </p>
            <p>
              District <span>{address.district ? address.district : ""}</span>
            </p>
            <p>
              Ward: <span>{address.ward ? address.ward : ""}</span>
            </p>
            <p>
              Street: <span>{address.street ? address.street : ""}</span>
            </p>
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
    </section>
  );
}
