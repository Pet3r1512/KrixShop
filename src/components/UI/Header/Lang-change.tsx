import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";

type currentLang = {
  lang: string;
  img: string;
  locale: string;
};

export default function LangChange() {
  const [currentLang, setCurrentLang] = useState<currentLang>({
    lang: "Tiếng Việt",
    img: "vietnam.png",
    locale: "vi",
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex items-center gap-x-2 font-semibold justify-between w-[150px] py-2 px-2.5 shadow-xl rounded-xl">
          {currentLang.lang}{" "}
          <div className="flex items-center">
            <Image
              src={`/images/lang/${currentLang.img}`}
              width={1000}
              height={1000}
              className="w-6 h-6"
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
              className="flex items-center gap-x-2 font-semibold justify-between cursor-pointer"
              onClick={() => {
                setCurrentLang(lang);
                router.push(router.pathname, router.pathname, {
                  locale: lang.locale,
                });
                setOpen(false);
              }}
            >
              {lang.lang}{" "}
              <Image
                src={`/images/lang/${lang.img}`}
                width={1000}
                height={1000}
                className="w-6 h-6"
                alt=""
              />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
