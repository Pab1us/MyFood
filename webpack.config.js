const path = require("path");
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: "./assets/js/index.js",
    output: {
        path: path.join(__dirname, "/static"),
        publicPath: '/static/',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
            },
            {
                test: /\.(css|sass|scss)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|mp4)$/i,
                loader: 'file-loader',
                options: {
                    context: 'assets',
                    name: '[path][name].[contenthash].[ext]',
                    esModule: false,
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin(),
        new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
        new webpack.DefinePlugin({
            VERSION: (new Date().getTime() / 1000).toFixed() // JSON.stringify(require("./package.json").version)
        }),
        new webpack.ProvidePlugin({ process: 'process' })
    ],
    resolve: {
        extensions: ['.js', '.json']
    }
};
