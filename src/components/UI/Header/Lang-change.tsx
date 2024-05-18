import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

type currentLang = {
  lang: string;
  img: string;
  locale: string;
};

export default function LangChange() {
  const [currentLang, setCurrentLang] = useState<currentLang>({
    lang: "",
    img: "",
    locale: "",
  });
  const [open, setOpen] = useState(false);
  const langs = [
    {
      lang: "Tiếng Việt",
      img: "vietnam.png",
      locale: "vi",
    },
    {
      lang: "English",
      img: "english.png",
      locale: "en",
    },
  ];

  const router = useRouter();
  const [cookies, setCookie] = useCookies(["locale"]);

  useEffect(() => {
    console.log(cookies.locale);
    if (cookies.locale === "en") {
      setCurrentLang({
        lang: "English",
        img: "english.png",
        locale: "en",
      });
    } else
      setCurrentLang({
        lang: "Tiếng Việt",
        img: "vietnam.png",
        locale: "vi",
      });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex items-center gap-x-2 lg:text-base text-sm font-semibold justify-between w-[60px] md:w-[150px] lg:py-2 lg:px-2.5 py-1.5 px-2 shadow-xl rounded-xl">
          <p className="hidden md:block">{currentLang.lang} </p>
          <div className="flex items-center">
            <Image
              src={`/images/lang/${currentLang.img}`}
              width={1000}
              height={1000}
              className="size-6"
              alt=""
            />
            <ChevronDown />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-3.5">
        {langs.map((lang) => {
          return (
            <DropdownMenuItem
              key={lang.locale}
              className="flex items-center gap-x-2 text-sm lg:text-base font-semibold justify-between cursor-pointer"
              onClick={() => {
                setCurrentLang(lang);
                router.push(router.pathname, router.pathname, {
                  locale: lang.locale,
                });
                setCookie("locale", lang.locale, {});
                setOpen(false);
              }}
            >
              {lang.lang}{" "}
              <Image
                src={`/images/lang/${lang.img}`}
                width={1000}
                height={1000}
                className="lg:w-6 lg:h-6 size-4"
                alt=""
              />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
