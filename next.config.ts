import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 220, 256, 320],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {},
}

export default nextConfig