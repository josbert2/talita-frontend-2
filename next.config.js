/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['res.cloudinary.com', 'localhost']
    },
    webpack: (config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          '@': path.resolve(__dirname),
          '@/components': path.resolve(__dirname, 'components'),
        }
        return config
    },
}

module.exports = nextConfig
