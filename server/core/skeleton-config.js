import Minimist from 'minimist';
import _ from 'lodash';
const Constants = require('./constants');
import Pug from 'pug';
import UUID from 'uuid';
import configs from '../configuration';

export default (environment) => {
  let Logger = console;
  let cmdArgs = Minimist(process.argv.slice(2));

  let config = {
    constants: Constants,
    paths: {
      directories: {
        BASE_DIR: Constants.BASE_DIR,
        MODELS: Constants.DEFAULT_MODELS_DIR,
        CONTROLLERS: Constants.DEFAULT_CONTROLLERS_DIR,
        SERVICES: Constants.DEFAULT_SERVICES_DIR,
        VALIDATIONS: Constants.DEFAULT_VALIDATION_SCHEMAS_DIR,
        VALIDATORS: Constants.DEFAULT_VALIDATORS_DIR,
        CONVERTERS: Constants.DEFAULT_CONVERTERS_DIR,
        MIDDLEWARES: Constants.DEFAULT_MIDDLEWARES_DIR,
        MIDDLEWARES_BEFORE_REQUEST: Constants.DEFAULT_MIDDLEWARES_BEFORE_DIR,
        MIDDLEWARES_AFTER_REQUEST: Constants.DEFAULT_MIDDLEWARES_AFTER_DIR,
        CONFIGURATION: Constants.DEFAULT_CONFIGURATION_DIR,
        STATIC_FILES: Constants.DEFAULT_STATIC_FILES_DIR,
        VIEWS: Constants.DEFAULT_VIEWS_DIR,
        UPLOADED_FILES: Constants.DEFAULT_UPLOAD_DIR,
        EMAIL_TEMPLATES: Constants.DEFAULT_EMAIL_TEMPLATES_DIR,
        TESTS: Constants.DEFAULT_TESTS_DIR
      },
      files: {
        MAIN_CONFIGURATION: Constants.DEFAULT_MAIN_CONFIGURATION_PATH,
        TARGET_SPECIFIC_CONFIGURATION: Constants.DEFAULT_TARGET_SPECIFIC_CONFIGURATION_PATH,
        ENVIRONMENT_CONFIGURATION: Constants.DEFAULT_ENVIRONMENT_CONFIGURATION_PATH,
        LOCAL_CONFIGURATION: Constants.DEFAULT_LOCAL_CONFIGURATION_PATH,
        WEBPACK_CONFIGURATION: Constants.DEFAULT_WEBPACK_DEVELOPMENT_CONFIG_PATH,
        MOCHA_OUTPUT: Constants.DEFAULT_TESTS_OUTPUT_FILE_PATH
      },
      web: {
        UPLOADED_FILES: Constants.DEFAULT_RELATIVE_UPLOAD_DIR
      }
    },
    options: {
      release: {
        version: Constants.DEFAULT_RELEASE_VERSION,
        timestamp: Constants.RELEASE_TIMESTAMP
      },
      cookies: {
        secret: Constants.DEFAULT_COOKIE_SECRET,
        options: {}
      },
      server: {
        environment,
        host: Constants.DEFAULT_HOST,
        displayHost: Constants.DEFAULT_DISPLAY_HOST,
        protocol: Constants.DEFAULT_PROTOCOL,
        port: Constants.DEFAULT_PORT,
        showPort: true
      },
      webApp: {},
      helmet: {},
      csrf: {
        genid: () => {
          return UUID.v4();
        },
        keyTtl: 62000,
        excudeMethods: ['GET', 'HEAD', 'OPTIONS'],
        path: '*',
        headerKey: 'x-crsf-token',
        sessionKey: 'csrfSecret'
      },
      views: {
        engineName: 'pug',
        engine: Pug.__express,
        cached: false
      },
      session: {
        genid: () => {
          return UUID.v4();
        },
        proxy: true,
        name: 'sessionId',
        resave: true,
        saveUninitialized: true,
        cookie: {
          path: '/',
          httpOnly: false,
          secure: false,
          // domain: Constants.DEFAULT_SESSION_COOKIE_DOMAIN,
          maxAge: Constants.DEFAULT_SESSION_COOKIE_LIFETIME
        },
        redisOptions: {
          prefix: 'session:',
          host: Constants.DEFAULT_REDIS_HOST,
          port: Constants.DEFAULT_REDIS_PORT,
          ttl: Constants.DEFAULT_REDIS_TTL,
          clientOptions: {
            host: Constants.DEFAULT_REDIS_HOST,
            port: Constants.DEFAULT_REDIS_PORT,
            family: Constants.DEFAULT_REDIS_IP_FAMILY,
            db: Constants.DEFAULT_REDIS_DB
          }
        },
        secret: Constants.DEFAULT_SESSION_SECRET
      },
      integrations: {},
      logger: Logger,
      routing: {
        apiPrefix: Constants.DEFAULT_ROUTER_PREFIX,
        routes: Constants.EMPTY_ROUTE_CONFIGURATION,
        supportedMethods: Constants.DEFAULT_SUPPORTED_METHODS,
        regexPrefix: Constants.DEFAULT_ROUTING_REGEX_PREFIX,
        regexDelimiters: Constants.DEFAULT_ROUTING_REGEX_DELIMITER,
        controllerMethodDelimiter: Constants.DEFAULT_CONTROLLER_METHOD_DELIMITER,
        routeMethodDelimiter: Constants.DEFAULT_ROUTE_METHOD_DELIMITER,
        routeMethodCleanupPattern: Constants.DEFAULT_ROUTE_CLEANUP_PATTERN,
        routeMethodCleanupReplace: Constants.DEFAULT_ROUTE_CLEANUP_REPLACE,
        defaultHttpMethod: Constants.DEFAULT_HTTP_METHOD
      },
      middlewares: {
        before: [],
        after: []
      },
      tests: {
        timeout: 60000,
        reporting: {
          name: 'API Tests',
          log: Constants.DEFAULT_TESTS_OUTPUT_FILE_PATH,
          reporter: 'mocha-jenkins-reporter'
        }
      },
      email: {
        apiKey: null,
        defaultFrom: 'noreply@your-domain.com',
        compilerEngine: 'pug',
        compilerOptions: {
          doctype: 'html',
          pretty: true,
          self: false,
          debug: true,
          compileDebug: true,
          cache: false
        },
        aliases: {}
      },
      services: {},
      models: {
        url: Constants.DEFAULT_MODEL_HOST,
        forceMessageRewrite: false,
        maskCharacter: '*',
        options: {
          contentType: 'application/json'
        }
      },
      mockModels: {
        url: Constants.DEFAULT_MOCK_HOST,
        forceMessageRewrite: true
      },
      fileUpload: {},
      bodyParser: {
        urlencoded: {
          limit: '10mb',
          extended: true
        },
        json: {
          limit: '10mb'
        }
      },
      logRequestParams: {
        maxBodySize: 2000
      },
      webpack: {
        compiler: {},
        options: {}
      }
    }
  };

  Logger.log(`Default configuration found by path "${__filename}`);

  config.healthcheck = [
    config.paths.directories.BASE_DIR,
    config.paths.directories.CONFIGURATION,
    config.paths.directories.CONTROLLERS,
    config.paths.directories.MIDDLEWARES,
    config.paths.directories.MODELS,
    config.paths.directories.SERVICES,
    config.paths.directories.UPLOADED_FILES,
    config.paths.directories.VIEWS,
    config.paths.directories.EMAIL_TEMPLATES
  ];

  let mainConfig;
  let targetSpecificConfig;
  let envConfig;
  let localConfig;

  let mainConfigPath = config.paths.files.MAIN_CONFIGURATION;
  let targetSpecificConfigPath = config.paths.files.TARGET_SPECIFIC_CONFIGURATION;
  let envConfigPath = config.paths.files.ENVIRONMENT_CONFIGURATION;
  let localConfigPath = config.paths.files.LOCAL_CONFIGURATION;

  try {
    mainConfig = configs.config;
    if (typeof mainConfig === 'function') {
      mainConfig = mainConfig(config, cmdArgs);
    }
    Logger.info(`User-defined configuration has been found by the path "${mainConfigPath}"...`);
  } catch (e) {
    Logger.info(`No user-defined configuration with the path "${mainConfigPath}" found, skipping...`);
    Logger.error(e.stack);
    mainConfig = {};
  }

  try {
    targetSpecificConfig = require('../configuration/target');
    if (typeof targetSpecificConfig === 'function') {
      targetSpecificConfig = targetSpecificConfig(config, cmdArgs);
    }
    Logger.info(`Target-specific configuration has been found by the path "${targetSpecificConfigPath}"...`);
  } catch (e) {
    Logger.info(`No target-specific configuration with the path "${targetSpecificConfigPath}" found, skipping...`);
    Logger.error(e.stack);
    targetSpecificConfig = {};
  }

  try {
    envConfig = configs[environment];
    if (typeof envConfig === 'function') {
      envConfig = envConfig(config, cmdArgs);
    }
    Logger.info(`Environment-based configuration has been found by the path "${envConfigPath}"...`);
  } catch (e) {
    Logger.info(`No environment-based configuration with the path "${envConfigPath}" found, skipping...`);
    Logger.error(e.stack);
    envConfig = {};
  }

  try {
    localConfig = require('../configuration/local');
    if (typeof localConfig === 'function') {
      localConfig = localConfig(config, cmdArgs);
    }
    Logger.info(`Local configuration has been found by the path "${localConfigPath}"...`);
  } catch (e) {
    Logger.info(`No local configuration with the path "${localConfigPath}" found, skipping...`);
    Logger.error(e.stack);
    localConfig = {};
  }

  const merged = _.merge(
    {},
    config,
    {options: mainConfig},
    {options: targetSpecificConfig},
    {options: envConfig},
    {options: localConfig},
    {options: {server: cmdArgs}}
  );

  return merged;
};
