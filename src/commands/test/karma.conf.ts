// Karma configuration
// Generated on Tue Jun 07 2022 11:01:25 GMT+0800 (Irkutsk Standard Time)

import { LOG_INFO, LOG_LOG } from "karma/lib/constants";
import { WebpackConfig } from "../../utils/webpack.config";

export function generateKarmaConfig(webpackEnv: any) {
  const webpackConfig: any = WebpackConfig(webpackEnv, {}, true);
  delete webpackConfig.entry;
  delete webpackConfig.output.filename;

  return {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine', 'webpack', 'iframes'],


    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-iframes'
    ],


    // list of files / patterns to load in the browser
    files: [
      'src/**/*.component.tsx',
      { pattern: 'src/**/*.test.ts', watched: false }
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/**/*.component.tsx': ['webpack', 'iframes'],
      'src/**/*.test.ts': ['webpack', 'iframes']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,


    webpack: webpackConfig
  };
}
