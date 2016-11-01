import Fs from 'graceful-fs';
import Controller from '@/core/base/Controller';
import Express from 'express';
import _ from 'lodash';
import Passport from 'passport';
import {
    DEFAULT_CONFIG_PATH,
    DEFAULT_ENVIRONMENT,
    DEFAULT_HOST,
    DEFAULT_PORT,
    EMPTY_ROUTING_PREFIX,
    EMPTY_REGEX_DELIMITERS,
    DEFAULT_ROUTING_AUTH_ROUTE_REGEXP,
    DEFAULT_ROUTING_AUTH_REPLACE_PATTERN,
    DEFAULT_ROUTING_AUTH_EMPTY_PATTERN,
    EXIT_STATUS_INITIALIZATION_FAILED
} from '@/core/constants';
import ServerParameters from '@/core/enumerations/ServerParameters';
import ComponentConflictException from '@/core/exceptions/ComponentConflictException';
import SessionExpiredException from '@/core/exceptions/SessionExpiredException';
import HttpNotFoundException from '@/core/exceptions/HttpNotFoundException';

import { controllers, models, middlewares, services, schemas, validators } from '../index';
import config from '@/core/skeleton-config';

import {autobind} from 'core-decorators';


export default class App {

  constructor(
      configPath :string = DEFAULT_CONFIG_PATH,
      environment :string = DEFAULT_ENVIRONMENT
  ) :App {
    this._setConfiguration(environment);
    this._init();

    return this;
  }


  @autobind
  _setConfiguration(environment :string) :App {
    this._config = config(environment, this);

    return this;
  }


  _init() :App {
    this.server();

    this._initServer();
    this._setBeforeMiddlewares();
    this._setServices();
    this._setControllers();
    this._setRenderEngine();
    this._bind();
    this._setAfterMiddlewares();
    this._postBind();

    return this;
  }


  @autobind
  _newServer() :Object {
    this.logger().info('Creating new Express server instance...');

    let server = Express();
    server._startTime = new Date();

    return server;
  }


  @autobind
  _postBind() {
    this.logger().info('Performing post-construction and injection...');
    _.each(this.components(), (component) => {
      if (_.isFunction(component.postConstruct)) {
        component.postConstruct();
      }
    });

    return this;
  }


  @autobind
  config() :Object {
    return this._config;
  }


  @autobind
  server() :Object {
    if (!this._server) {
      this._server = this._newServer();
    }

    return this._server;
  }


  @autobind
  router() :Router {
    return server().router();
  }


  @autobind
  _initServer() :App {
    this.logger().info('Initializing server...');
    //this.server()(ServerParameters.PORT, this.config().options.port);
    this._performInitialHealthcheck();

    return this;
  }


  @autobind
  _addComponent(component, name) :App {
    this.logger().info(`Trying to add component "${name}" of type "${component.constructor.name}"...`);

    let server = this.server();

    if (!server._components) {
      server._components = {};
    }

    if (_.has(server._components, name)) {
      throw new ComponentConflictException(name, server._components[name], component);
    }

    server._components[name] = component;

    this.logger().info(`Component "${name}" of type "${component.constructor.name}" has been added`);

    return this;
  }


  @autobind
  _addComponents(components) {
    _.each(components, this._addComponent);

    return this;
  }


  @autobind
  _setBeforeMiddlewares() :App {
    this.logger().info('Setting middlewares to call before request...');
    this.logger().info('Enabled middlewares to execute before request are ' +
        `[${_.values(this.config().options.middlewares.before).join(', ')}]`);
    _.each(
        this.config().options.middlewares.before,
        (middlewareName) => this._addMiddleware(middlewareName, true));

    return this;
  }


  @autobind
  _setAfterMiddlewares() :App {
    this.logger().info('Setting middlewares to call after request...');
    this.logger().info('Enabled middlewares to execute after request are ' +
        `[${_.values(this.config().options.middlewares.after).join(', ')}]`);
    _.each(
        this.config().options.middlewares.after,
        (middlewareName) => this._addMiddleware(middlewareName, false));

    return this;
  }


  @autobind
  _addMiddleware(middlewareName :string) {
    this.logger().info(`Adding middleware ${middlewareName}...`);

    // let basePath = isBeforeRequest
    //     ? this.coreDirectory('MIDDLEWARES_BEFORE_REQUEST')
    //     : this.coreDirectory('MIDDLEWARES_AFTER_REQUEST');
    let middleware = middlewares[middlewareName];
    let server = this.server();
    if (!server._middlewares) {
      server._middlewares = {};
    }

    this.logger().info(`Middleware ${middlewareName} loaded, attaching...`);

    if (_.isFunction(middleware.register)) {
      this.logger().info(`Trying to attach middleware ${middlewareName} with .register() method`);
      middleware.register(this);
      server._middlewares[middlewareName] = middleware.register;
    } else if (middleware.length === 3) {
      this.logger().info(`Trying to attach middleware ${middlewareName} via .use() method`);
      server.use(middleware);
      server._middlewares[middlewareName] = middleware;
    } else if (middleware.length === 1) {
      this.logger().info(`Trying to attach parametrized middleware ${middlewareName} via .use() method`);
      server.use(middleware(this));
      server._middlewares[middlewareName] = middleware;
    }

    return this;
  }


  @autobind
  _setRenderEngine() :App {
    this.logger().info('Setting view engine...');

    let options = this.config().options.views;
    let server = this.server();

    let viewsDir = this.coreDirectory('VIEWS');

    this.logger().info(`Adding "${options.engineName}" as view engine option...`);
    server.set(ServerParameters.VIEW_ENGINE, options.engineName);

    this.logger().info(`Setting "${viewsDir}" as home folder for views...`);
    server.set(ServerParameters.VIEWS_DIR, viewsDir);

    this.logger().info(`${options.cached ? 'Enabling' : 'Disabling'} view caching...`);
    server.set(ServerParameters.VIEW_CACHE, options.cached);

    this.logger().info(`Setting "${options.engineName}" as default view engine...`);
    server.engine(options.engineName, options.engine);

    return this;
  }


  @autobind
  _setControllers() :App {
    this.logger().info('Setting controllers...');

    this.logger().info('Creating controller instances...');
    this.server()._controllers = _.reduce(
        controllers,
        (memo, ControllerClass, key :string) => {
          if (this._isController(ControllerClass)) {
            memo[key] = new ControllerClass(this);
            this.logger().info(`${ControllerClass.name} controller has been attached successfully`);
          }

          return memo;
        }, {});
    this._addComponents(this.server()._controllers);

    return this;
  }


  @autobind
  _isController(ControllerClass) :boolean {
    let isController = ControllerClass instanceof Controller.constructor;

    if (isController) {
      this.logger().info(`Controller ${ControllerClass.name} has been found`);
    }

    return isController;
  }


  @autobind
  _setServices() :App {
    this.logger().info('Setting services...');

    this.logger().info('Creating service instances...');
    this.server()._services = _.reduce(
        services,
        (memo, ServiceClass, key :string) => {
          if (this._isService(ServiceClass)) {
            memo[key] = new ServiceClass(this);
            this.logger().info(`${ServiceClass.name} service has been attached successfully`);
          }

          return memo;
        }, {});
    this._addComponents(this.server()._services);

    return this;
  }


  @autobind
  _isService(ServiceClass) :boolean {
    let isService = ServiceClass instanceof Service.constructor;

    if (isService) {
      this.logger().info(`Service ${ServiceClass.name} has been found`);
    }

    return isService;
  }


  @autobind
  environment() :string {
    return this.config().options.server.environment;
  }


  @autobind
  controllers() :Object<String, Controller> {
    return this.server()._controllers || {};
  }


  @autobind
  components() :Object<String, Component> {
    return this.server()._components || {};
  }


  @autobind
  services() :Object<String, Service> {
    return this.server()._services || {};
  }


  @autobind
  middlewares() :Object<String, Middleware> {
    return this.server()._middlewares || {};
  }


  @autobind
  logger() {
    return this.config().options.logger;
  }


  @autobind
  _bind() :App {
    this._bindControllers();
  }


  @autobind
  _bindControllers() :App {
    this.logger().info('Binding server for usage...');
    let routing = this.config().options.routing;
    let _controllers = this.controllers();
    let supportedMethods = this.config().options.routing.supportedMethods;

    this.logger().info('Setting routes...');
    this.logger().info('ROUTING', routing);
    this.logger().info('ROUTES', routing.routes);
    _.each(
        routing.routes,
        (controllerMethodJoined, routeMethodJoined) => {
          let {authProvider, controllerId, controllerMethod} = this._extractControllerMethod(controllerMethodJoined);
          let {route, httpMethod} = this._extractRouteMethod(routeMethodJoined);
          if (supportedMethods.indexOf(httpMethod) === -1) {
            this.logger().info(`${httpMethod} Method is not supported, skipping binding...`);
            return false;
          }
          this.logger().info(`[${httpMethod}] ${route} wired for controller ${controllerId}@${controllerMethod}`);
          this._bindControllerSafely(_controllers[controllerId], controllerMethod,
              route, httpMethod, authProvider);
        });

    return this;
  }


  @autobind
  _extractControllerMethod(controllerMethodJoined :string) {
    this.logger().info(`Extracting target controller name and method from ${controllerMethodJoined}...`);
    let [controllerIdPrepared, controllerMethod] = _.filter(
        _.map(
            controllerMethodJoined.split(this.config().options.routing.controllerMethodDelimiter),
            (item) => {
              return item.trim();
            }),
        (item) => !_.isEmpty(item));

    let parts = _.reverse(
        _.filter(
            _.map(
              controllerIdPrepared.split(/\s+/ig),
              (item) => {
                return item.trim();
              }),
            (item) => {
              return !!item;
            }));

    let [controllerId, authProvider] = parts;

    if (this._isAuthProvider(authProvider)) {
      authProvider = this._extractAuthProvider(authProvider);
    }

    this.logger().info(`Extracted controller name "${controllerId}" and method name "${controllerMethod}"`);

    return {authProvider, controllerId, controllerMethod};
  }


  @autobind
  _isAuthProvider(authProvider) {
    return authProvider && authProvider.match(DEFAULT_ROUTING_AUTH_ROUTE_REGEXP);
  }


  @autobind
  _extractAuthProvider(authProvider) {
    return authProvider.replace(DEFAULT_ROUTING_AUTH_REPLACE_PATTERN,
        DEFAULT_ROUTING_AUTH_EMPTY_PATTERN);
  }


  @autobind
  _extractRouteMethod(routeMethodJoined :string) {
    this.logger().info(`Extracting target route name HTTP method from ${routeMethodJoined}...`);
    let _config = this.config().options.routing;
    let result = _.filter(
        _.map(
            routeMethodJoined.split(_config.routeMethodDelimiter),
            (item) => {
              return item.trim().replace(
                  _config.routeMethodCleanupPattern,
                  _config.routeMethodCleanupReplace);
            }),
        (item) => !_.isEmpty(item));

    if (result.length === 1) {
      result = [_config.defaultHttpMethod].concat(result);
    }

    let [httpMethod, route] = result;

    httpMethod = httpMethod.toUpperCase();

    this.logger().info(`Extracted route "${route}" and HTTP method "${httpMethod}"`);

    return {route, httpMethod};
  }


  @autobind
  _bindControllerSafely(
      controllerInstance :Controller,
      controllerMethod :string,
      route :string,
      httpMethod :string,
      authProvider :mixed
  ) :App {
    this.logger().info(`Binding route handler for ${route} route...`);
    let server = this.server();
    let routeToBind = route;

    if (this._isRegexRoute(routeToBind)) {
      this.logger().info(`Route "${routeToBind}" is a regular expression, converting...`);
      routeToBind = this._getRegexRoute(routeToBind);
      this.logger().info(`Route "${route}" has been converted to RegExp instance ("${routeToBind}")`);
    }

    if (!authProvider) {
      this.logger().info(
          `Binding ${controllerInstance.constructor.name}.${controllerMethod} ` +
          `route handler for ${route} route and ${httpMethod} method...`);
      server[httpMethod.toLowerCase()](routeToBind,
          this._getRequestHandler(controllerInstance, controllerMethod));
    } else {
      this.logger().info(
          `Binding ${controllerInstance.constructor.name}.${controllerMethod} ` +
          `route handler for ${route} route and ${httpMethod} method with passport ` +
          `preauthorize "${authProvider}" strategy...`);

      let authProviderInstance = this._getAuthProvider(authProvider);

      server[httpMethod.toLowerCase()](routeToBind, authProviderInstance,
          this._getRequestHandler(controllerInstance, controllerMethod));
    }

    return this;
  }


  @autobind
  _getAuthProvider(authProvider) {
    switch (authProvider) {
      case 'local':
        return Passport.authenticate(authProvider);

      case 'authenticated':
        return (request, response, next) => {
          if (_.isEmpty(request.user) || _.isEmpty(request.user.id)) {
            return next(new SessionExpiredException('Not authenticated'));
          }

          next();
        };

      case 'account-manager':
        return (request, response, next) => {
          let {user} = request;

          if (_.isEmpty(user) || _.isEmpty(user.id)) {
            return next(new SessionExpiredException('Not authenticated'));
          }

          let isAccountManager = user.roles && (user.roles.indexOf('ROLE_ADMIN') !== -1);

          if (!isAccountManager) {
            return next(new HttpNotFoundException('API endpoint is not found'));
          }

          next();
        };

      default:
        return (request, response, next) => {
          this.logger().info('Empty authentication provider worked');
          next();
        };
    }
  }


  @autobind
  _getRegexRoute(route :string) {
    let _config = this.config().options.routing;
    let cleanRoute = route
      .replace(_config.regexPrefix, EMPTY_ROUTING_PREFIX)
      .replace(_config.regexDelimiters, EMPTY_REGEX_DELIMITERS);

    return new RegExp(cleanRoute, 'ig');
  }


  @autobind
  _isRegexRoute(route :string) {
    return route.startsWith(this.config().options.routing.regexPrefix);
  }


  @autobind
  _getRequestHandler(controllerInstance :Controller, method :string) :Function {
    let logger = this.logger();

    logger.info(`Getting controller method safe proxy for ${method} method...`);
    return _.bind(async (request, response, next) => {
      try {
        logger.info(`Processing request to uri "${request.url}"...`);
        return await controllerInstance[method](request, response);
      } catch (e) {
        logger.info('Exception while processing request occurred: ', e.message || '[no error message]');
        logger.error(e.stack);
        next(e);
      }
    }, controllerInstance);
  }


  @autobind
  _corePaths() {
    return this.config().paths;
  }


  @autobind
  _coreDirectories() {
    return this._corePaths().directories;
  }


  @autobind
  _coreWebPaths() {
    return this._corePaths().web;
  }


  @autobind
  _coreFiles() {
    return this._corePaths().files;
  }


  @autobind
  coreDirectory(key) {
    return this._coreDirectories()[key];
  }


  @autobind
  coreWebPath(key) {
    return this._coreWebPaths()[key];
  }


  @autobind
  coreFile(key) {
    return this._coreFiles()[key];
  }


  @autobind
  _getPathsSorted(paths) {
    return _.sortBy(paths);
  }


  @autobind
  _performInitialHealthcheck() {
    let logger = this.logger();
    logger.info('Performing app structure self-check...');

    let failed = _.some(
        this._getPathsSorted(this.config().healthcheck),
        (path) => {
          logger.info(`Checking directory "${path}" existence...`);
          try {
            Fs.mkdirSync(path);
            logger.info(`Directory "${path}" had not been found so it was created automatically`);
          } catch (error) {
            if (error) {
              if (error.code !== 'EEXIST') {
                logger.info(`Cannot create required directory "${path}": `,
                    error.message || error || '[no message]');
                logger.error(error.stack || '[no trace]');

                return true;
              }
            }
          }

          return false;
        });

    if (failed) {
      logger.info("Cannot start application because it's structure is corrupted.\nPlease check log to correct errors.");
      process.exit(EXIT_STATUS_INITIALIZATION_FAILED);
    } else {
      logger.info('App structure is correct, all the required paths exist');
    }
  }


  @autobind
  uptime() {
    return new Date() - this.server()._startTime;
  }


  @autobind
  async run() :Promise {
    let _config = this.config().options.server;
    let host = '127.0.0.1';
    let port = _config.port || DEFAULT_PORT;

    this.logger().info(`Starting app on http://${host}:${port}/...`);

    //this._bind();
    this.logger().info('Server handlers has been successfully bound');
    return new Promise((resolve, reject) => {
      this.server().listen(port, host, () => {
        this.logger().log(`Server has been started successfully at http://${host}:${port}/`);
        this.logger().log(`Start elapsed ${this.uptime()}ms`);

        resolve(this);
      });

      this.server().on('error', (e) => {
        reject(e);
      });
    });
  }
}
