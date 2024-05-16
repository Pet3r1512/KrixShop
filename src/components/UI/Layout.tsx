import { cn } from "@/lib/utils";
import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";

export default function Layout({
  children,
  mainClassName,
  pageName = "Home",
}: {
  children: ReactNode;
  mainClassName?: string;
  pageName?: string;
}) {
  let fullPageName = `Krist Shop | ${pageName}`;

  return (
    <>
      <Head>
        <title>{fullPageName}</title>
      </Head>
      <main
        className={cn(
          "max-w-7xl mx-auto lg:py-6 py-5 px-3.5 lg:px-0",
          mainClassName
        )}
      >
        <Header />
        {children}
      </main>
    </>
  );
}
