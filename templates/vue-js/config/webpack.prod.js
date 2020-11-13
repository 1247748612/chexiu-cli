const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, // 将 CSS 转化成 CommonJS 模块
          'sass-loader',
          'css-loader',
          // 将 Sass 编译成 CSS
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css',
    }),
  ],
  optimization: {
    moduleIds: 'named',
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          filename: 'static/js/[name].[chunkhash].bundle.js',
        },
        styles: {
          name: 'styles',
          test: /\.s?[ac]ss$/,
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
}
