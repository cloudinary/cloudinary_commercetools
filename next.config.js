const {i18n} = require('./next-i18next.config')

module.exports = {
  i18n,
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ]
  },
  images: {
    // edit this domain to the domain where your images will be coming from
    domains: [],
  },
  experimental: {
    fontLoaders: [{loader: '@next/font/google', options: {subsets: ['latin']}}],
  },
}
