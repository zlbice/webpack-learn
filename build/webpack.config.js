const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-inline-source-map',
  entry: {
    main: './src/js/main.js'
  },
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
  module: {
    rules: [{
      test:/\.(jpg|png|gif|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          limit: 20480
        }
      }
    },{
      test:/\.styl$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'stylus-loader'
      ]
    },{
      test:/\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },{
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
    },{
      test: /\.html$/,
      use: "html-loader"
    }]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'src/index.html'
    }), 
    // new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
}
