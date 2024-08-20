import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/ui/accordion";
import { Button } from "@/components/UI/ui/button";
import { toast } from "@/components/UI/ui/use-toast";
import { useAddress } from "@/lib/hooks/useAddress";
import { useCart } from "@/lib/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { Address } from "@/pages/shipment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OrderSummary({
  address,
  isAddressDone,
  payMethod,
}: {
  address?: Address;
  isAddressDone?: boolean;
  payMethod?: string;
}) {
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { getCurrentOrder } = useCart();
  const { setAddress, getAddress } = useAddress();

  useEffect(() => {
    let pathname = router.pathname;
    if (pathname === "/checkout") {
      setStep(1);
    } else if (pathname === "/shipment") {
      setStep(2);
    } else {
      setStep(3);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (!address) {
      setSelectedAddress(getAddress());
    }
  }, []);

  return (
    <section className="flex-1">
      <p className="lg:text-2xl font-bold">Order Summary</p>
      <Accordion className="lg:text-xl font-semibold" type="multiple">
        {step >= 1 && (
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
        )}
        {step >= 2 && (
          <AccordionItem value="shipment">
            <AccordionTrigger>Ship Location</AccordionTrigger>
            <AccordionContent className="lg:text-lg font-normal">
              <p>
                {address
                  ? address.province.split("|")[0]
                  : selectedAddress?.province.split("|")[0]}
              </p>
              <p>
                {address
                  ? address.district.split("|")[0]
                  : selectedAddress?.district.split("|")[0]}
              </p>
              <p>
                <span>
                  {address
                    ? address.ward.split("|")[0]
                    : selectedAddress?.ward.split("|")[0]}
                </span>
              </p>
              <p>{address ? address.street : selectedAddress?.street}</p>
              <p>{address ? address.note : selectedAddress?.note}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        {step === 3 && (
          <AccordionItem value="payment">
            <AccordionTrigger>Payment</AccordionTrigger>
            <AccordionContent className="lg:text-lg font-normal">
              <p>
                Method: <span className="font-bold">{payMethod}</span>
              </p>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
      <Button
        onClick={() => {
          if (router.pathname === "/checkout") {
            router.push("/shipment");
          } else if (router.pathname === "/shipment") {
            if (!isAddressDone) {
              toast({
                title: "Please Select All Fields",
                duration: 1500,
                className:
                  "bg-[#fcbf49] text-white fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-2 sm:right-2 sm:top-auto sm:flex-col md:max-w-[420px] rounded-xl",
              });
            } else {
              setAddress(address!);
              router.push("/payment");
            }
          } else if (router.pathname === "/payment") {
          }
        }}
        className="w-full"
      >
        Next Step
      </Button>
    </section>
  );
}
