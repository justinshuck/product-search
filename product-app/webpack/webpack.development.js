const webpack = require('webpack')

module.exports = {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    }
};
