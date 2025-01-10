/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "31.220.51.146"],
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
