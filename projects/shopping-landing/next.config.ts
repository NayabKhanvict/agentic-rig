/**
 * next.config.ts — Next.js build and runtime configuration.
 *
 * remotePatterns allows next/image to fetch, optimise, and cache images from
 * picsum.photos. Without this allowlist, Next.js would refuse to serve any
 * external image and the product cards would render broken images.
 *
 * When product images are moved to a real CDN or media service, add the new
 * hostname here and remove the picsum.photos entry.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
