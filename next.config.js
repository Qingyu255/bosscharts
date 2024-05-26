/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { 
        serverActions: true,
    },
    async redirects() {
        return [
          {
            source: '/(.*)',
            has: [
              {
                type: 'host',
                value: 'smubosscharts.com',
              },
            ],
            destination: 'https://www.smubosscharts.com/:path*',
            permanent: true,
          },
        ]
      },
}

module.exports = nextConfig