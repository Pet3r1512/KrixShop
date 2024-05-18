import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FlipWords } from "../UI/ui/aceternity/flip-words";
import { Spotlight } from "../UI/ui/aceternity/spotlight";
import { useTranslation } from "next-i18next";

export default function Hero() {
  const flipwords = ["Collection", "Styles", "Fashion"];
  const { t } = useTranslation("common");
  return (
    <section className="lg:min-h-[50dvh] w-full bg-[#F3F3F3] antialiased flex items-center justify-between pl-2 pr-0 lg:px-16 relative overflow-hidden lg:rounded-xl shadow-2xl">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 !z-20"
        fill="#dda15e"
      />
      <div className="flex flex-col gap-y-8 lg:gap-y-16">
        <div className="flex flex-col gap-y-2">
          <p className="text-lg lg:text-2xl font-semibold">Classic Exclusive</p>
          <div className="text-3xl lg:text-6xl font-bold z-20">
            <span>{`Women's`}</span>
            <FlipWords
              words={flipwords}
              className="-ml-2 lg:ml-0 text-primary"
            />
          </div>
          <p className="text-lg lg:text-2xl">{t("hero.sale")}</p>
        </div>
        <button className="text-base lg:text-xl gap-x-1 lg:gap-x-1.5 flex items-center bg-primary text-white lg:hover:bg-white w-fit lg:px-2.5 lg:pb-2 lg:pt-1.5 px-1.5 pb-1 pt-0.5 rounded-lg border-2 border-primary font-semibold lg:hover:border-primary lg:hover:text-primary duration-150 ease-linear">
          {t("hero.button")} <ArrowRight size={16} className="mt-[2.5px]" />
        </button>
      </div>
      <Image
        src="/images/hero.png"
        alt=""
        width={500}
        height={500}
        priority
        className="w-1/2 !lg:h-2/3 lg:w-auto z-10"
      />
      <p className="font-bold text-white absolute bottom-4 right-[5%] text-3xl lg:text-7xl">
        KRIST SHOP
      </p>
    </section>
  );
}
