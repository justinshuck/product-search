const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: [
            './src/index.js',
            './src/assets/styles.scss',
        ]
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader']
                }),
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
                use: `file-loader?limit=100000&name=assets/[name].[hash:6].[ext]`
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            title: 'Walmart Product Search',
            favicon: 'icon.ico',
            template: require('html-webpack-template'),
            appMountId: 'app',
            mobile: true,
            lang: 'en-US',
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1'
                }
            ]
        })
    ]

}