import Image from "next/image";

export default function Logo(props: any) {
  return (
    <>
      <Image
        src={"/images/LogoText.png"}
        alt=""
        width={1000}
        height={1000}
        priority
        className="h-[64px] w-auto hidden lg:block"
        {...props}
      />
      <Image
        src={"/images/Logo.png"}
        alt=""
        width={1000}
        height={1000}
        priority
        className="h-[48px] w-auto lg:hidden"
        {...props}
      />
    </>
  );
}
