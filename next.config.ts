import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.buzzsprout.com',
      },
      {
        protocol: 'https',
        hostname: '**.libsyn.com',
      },
      {
        protocol: 'https',
        hostname: '**.podbean.com',
      },
      {
        protocol: 'https',
        hostname: '**.blubrry.com',
      },
      {
        protocol: 'https',
        hostname: '**.transistor.fm',
      },
      {
        protocol: 'https',
        hostname: '**.simplecast.com',
      },
      {
        protocol: 'https',
        hostname: '**.captivate.fm',
      },
      {
        protocol: 'https',
        hostname: '**.podcastcdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.acast.com',
      },
      {
        protocol: 'https',
        hostname: '**.megaphone.fm',
      },
      {
        protocol: 'https',
        hostname: '**.anchor.fm',
      },
      {
        protocol: 'https',
        hostname: '**.spreaker.com',
      },
      {
        protocol: 'https',
        hostname: '**.podomatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.fireside.fm',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      // Fallback for any other podcast hosting services
      {
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
