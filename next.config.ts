import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@/components', '@/setup'],
    reactCompiler: true,
  },
}

export default nextConfig
