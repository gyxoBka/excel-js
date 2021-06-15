
const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const plugins = [
    new MiniCssExtractPlugin({
        filename: filename('css'),
        chunkFilename: filename('css'),
    }),
    new HTMLWebpackPlugin({
        template: 'index.html',
        favicon: path.resolve(__dirname, 'src/favicon.ico'),
        minify: isProd,
    }),
];
if (isDev) {
    // only enable hot in development
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

const jsLoaders = () => {
    const loaders = [
        {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
        },
        },
    ]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.js'],
        alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src/core'),
        },
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev,
        open: true,
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
        ],
    },
}
