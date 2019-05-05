const webpack = require('webpack');//热更新是webpack自带的插件
const merge = require('webpack-merge');
const commonConfig = require('./webpack.conmmon.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        pathRewrite: {'^/api' : ''}
      }
    },
    port: '8080',
    hot: true,
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  //tree shaking
  optimization: {
    usedExports: true
  }
}

module.exports = merge(commonConfig, devConfig);
