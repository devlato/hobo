'use strict';


import _ from 'lodash';
import Webpack from 'webpack';
import configs from '../../webpack';


export default (config, cmdArgs) => {
  let webpackConfig;
  let Logger = config.options.logger;
  let configPath = config.paths.files.WEBPACK_CONFIGURATION;

  try {
    webpackConfig = configs[config.options.server.environment];
    Logger.info(`Webpack configuration has been found by the path "${configPath}"...`);
  } catch (e) {
    Logger.info(`No webpack configuration with the path "${configPath}" found, skipping"...`);
    Logger.error(e.stack);
    webpackConfig = {};
  }

  return {
    webpack: _.merge({}, config.options.webpack, {
      options: webpackConfig,
      compiler: _.isEmpty(webpackConfig) ? {} : Webpack(webpackConfig)
    }),
    server: {
      environment: 'development'
    },
    middlewares: {
      before: [
        'appToRequest',
        'webpackDev',
        'webpackHot',
        'pureSend',
        'jsonRequest',
        'safeRequest',
        'requestTime',
        'cookieParser',
        'session',
        // 'csrf',
        'serveStatic'
      ],
      after: [
        'requestException'
      ]
    }
  };
};
