const path = require('path');

const dirname = path.parse(__dirname).dir;
const envMode = process.env.NODE_ENV !== 'production';
const resolveDirname = (src) => path.resolve(dirname, src);

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');


console.log(resolveDirname('.eslintrc.js'))

module.exports = {
  mode: 'development',
  entry: {
    app: {
      import: resolveDirname('./src/main.ts'),
      filename: envMode ? '[name].js' : 'static/js/[name].[contenthash].js',
    },
  },
  output: {
    publicPath: '/',
    path: resolveDirname('./dist'),
    filename: envMode
      ? '[name].js'
      : 'static/js/[name].[contenthash].dynamic.js',
    assetModuleFilename: 'static/images/[hash][ext][query]',
  },
  resolve: {
    alias: {
      '@': resolveDirname('src'),
    },
    // Add `.ts` as a resolvable extension.
    extensions: ['.ts', '.js', '.tsx', '.vue'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|js|vue|json)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            ts: 'ts-loader',
            tsx: 'babel-loader!ts-loader',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { transpileOnly: true, appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          },
          {
            loader: 'ts-loader',
            options: { appendTsxSuffixTo: [/\.vue$/] },
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/font/[name].[contenthash].[ext]',
        },
      },
      {
        test: /\.(png|jp?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: resolveDirname('public'),
          globOptions: {
            ignore: [
              // Ignore all `txt` files
              './index.html',
            ],
          },
        },
      ],
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      favicon: resolveDirname('./public/favicon.ico'),
      template: resolveDirname('./public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      path: resolveDirname(`.env.${process.env.NODE_ENV}`),
      defaults: resolveDirname(`.env`),
    }),
  ],
};