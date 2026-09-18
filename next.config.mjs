const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/credits", destination: "/features/ccredits", permanent: true },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
