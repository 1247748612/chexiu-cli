const { merge } = require('webpack-merge')
const devConfig = require('./webpack.dev')

const commonConfig = require('./webpack.common')

const prodConfig = require('./webpack.prod')

module.exports = () => {
  const env = process.env.NODE_ENV
  switch (env) {
    case 'development':
      return merge(commonConfig, devConfig)
    case 'production':
      return merge(commonConfig, prodConfig)
    default:
      throw new Error(`${env} -> ENV NOT FOUND`)
  }
}
