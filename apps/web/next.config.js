/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  },
  transpilePackages: ["@mobilcharge/types", "@mobilcharge/ui"],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|webp|gif|svg)$/i,
      type: "asset/resource"
    });

    return config;
  }
};

module.exports = nextConfig;
