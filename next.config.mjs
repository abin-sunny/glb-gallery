/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  // experimental: { serverActions: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
