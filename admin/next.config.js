/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    const mainAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://wct-final.rachhy.online';
    return [
      {
        source: '/api/:path*',
        destination: `${mainAppUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
