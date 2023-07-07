/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
          {
            source: "/@:username",
            destination: "/:username",
          },
        ];
      },
      images: {
        domains: ["scontent.cdninstagram.com", "quickchart.io"]
      }
}

module.exports = nextConfig
