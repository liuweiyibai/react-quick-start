"use strict";
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const opn = require('opn');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./utils').config;

const getIPAddress = () => {
  let ip = null;　　
  let interfaces = require('os').networkInterfaces();　　
  for (var devName in interfaces) {　　　　
    var iface = interfaces[devName];　　　　　　
    for (var i = 0; i < iface.length; i++) {　　　　　　　　
      let alias = iface[i];　　　　　　　　
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {　　　　　　　　　　
        ip = alias.address;　　　　　　　　
      }　　　　　　
    }　　
  }
  return ip;
};


const HOST = getIPAddress();
const PORT = config.dev.port;

module.exports = () => {
  return webpackMerge(baseWebpackConfig, {
    mode: process.env.NODE_ENV,
    module: {
      rules: [{
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    devtool: config.dev.devtool,
    devServer: {
      clientLogLevel: 'warning',
      historyApiFallback: {
        rewrites: [{
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
        }, ],
      },
      hot: true,
      contentBase: false,
      compress: true,
      host: config.dev.host,
      port: config.dev.port,
      // open: config.dev.autoOpenBrowser,
      overlay: config.dev.errorOverlay ? {
        warnings: false,
        errors: true
      } : false,
      publicPath: config.dev.assetsPublicPath,
      proxy: config.dev.proxyTable,
      quiet: true,
      watchOptions: {
        poll: config.dev.poll,
      },
      after: () => {
        let address = HOST + ":" + PORT;
        opn(address, {
          app: ['chrome']
        }).then(
          console.log('server is running' + ' ' + address)
        )
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }])
    ]
  })
};