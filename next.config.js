/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { 
        serverActions: true,
    },
}

module.exports = nextConfig

// routes from root to course/COR-STAT1202 (technically my home page, for now) 
// choose stats as 'home' only cause its popular
module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/course/COR-STAT1202',
          permanent: true,
        },
      ]
    },
  }