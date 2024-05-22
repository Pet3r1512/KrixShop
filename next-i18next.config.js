const path = require("path");

/** @type {import('next-i18next').UserConfig} */
const nextI18Config = {
  debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "vi",
    locales: ["en", "vi"],
    localeDetection: false,
  },
  react: { useSuspense: false },
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/locales")
      : "/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

module.exports = nextI18Config;
