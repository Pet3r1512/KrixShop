import { RadioGroup, RadioGroupItem } from "@/components/UI/ui/radio-group";
import { PayMethod } from "@/pages/payment";
import React from "react";

export default function PaymentMethods({
  setPayMethod,
}: {
  setPayMethod: React.Dispatch<React.SetStateAction<PayMethod>>;
}) {
  const payments = ["COD", "Cards"];

  return (
    <RadioGroup
      onValueChange={(e: any) => {
        setPayMethod(e);
      }}
      className="flex items-center gap-x-5"
    >
      {payments.map((payment) => {
        return (
          <div key={payment} className="flex items-center space-x-2">
            <RadioGroupItem value={payment} id={payment} />
            <label className="lg:text-xl font-semibold" htmlFor={payment}>
              {payment}
            </label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
