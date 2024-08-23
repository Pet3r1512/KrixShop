import { Input } from "@/components/UI/ui/input";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { cn, formatCardNumber } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Cards({
  cardVerified,
}: {
  cardVerified?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedCard, setSelectedCard] = useState("");
  const [typingCardNumber, setTypingCardNumber] = useState("");
  const [formatted, setFormatted] = useState("");
  const [cardNumberCheck, setCardNumberCheck] = useState(true);

  const debouncedTypingCardNumber = useDebounce(typingCardNumber, 500);

  useEffect(() => {
    if (typingCardNumber.replace(/ /g, "").match(cardPattern[selectedCard])) {
      setCardNumberCheck(true);
    } else {
      setCardNumberCheck(false);
    }
  }, [debouncedTypingCardNumber, selectedCard]);

  const cardPattern: Record<string, string> = {
    Visa: "^4[0-9]{12}(?:[0-9]{3})?$",
    "Master Card":
      "^5[1-5][0-9]{14}$|^2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[01][0-9]|720)[0-9]{12}$",
    "American Express": "^3[47][0-9]{13}$",
  };

  const fields = [
    {
      name: "name",
      label: "Cardholder Name",
      component: <Input />,
    },
    {
      name: "number",
      label: "Card Number",
      component: (
        <div className="relative">
          <Input
            type="tel"
            inputMode="numeric"
            maxLength={19}
            minLength={16}
            value={formatted}
            onChange={(e) => {
              setTypingCardNumber(e.target.value);
              setFormatted(formatCardNumber(e.target.value));
            }}
            pattern={cardPattern[selectedCard]}
          />
          {typingCardNumber !== "" &&
            (cardNumberCheck ? (
              <Check className="text-green-500 right-2 absolute top-1/2 -translate-y-1/2" />
            ) : (
              <X className="text-red-500 right-2 absolute top-1/2 -translate-y-1/2" />
            ))}
        </div>
      ),
    },
    {
      name: "cvv",
      label: "CVV",
      component: <Input type="number" maxLength={3} minLength={3} />,
    },
    {
      name: "date",
      label: "Expired At",
      component: (
        <span className="expiration flex items-center gap-x-2.5 w-1/3">
          <Input
            type="text"
            name="month"
            placeholder="MM"
            maxLength={2}
            size={2}
          />
          <span>/</span>
          <Input
            type="text"
            name="year"
            placeholder="YY"
            maxLength={2}
            size={2}
          />
        </span>
      ),
    },
  ];

  const supportedCards = [
    {
      name: "Visa",
      image: (
        <Image src="/images/cards/visa.png" width={64} height={64} alt="" />
      ),
    },
    {
      name: "Master Card",
      image: (
        <Image
          src="/images/cards/master-card.png"
          width={64}
          height={64}
          alt=""
        />
      ),
    },
    {
      name: "American Express",
      image: (
        <Image
          src="/images/cards/american-express.png"
          width={64}
          height={64}
          alt=""
        />
      ),
    },
  ];

  return (
    <form className="flex flex-col gap-y-8">
      <div className="flex items-center gap-x-10">
        {supportedCards.map((card) => {
          return (
            <div
              key={card.name}
              className={cn(
                "relative rounded-xl p-2 py-0 border-2 border-white",
                card.name === selectedCard ? "border-green-500" : ""
              )}
              onClick={() => {
                setSelectedCard(card.name);
              }}
            >
              {card.image}
            </div>
          );
        })}
      </div>
      {fields.map((field) => {
        return (
          <div key={field.name} className="flex flex-col gap-y-2.5">
            <label htmlFor={field.name}>{field.label}</label>
            {field.component}
          </div>
        );
      })}
    </form>
  );
}
