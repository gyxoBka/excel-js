const paths = require('../paths')

const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const Dotenv = require('dotenv-webpack')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime'
    ]
  }
}

module.exports = {
  entry: ['@babel/polyfill', `${paths.src}/index.js`],
  output: {
    path: paths.build,
    filename: 'js/[name].bundle.js',
    publicPath: '/',
    clean: true,
    crossOriginLoading: 'anonymous',
    module: true,
    environment: {
      arrowFunction: true,
      bigIntLiteral: false,
      const: true,
      destructuring: true,
      dynamicImport: false,
      forOf: true
    }
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@':  paths.src + '/modules',
      '@core': paths.src + '/modules/core',
      '@redux': paths.src + '/modules/redux',
      '@assets': paths.public + '/assets',
    },
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.m?js?$/i,
        exclude: /node_modules/,
        use: babelLoader
      },
      // CSS, SASS
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'sass-loader'
        ]
      },
      // MD
      {
        test: /\.md$/i,
        use: ['html-loader', 'markdown-loader']
      },
      // static files
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff2?)$/i,
        type: 'asset'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.public}/assets`
        }
      ]
    }),

    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
      filename: 'index.html',
      favicon: 'favicon.ico'
    }),

    new Dotenv({
      path: './config/.env'
    })
  ]
}
