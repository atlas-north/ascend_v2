/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    serverComponentsExternalPackages: [
      'sharp',
      'payload',
      '@payloadcms/db-postgres',
      '@payloadcms/richtext-lexical',
      '@payloadcms/bundler-webpack',
      'drizzle-orm',
      'drizzle-kit',
    ],
  },
  // Exclude Payload standalone server from Next.js build
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ignored: ['**/server-payload.ts', '**/server-payload.js'],
    }
    return config
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(
    (ext) => !['server-payload.ts', 'server-payload.js'].some((f) => f.endsWith('.' + ext))
  ),
}

module.exports = nextConfig
