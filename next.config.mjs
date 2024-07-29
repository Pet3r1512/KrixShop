import pkg from "./next-i18next.config.js";
const { i18n } = pkg;

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jlehnhviqykpbhjqjzmp.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/KristShop/**",
      },
    ],
  },
};

export default nextConfig;
