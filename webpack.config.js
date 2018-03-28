const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;

const ENV = process.env.NODE_ENV || 'development';
const CONFIG = require('./config');
const WEBPACK_CONFIG = require('./webpack.' + ENV + '.config.js');

module.exports = Object.assign({}, WEBPACK_CONFIG, {
  entry: {
    app: CONFIG.entry
  },
  output: {
    path: CONFIG.dest,
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: CONFIG.publicPath
  },
  module: {
    rules: [].concat(
        WEBPACK_CONFIG.module && WEBPACK_CONFIG.module.rules || [],
        [
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
    )
  },
  plugins: [].concat(
      [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
        new webpack.ProvidePlugin({
          React: 'react',
          moment: 'moment'
        }),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: module => module.context && module.context.includes('node_modules')
        }),
        new webpack.optimize.CommonsChunkPlugin({
          async: 'used-twice',
          minChunks: (module, count) => count >= 2
        })
      ],
      WEBPACK_CONFIG.plugins || [],
      [
        new CopyWebpackPlugin([{
          from: `${CONFIG.entry}/assets`,
          to: CONFIG.dest
        }]),
        new ExtractTextPlugin({ filename: '[chunkhash].css' }),
        new HtmlWebpackPlugin({
          filename: `${CONFIG.dest}/index.html`,
          template: `${CONFIG.entry}/index.ejs`,
          minify: {
            removeRedundantAttributes: true,
            removeComments: true,
            minifyCSS: true,
            collapseWhitespace: true
          },
          inject: true
        }),
        new CriticalPlugin({
          src: 'index.html',
          inline: true,
          minify: true,
          dest: 'index.html',
        })
      ]
  )
});
