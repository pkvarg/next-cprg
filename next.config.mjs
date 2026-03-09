import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'hono-api.pictusweb.com',
        pathname: '/api/upload/cprg/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3013',
        pathname: '/api/upload/cprg/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
