const baseConfig = require('./webpack/webpack.base');
const webpackMerge = require('webpack-merge');

const DEFAULT = 'dev';

const environmentMap = {
    dev: 'development',
    prod: 'production'
};

const environment = environmentMap[process.env.NODE_ENV] || DEFAULT

module.exports = webpackMerge(baseConfig, require(`./webpack/webpack.${environment}.js`));