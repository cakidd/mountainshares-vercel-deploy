/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'artifacts/**/*',
        'cache/**/*',
        'node_modules/@nomiclabs/**/*',
      ],
    },
  },
}

module.exports = nextConfig
