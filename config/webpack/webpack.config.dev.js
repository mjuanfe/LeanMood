const webpack = require('webpack');
const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.config.common');
const helpers = require('../helpers');
const { devLoaders } = require('./loaders');

const hotReloadingEntries = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
];

module.exports = merge({
  // Prepend new config sections for arrays
  customizeArray: (commonConfig, newConfig) => [...newConfig, ...commonConfig],
})(commonWebpackConfig, {
  devtool: 'inline-source-map',
  entry: {
    app: hotReloadingEntries,
    appStyles: hotReloadingEntries,
  },
  devServer: {
    contentBase: helpers.root('dist'), // Content base
    inline: true, // Enable watch and live reload
    host: 'localhost',
    port: 8080,
    stats: 'errors-only',
    hot: true,
  },
  module: {
    rules: devLoaders,
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // Display in console what modules are hot reloaded
    new webpack.NamedModulesPlugin(),
  ],
});
