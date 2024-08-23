import { useTranslation } from "react-i18next";

export default function Cash({ subtotal }: { subtotal: string }) {
  const { t } = useTranslation("common");

  return (
    <p className="lg:text-xl font-semibold">
      {t("checkout.payment.instructions.cash", { subtotal })}
    </p>
  );
}
