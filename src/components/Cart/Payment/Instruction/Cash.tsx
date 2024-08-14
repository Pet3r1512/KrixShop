import { useTranslation } from "react-i18next";

export default function Cash({ subtotal }: { subtotal: number }) {
  const { t } = useTranslation("common");

  return <p>{t("t.checkout.payment.instructions.cash", { subtotal })}</p>;
}
