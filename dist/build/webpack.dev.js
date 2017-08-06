'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Merge = require('webpack-merge');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    devtool: "inline-source-map",
    plugins: [new CleanWebpackPlugin(['dist']), new webpack.HotModuleReplacementPlugin(), new webpack.DefinePlugin({
        'process.env.NODE_ENV': (0, _stringify2.default)('dev')
    })],
    devServer: {
        port: 7777,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',

        contentBase: '../dist',
        hot: false
    }
});
//# sourceMappingURL=webpack.dev.js.map