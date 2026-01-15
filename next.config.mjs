import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  // Optimize barrel imports for faster builds and smaller bundles
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'motion',
      '@codesandbox/sandpack-react',
    ],
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
