import { cn } from "@/lib/utils";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import React from "react";
React.useLayoutEffect = React.useEffect;
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Footer from "./Footer";
import { Toaster } from "./ui/toaster";

export default function Layout({
  children,
  mainClassName,
  pageName = "Home",
}: {
  children: ReactNode;
  mainClassName?: string;
  pageName?: string;
}) {
  const router = useRouter();
  const [locale, setLocale] = useState(router.locale);
  const [cookies] = useCookies(["NEXT_LOCALE"]);
  let fullPageName = `Krist Shop | ${pageName}`;

  useEffect(() => {
    const storedLocale = cookies.NEXT_LOCALE;
    if (storedLocale && storedLocale !== locale) {
      setLocale(storedLocale);
      router.push(router.pathname, router.asPath, { locale: storedLocale });
    }
  }, [cookies, locale, router]);

  return (
    <>
      <Head>
        <title>{fullPageName}</title>
      </Head>
      <main className={cn("lg:pt-6 pt-5 scrollbar-hide", mainClassName)}>
        <div className="flex flex-col gap-y-5 max-w-7xl mx-auto lg:min-h-screen">
          <Header />
          {children}
        </div>
        <Footer />
        <Toaster />
      </main>
    </>
  );
}
