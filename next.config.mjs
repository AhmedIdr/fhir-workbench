/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // This basePath is needed if your repo name isn't the same as username.github.io
  basePath: '/fhir-workbench',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;