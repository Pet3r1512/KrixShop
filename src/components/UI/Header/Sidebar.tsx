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
import { AccordionHeader } from "@radix-ui/react-accordion";

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
      <DrawerTrigger className="lg:hidden w-[60px] md:w-[150px]">
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="h-screen w-2/3 px-2.5 py-2 flex flex-col">
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
                  <AccordionContent className="pl-5">
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
            <AccordionContent className="flex flex-col gap-y-3.5">
              {section.list.map((link) => {
                return (
                  <Link key={link} href="">
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
