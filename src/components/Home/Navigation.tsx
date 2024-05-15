import { useTranslation } from "next-i18next";

export default function Navigation() {
  const { t } = useTranslation("common");
  return <p>{t("home")}</p>;
}
