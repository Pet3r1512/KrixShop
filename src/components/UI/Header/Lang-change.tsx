import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
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
    <DropdownMenu open={open}>
      <DropdownMenuTrigger
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="flex items-center gap-x-2 font-semibold justify-between w-[150px] py-2 px-2.5">
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
            <div
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
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
