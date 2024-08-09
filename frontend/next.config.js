/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: `${process.env.NEXT_PUBLIC_GAME_SHOP_API_URL}/admin`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
