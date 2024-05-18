import { cn } from "@/lib/utils";
import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";
import React from "react";
React.useLayoutEffect = React.useEffect;

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
      <main className={cn("max-w-7xl mx-auto lg:py-6 py-5", mainClassName)}>
        <div className="flex flex-col gap-y-5">
          <Header />
          {children}
        </div>
      </main>
    </>
  );
}
