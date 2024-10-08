import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export const shop = [
  {
    category: "Men",
    list: [
      "T-Shirts",
      "Casual Shirts",
      "Formal Shirts",
      "Jackets",
      "Blazers & Coats",
    ],
  },
  {
    category: "Indian & Festive Wear",
    list: ["Kurtas & Kurta Sets", "Sherwanis"],
  },
  {
    category: "Women",
    list: [
      "Kurtas & Suits",
      "Sarees",
      "Ethnic Wear",
      "Lehenga Cholis",
      "Jackets",
    ],
  },
  {
    category: "Western Wear",
    list: ["Dresses", "Jumpsuits"],
  },
  {
    category: "Footwear",
    list: [
      "Flats",
      "Casual Shoes",
      "Heels",
      "Boots",
      "Sports Shoes & Floaters",
    ],
  },
  {
    category: "Accessories",
    list: ["Rings", "Neckless", "Glasses"],
  },
  {
    category: "Kids",
    list: [
      "T-Shirts",
      "Shirts",
      "Jeans",
      "Trousers",
      "Party Wear",
      "Innerwear & Thermal",
      "Track Pants",
      "Value Pack",
    ],
  },
];

export default function NavBar() {
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
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="flex items-center gap-x-8 relative">
        {navs.map((nav, index) => {
          if (index === 1) {
            return (
              <NavigationMenuItem key="shop-navs">
                <NavigationMenuTrigger>
                  <Link
                    href="/shop"
                    className="font-semibold text-xl flex items-center"
                  >
                    {t("shop")} <ChevronDown />
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="grid grid-rows-2 grid-flow-col p-4 shadow-2xl rounded-xl absolute -left-[50%] mt-8 h-[650px] w-[950px] z-10 bg-white">
                  {shop.map((item) => {
                    return (
                      <div
                        key={item.category}
                        className={cn(
                          "flex flex-col gap-y-3",
                          item.category === "Kids" ? "grid-cols-2" : ""
                        )}
                      >
                        <p key={item.category} className="font-bold text-xl">
                          {item.category}
                        </p>
                        <div className="flex flex-col gap-y-2.5 py-2 px-1.5 rounded-lg">
                          {item.list.map((i) => {
                            const itemSlug = i.replace(/ /g, "-");
                            const categorySlug = item.category.replace(
                              / /g,
                              "-"
                            );
                            return (
                              <Link
                                href={`/shop/${categorySlug}/${itemSlug}`}
                                className="lg:hover:shadow-xl p-1.5 cursor-pointer"
                                key={i}
                              >
                                {i}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
          return (
            <NavigationMenuItem
              key={nav.name}
              className="font-semibold text-xl"
            >
              <Link href={nav.href}>{nav.name}</Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
