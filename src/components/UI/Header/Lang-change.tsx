import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

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
  const [cookies, setCookie] = useCookies(["NEXT_LOCALE"]);

  useEffect(() => {
    if (cookies.NEXT_LOCALE === "en") {
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
        <div className="ml-auto lg:ml-0 bg-white text-black flex items-center gap-x-2 lg:text-base text-sm font-semibold justify-between w-[150px] lg:py-2 lg:px-2.5 py-1.5 px-2 shadow-xl rounded-xl">
          <p>{currentLang.lang} </p>
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
      <DropdownMenuContent className="flex flex-col gap-y-3.5 absolute w-max lg:-left-32 -right-44 left-auto">
        {langs.map((lang) => {
          return (
            <DropdownMenuItem
              key={lang.locale}
              className="flex items-center gap-x-2 text-sm lg:text-base font-semibold justify-between cursor-pointer"
              onClick={() => {
                setCurrentLang(lang);
                setCookie("NEXT_LOCALE", lang.locale, { path: "/" });
                router.push(router.pathname, router.asPath, {
                  locale: lang.locale,
                });
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
