const { vendorCSSLoaderDev, sassLoaderTest } = require('./commonLoaders');
const helpers = require('../../helpers');

module.exports = [
  {
    // Transpile all spec files
    test: /\.spec\.tsx?$/,
    exclude: /node_modules/,
    loader: 'awesome-typescript-loader',
    options: {
      configFileName: helpers.root('config', 'karma', 'karma.tsconfig.json'),
      useBabel: true,
      useCache: true,
    },
  },
  {
    // Transpile all spec files
    test: /((?!spec).)*.tsx?$/,
    exclude: /(node_modules|spec)/,
    enforce: 'post',
    use: [
      {
        loader: 'istanbul-instrumenter-loader',
        options: {
          // Handle ES6 modules
          esModules: true,
        },
      },
      {
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: helpers.root('config', 'karma', 'karma.tsconfig.json'),
          useBabel: true,
          useCache: true,
        },
      },
    ],
  },
  vendorCSSLoaderDev,
  sassLoaderTest,
];
