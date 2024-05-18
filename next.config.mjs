import pkg from "./next-i18next.config.js";
const { i18n } = pkg;

const nextConfig = {
  reactStrictMode: true,
  i18n,
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

// https://jlehnhviqykpbhjqjzmp.supabase.co/storage/v1/object/sign/KristShop/Categories/footwear.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLcmlzdFNob3AvQ2F0ZWdvcmllcy9mb290d2Vhci5qcGciLCJpYXQiOjE3MTYwMzgwMTcsImV4cCI6MTc0NzU3NDAxN30.O7Jxs_LY3ic1d6izVHbWWRcFImxxmrYrzrC4fRuzFuo&t=2024-05-18T13%3A13%3A31.005Z
