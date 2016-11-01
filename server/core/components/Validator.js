'use strict';


import _ from 'lodash';

import Component from '@/core/base/Component';
import ValidationException from '@/core/exceptions/ValidationException';


export default class Validator extends Component {

  dependencies = [];

  _validators = [];


  constructor(app, dependencies = {}) {
    super(app);

    this.dependencies = dependencies || {};

    return this;
  }


  preConstruct(app) {
    // this.setDependencies();
  }


  postConstruct() {
    this.setDependencies();
  }


  setDependencies() :Validator {
    this._validators = _.map(this.getDependencies(), (dependency) => {
      let validator = dependency;

      if (_.isPlainObject(dependency)) {
        validator = dependency.validator;
      }

      if (_.isString(validator)) {
        validator = this.getValidator(validator);
      } else if (!this.app()._isValidatorInstance(validator) && this.app()._isValidatorFunction(validator)) {
        validator = this.getWrappedFunctionValidator(validator);
      }

      return validator;
    });

    return this;
  }


  getWrappedFunctionValidator(fn) {
    let validator = new Validator(this.app());

    validator.doValidation = function(source, data = {}, args = {}) {
      return fn(source, data, args);
    };

    return validator;
  }


  preValidate(source, data = {}) {
    let dependencies = this.getDependencies();

    let errors = _.map(this.getValidators(), (validator, key) => {
      let args = {};
      let dependency = dependencies[key];

      if (_.isPlainObject(dependency)) {
        args = dependency.args || {};
      }

      try {
        validator.validate(source, data, args);
        return null;
      } catch (e) {
        return e;
      }
    });

    return _.reduce(
        errors,
        (memo, error) => {
          if (!_.isEmpty(error)) {
            return memo.concat(error);
          }
          return memo;
        },
        []);
  }


  doValidation(source, data = {}, args = {}) {
    // Validation code here
    return true;
  }


  validate(source, data = {}, args = {}) {
    let errors = [];
    let validated = [];

    try {
      errors = this.preValidate(source, data, args);
      if (!this.doValidation(source, data, args)) {
        throw new ValidationException([], this.getMessage(source, args));
      }
    } catch (e) {
      if (!(e instanceof ValidationException)) {
        this.logger().info('Error happened while validating: ', e.message || e || '[no message]');
        this.logger().error(e.stack || '[no stack]');
      }

      if (e.suppressedErrors && !_.isArray(e.suppressedErrors)) {
        validated = e.suppressedErrors;
      } else {
        validated = [e];
      }
    }

    errors = _.uniq(
        _.map(
            errors.concat(validated),
            (e) => e.message || this.getMessage(source, args)));

    if (!_.isEmpty(errors)) {
      throw new ValidationException(errors, this.getMessage(source, args));
    }

    return true;
  }


  getMessage(value, args) {
    return `Validation error for value "${value}"`;
  }


  getDependencies() {
    return this.dependencies;
  }


  getValidators() {
    return this._validators;
  }

}
