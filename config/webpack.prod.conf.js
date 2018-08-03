"use strict";

const path = require("path")
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('./utils');
const config = utils.config;

module.exports = () => {
  return webpackMerge(baseWebpackConfig, {
    mode: process.env.NODE_ENV,
    module: {
      rules: [{
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
      }]
    },
    devtool: config.build.productionSourceMap ?
      config.build.devtool : false,
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
    },
    optimization: {
      minimizer: [new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true
      })],
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            name: 'commons',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: { // 抽离第三插件
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/[name].[chunkhash:8].css'),
        chunkFilename: utils.assetsPath('css/[name].[chunkhash:8].css')
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json'
      }),
      new HtmlWebpackPlugin({
        filename: config.build.index,
        template: 'index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      }),
      // 忽略moment本地化内容 new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }])
    ]
  })
}

/**
 *   splitChunks: {
        chunks: 'async', // 控制webpack选择哪些代码块用于分割（其他类型代码块按默认方式打包）。有3个可选的值：initial、async和all。
        minSize: 30000, // 形成一个新代码块最小的体积
        maxSize: 0,
        minChunks: 1, // 在分割之前，这个代码块最小应该被引用的次数（默认配置的策略是不需要多次引用也可以被分割）
        maxAsyncRequests: 5, // 按需加载的代码块，最大数量应该小于或者等于5
        maxInitialRequests: 3, // 初始加载的代码块，最大数量应该小于或等于3
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: { // 将所有来自node_modules的模块分配到一个叫vendors的缓存组
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: -10, // 缓存组的优先级(priotity)是负数，因此所有自定义缓存组都可以有比它更高优先级
            enforce: true
          },
          common: {
            minChunks: 2, // 所有重复引用至少两次的代码，会被分配到default的缓存组。
            priority: -20, // 一个模块可以被分配到多个缓存组，优化策略会将模块分配至跟高优先级别（priority）的缓存组
            reuseExistingChunk: true // 允许复用已经存在的代码块，而不是新建一个新的，需要在精确匹配到对应模块时候才会生效。
          }
        }
      }
 */