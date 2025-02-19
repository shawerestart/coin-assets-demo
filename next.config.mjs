import "dotenv";
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL,
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
