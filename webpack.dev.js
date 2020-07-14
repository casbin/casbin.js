const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 9001
    },
    plugins: [
        new HtmlWebpackPlugin({
            'title': 'Development',
            'filename': 'index.html',
            'template': './src/webpack-dev-server-template.html',
            'inject': false
        })
    ]

})