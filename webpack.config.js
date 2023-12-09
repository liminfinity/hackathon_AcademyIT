const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        controller: './js/entry.js'
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.html']
    },
    output: {
        filename: "[name].[hash].boundary.js",
        path: path.resolve(__dirname, "dist/scripts")
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
        client: {
            overlay: true,
        }
    },
    plugins: [
        new HTMLWebpackPlugin( {
            template:'./html/index.html',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].boundary.css",
        }),
    ],
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    'css-loader'
                ]
            },
        ]
    }
}