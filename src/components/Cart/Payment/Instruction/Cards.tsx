import { Input } from "@/components/UI/ui/input";
import { toast } from "@/components/UI/ui/use-toast";
import { useCard } from "@/lib/hooks/useCard";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { cn, formatCardNumber } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export type CardInfo = {
  bank: string;
  name: string;
  cardNumber: {
    number: string;
    checked: boolean;
  };
  cvv: string;
  expired: {
    month: string;
    year: string;
  };
};

export default function Cards({
  typedInfo,
  setTypedInfo,
}: {
  typedInfo: CardInfo;
  setTypedInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
}) {
  const [selectedCard, setSelectedCard] = useState("");
  const [typingCardNumber, setTypingCardNumber] = useState("");
  const [formatted, setFormatted] = useState("");
  const [cardNumberCheck, setCardNumberCheck] = useState(false);

  const debouncedTypingCardNumber = useDebounce(typingCardNumber, 500);

  const { setCard } = useCard();

  // Card patterns
  const cardPattern: Record<string, string> = {
    Visa: "^4[0-9]{12}(?:[0-9]{3})?$",
    "Master Card":
      "^5[1-5][0-9]{14}$|^2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[01][0-9]|720)[0-9]{12}$",
    "American Express": "^3[47][0-9]{13}$",
  };

  useEffect(() => {
    let foundCard = "";
    let isValid = false;

    for (const [card, pattern] of Object.entries(cardPattern)) {
      if (new RegExp(pattern).test(typingCardNumber.replace(/ /g, ""))) {
        foundCard = card;
        isValid = true;
        break;
      }
    }

    if (isValid) {
      if (foundCard !== selectedCard) {
        toast({
          title: "This Card Number Is Belong To " + foundCard,
          duration: 1500,
          className:
            "bg-[#fcbf49] text-white fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-2 sm:right-2 sm:top-auto sm:flex-col md:max-w-[420px] rounded-xl",
        });
      }
      setSelectedCard(foundCard);
      setCardNumberCheck(true);
    } else {
      setCardNumberCheck(false);
    }
  }, [debouncedTypingCardNumber]);

  useEffect(() => {
    setTypedInfo((prev) => ({
      ...prev,
      bank: selectedCard,
      cardNumber: {
        number: typingCardNumber,
        checked: cardNumberCheck,
      },
    }));
  }, [cardNumberCheck, selectedCard]);

  useEffect(() => {
    setCard(typedInfo);
  }, [typedInfo]);

  const fields = [
    {
      name: "name",
      label: "Cardholder Name",
      component: (
        <Input
          onChange={(e) => {
            setTypedInfo((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
      ),
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
      component: (
        <Input
          onChange={(e) => {
            let value = e.target.value;
            if (/^\d{0,3}$/.test(value)) {
              setTypedInfo((prev) => ({
                ...prev,
                cvv: value,
              }));
            }
          }}
          type="text"
          inputMode="numeric"
          maxLength={3}
          placeholder="CVV"
        />
      ),
    },
    {
      name: "date",
      label: "Expired At",
      component: (
        <span className="expiration flex items-center gap-x-2.5 w-1/3">
          <Input
            onChange={(e) => {
              let value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 1 && value <= 12) {
                setTypedInfo((prev) => ({
                  ...prev,
                  expired: {
                    ...prev.expired,
                    month: value.toString(),
                  },
                }));
              }
            }}
            type="text"
            name="month"
            placeholder="MM"
            min={1}
            max={12}
            inputMode="numeric"
            maxLength={2}
          />
          <span>/</span>
          <Input
            onChange={(e) => {
              let value = parseInt(e.target.value, 10);
              const currentYear = new Date().getFullYear();
              if (
                !isNaN(value) &&
                value.toString().length === 4 &&
                value >= currentYear
              ) {
                setTypedInfo((prev) => ({
                  ...prev,
                  expired: {
                    ...prev.expired,
                    year: value.toString(),
                  },
                }));
              }
            }}
            type="text"
            name="year"
            placeholder="YYYY"
            inputMode="numeric"
            maxLength={4}
            minLength={4}
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
                card.name === selectedCard ? "border-green-500" : "opacity-50"
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
