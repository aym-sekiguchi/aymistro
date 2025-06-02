import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      '@/components',
      '@/setup',
      '@/libraries',
      '@/actions',
    ],
    reactCompiler: true,
  },
}

export default nextConfig
