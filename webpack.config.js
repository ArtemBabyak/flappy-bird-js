const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[chunkhash].js'
    },
    devServer: {
        port: 9000
    },
    plugins: [
        new HTMLPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(png|mp3)$/,
                loader: [
                    'file-loader'
                ]
            }
        ]
    }
};