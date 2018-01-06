var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");
var path = require('path');
var isProduction = process.env.NODE_ENV === 'production';
var filename = isProduction ? '[name].[chunkhash].js' : '[name].js';

module.exports = {
    entry: {
        main: './src/main.js',
        vendor: ['jquery']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: filename
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: isProduction
                        }
                    }, 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.png|jpe?g|gif|svg$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[hash].[ext]',
                        outputPath: 'images/'
                    }
                }, 'img-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root:     __dirname,
            verbose:  true,
            dry:      false
        }),
        new webpack.BannerPlugin('海马学院所有，翻版必究'),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        })
    ]
};

if (isProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}


