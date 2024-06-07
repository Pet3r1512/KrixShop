import { Menu } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent } from "../ui/drawer";
import { shop } from "@/components/Home/NavBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export default function Sidebar() {
  const { t } = useTranslation("common");
  const navs = [
    {
      name: t("home"),
      href: "/",
    },
    {
      name: t("shop"),
      href: "/shop",
    },
    {
      name: t("about"),
      href: "/about",
    },
    {
      name: t("blog"),
      href: "/blog",
    },
    {
      name: t("contact"),
      href: "/contact",
    },
  ];
  return (
    <Drawer direction="left">
      <DrawerTrigger className="lg:hidden mr-9 md:mr-32">
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="h-full w-2/3 px-2.5 py-2 flex flex-col">
        <p className="text-2xl font-extrabold mb-8">Menu</p>
        {navs.map((nav, index) => {
          if (index === 1) {
            return (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger className="font-semibold">
                    {nav.name}
                  </AccordionTrigger>
                  <AccordionContent className="pl-3">
                    <ShopAccordion />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          }
          return (
            <Link key={index} className="font-semibold py-4" href={nav.href}>
              {nav.name}
            </Link>
          );
        })}
      </DrawerContent>
    </Drawer>
  );
}

function ShopAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {shop.map((section, index) => {
        return (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="font-semibold">
              {section.category}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-y-3.5 pl-3">
              {section.list.map((link) => {
                const itemSlug = link.replace(/ /g, "-");
                const categorySlug = section.category.replace(/ /g, "-");
                return (
                  <Link key={link} href={`/shop/${categorySlug}/${itemSlug}`}>
                    {link}
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
