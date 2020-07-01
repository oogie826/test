const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./build')
    },
    devServer:{
        overlay: true,
        stats: 'errors-only',
        port: 3001,
        hot: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {   
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /src\/server/],
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}