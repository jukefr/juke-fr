/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: {
    outputStandalone: true,
  },
  webpack: (config, {}) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });
    config.module.rules.push({
      test: /\.(mp3|otf)$/,
      type: 'asset/resource',
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
