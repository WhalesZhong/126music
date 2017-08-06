const Merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CommonConfig = require('./webpack.common.js');


module.exports = Merge(CommonConfig, {
    devtool: "inline-source-map",
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(
            {
                'process.env.NODE_ENV': JSON.stringify('dev')
            }
        )
    ],
    devServer: {
        port: 7777,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        // publicPath: publicPath,
        contentBase: '../dist',
        hot: false
    }
})