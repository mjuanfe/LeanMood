var webpackConfig = require('./webpack.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
var basePath = __dirname;

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    files: [
      './test/test_index.js',
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      './node_modules/es6-promise/dist/es6-promise.auto.js',
    ],
    exclude: [
    ],
    preprocessors: {
      './test/test_index.js': ['webpack', 'sourcemap', 'coverage']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.spec\.(ts|tsx)$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
          },
          // Configuration required by enzyme
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.scss$/,
            exclude:/node_modules/,
            //NOTE: Avoid import like [name]__[local]___[hash:base64:5] to create a well known class name
            loader: ExtractTextPlugin.extract('style','css?modules&importLoaders=1&localIdentName=[local]!sass-loader')
          }
        ],
        // Configuration required to import sinon on spec.ts files
        noParse: [
          /node_modules(\\|\/)sinon/,
        ],
        // https://www.npmjs.com/package/istanbul-instrumenter-loader
        postLoaders: [
          {
            test: /\.(ts|tsx)/,
            exclude: /(node_modules|spec)/,
            loaders: ['istanbul-instrumenter','ts-loader']
          }
        ],
      },
      resolve: {
        // Added .json extension required by cheerio (enzyme dependency)
        extensions: ['', '.js', '.ts', '.tsx', '.json'],
        // Configuration required to import sinon on spec.ts files
        // https://github.com/webpack/webpack/issues/304
        alias: {
          sinon: 'sinon/pkg/sinon',
          'globalStyles': path.join(basePath, "src/content/sass/")
        }
      },
      // Configuration required by enzyme
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
      },
      plugins: [
        new ExtractTextPlugin('[name].css')
      ]
    },
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: 'test/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'text', subdir: 'report-txt', file: 'index.txt' },
        { type: 'text' },
        { type: 'text-summary', subdir: '.', file: 'summary.txt' },
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
