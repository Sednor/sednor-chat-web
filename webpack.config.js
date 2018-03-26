const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: `${__dirname}/src/index.js`
  },
  output: {
    path: `${__dirname}/../public`,
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [autoprefixer];
                }
              }
            },
            { loader: 'sass-loader' }
          ]
        })
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 10000, minetype: 'application/font-woff' }
        }
      },
      {
        test: /\.(ttf|eot|svg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ]
  },
  watch: true,
  cache: true,
  devtool: 'source-map',
  devServer: {
    clientLogLevel: 'none',
    historyApiFallback: true,
    inline: true,
    quiet: false,
    noInfo: false,
    disableHostCheck: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: true,
      chunkModules: false
    },
    port: 3002
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      errorDetails: true,
      debug: true
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001,
      proxy: {
        target: 'localhost:3002'
      }
    }),
    new ExtractTextPlugin({ filename: '[chunkhash].css' }),
    new HtmlWebpackPlugin({
      filename: `${__dirname}/../public/index.html`,
      template: `${__dirname}/src/index.ejs`,
      inject: true
    })
  ]
};
