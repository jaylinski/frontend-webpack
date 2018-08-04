/* eslint-env node */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

const mode = process.env.WEBPACK_MODE || 'development';
const isProductionBuild = mode === 'production';
const outputPath = 'build';

const webpackConfig = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js',
    shell: './shell.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, outputPath),
    publicPath: '/',
  },
  mode,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /shell\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: isProductionBuild,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /(app|style)\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|svg)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'files/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([outputPath]),
    new CopyWebpackPlugin([
      'assets/**/*',
      'manifest.json',
      'robots.txt',
    ]),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['app'],
      inject: false,
      minify: isProductionBuild ? {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
        maxLineLength: 200,
        customAttrCollapse: /d/, // SVG paths
      } : false,
    }),
    new MiniCssExtractPlugin({
      filename: 'shell.css',
    }),
  ],
  serve: {
    content: path.resolve(__dirname, outputPath),
    port: 5000,
    add: (app) => {
      app.use(convert(history()));
    },
  },
};

module.exports = webpackConfig;
