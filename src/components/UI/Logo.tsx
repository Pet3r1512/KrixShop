import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export default function Logo(props: any) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Image
        onLoad={() => {
          setLoading(false);
        }}
        src={"/images/LogoText.png"}
        alt=""
        width={1000}
        height={1000}
        priority
        className="h-[64px] w-auto hidden md:block"
        {...props}
      />
      <Image
        onLoad={() => {
          setLoading(false);
        }}
        src={"/images/Logo.png"}
        alt=""
        width={1000}
        height={1000}
        priority
        className="h-[48px] w-auto md:hidden"
        {...props}
      />
      <Skeleton
        className={cn(
          "w-[45.81px] h-[64px] md:w-[155.11px] md:h-[64px]",
          loading ? "block" : "hidden"
        )}
      />
    </>
  );
}
