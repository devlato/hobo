'use strict';


import _ from 'lodash';
import ComponentAutowireException from '@/core/exceptions/ComponentAutowireException';
import ComponentNotFoundException from '@/core/exceptions/ComponentNotFoundException';
import {autobind} from 'core-decorators';


class Component {

  constructor(app) :Component {
    this._app = app;

    this.preConstruct(app);

    return this;
  }


  preConstruct(app) {
    return this;
  }


  @autobind
  postConstruct() {
    this._processAutowired();
  }


  @autobind
  autowired() {
    let wire;

    if ((arguments.length === 1)
        && (_.isArray(arguments[0]) || _.isPlainObject(arguments[0]))) {
      wire = arguments[0];
    } else {
      wire = arguments;
    }

    this._itemsToAutowire = wire;

    return this;
  }


  @autobind
  _processAutowired() {
    let autowireItems = this.autowireItems();
    if (!_.isEmpty(autowireItems)) {
      this.logger().info(`Trying to autowire required components...`);
      this._autowire(this.autowireItems());
    }

    return this;
  }


  @autobind
  autowireItems() {
    return this._itemsToAutowire;
  }


  @autobind
  _toLowerCamelCase(string) {
    return string.replace(/^[a-z]/i, (letter) => {
      return letter.toLowerCase();
    });
  }


  @autobind
  _autowire(items) {
    let logger = this.logger();
    logger.info(`Items to autowire found: [${_.values(items).join(', ')}]`);

    _.each(items, (item, key) => {
      let autoWiredName = key;
      if (_.isNumber(+autoWiredName) && !_.isNaN(+autoWiredName)) {
        autoWiredName = this._toLowerCamelCase(item);
      }

      try {
        let instance = this.getComponent(item);

        if (!instance) {
          throw new ComponentAutowireException(item, autoWiredName, this.constructor.name);
        }

        this[autoWiredName] = instance;

        logger.info(`Autowired ${item} instance as ${this.constructor.name}.${autoWiredName}`);
      } catch (e) {
        logger.info(`Cannot autowire item "${autoWiredName}": `, e.message || '[no message]');
        logger.error(e.stack || '[no stack]');
        throw e;
      }
    });
  }


  @autobind
  app() {
    return this._app;
  }


  @autobind
  config() {
    return this.app().config();
  }


  @autobind
  models() {
    return this.app().models();
  }


  @autobind
  controllers() {
    return this.app().controllers();
  }


  @autobind
  components() {
    return this.app().components();
  }


  @autobind
  services() {
    return this.app().services();
  }


  @autobind
  validators() {
    return this.app().validators();
  }


  @autobind
  validations() {
    return this.app().validations();
  }


  @autobind
  middlewares() {
    return this.app().middlewares();
  }


  @autobind
  logger() {
    return this.app().logger();
  }


  @autobind
  getModel(modelId :string) {
    let model = this.models()[modelId];

    if (!model) {
      throw new ComponentNotFoundException(modelId, 'No model found');
    }

    return model;
  }


  @autobind
  getController(controllerId :string) {
    let controller = this.controllers()[controllerId];

    if (!controller) {
      throw new ComponentNotFoundException(controllerId, 'No controller found');
    }

    return controller;
  }


  @autobind
  getComponent(componentId :string) {
    let component = this.components()[componentId];

    if (!component) {
      throw new ComponentNotFoundException(componentId, 'No component found');
    }

    return component;
  }


  @autobind
  getService(serviceId :string) {
    let service = this.services()[serviceId];

    if (!service) {
      throw new ComponentNotFoundException(serviceId, 'No service found');
    }

    return service;
  }


  @autobind
  getValidator(validatorId :string) {
    let validator = this.validators()[validatorId];

    if (!validator) {
      throw new ComponentNotFoundException(validatorId, 'No validator found');
    }

    return validator;
  }


  @autobind
  getValidation(validationId :string) {
    let validation = this.validations()[validationId];

    if (!validation) {
      throw new ComponentNotFoundException(validationId, 'No validation found');
    }

    return validation;
  }


  @autobind
  getMiddleware(middlewareName :string) {
    let middleware = this.middlewares()[middlewareName];

    if (!middleware) {
      throw new ComponentNotFoundException(middlewareName, 'No middleware found');
    }

    return middleware;
  }


  @autobind
  log() {
    let logger = this.logger();

    return logger.log.apply(logger, arguments);
  }
}


export default Component;
