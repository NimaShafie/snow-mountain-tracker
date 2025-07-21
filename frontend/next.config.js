/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/internal-api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
