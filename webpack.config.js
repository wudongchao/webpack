const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: './index.js',
    devServer:{
        contentBase:'./dist',
        open:true,
        port:8080,
        hot:true,
        proxy:{
            '/api':'http://localhost:9527'
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        limit: 2048,
                        outputPath: 'images/'
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html'
    }), new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['dist'],
    }),
     new Webpack.HotModuleReplacementPlugin()],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}