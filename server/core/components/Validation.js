'use strict';


import _ from 'lodash';

import Component from '@/core/base/Component';
import Validator from '@/core/components/Validator';
import ValidationException from '@/core/exceptions/ValidationException';
import SchemaValidationException from '@/core/exceptions/SchemaValidationException';


export default class Validation extends Component {

  fields = {};

  _validators = {};


  constructor(app, fields) :Validation {
    super(app);

    this.fields = fields;
    // this.setFieldsValidators();

    return this;
  }


  postConstruct() {
    this.setFieldsValidators();
  }


  validateRequest(request) :Object {
    let data = _.merge({}, request.params, request.query, request.body);

    return this.validateData(data);
  }


  validateData(data) :Object {
    try {
      return this.validate(data);
    } catch (e) {
      throw new SchemaValidationException(e.message, e.suppressedErrors);
    }
  }


  getFieldValidators(validators) {
    let validatorItems = validators;

    if (!_.isArray(validatorItems)) {
      validatorItems = [validatorItems];
    }

    return new Validator(this.app(), validatorItems).setDependencies();
  }


  setFieldsValidators() {
    this._validators = _.mapValues(this.fields, (validators, fieldName) => {
      return this.getFieldValidators(validators);
    });

    return this;
  }


  validate(data) :Object {
    let validFields = {};

    let validated = _.reduce(
        _.keys(this.fields),
        (memo, fieldName, key) => {
          try {
            let validator = this._validators[fieldName];
            validator.validate(data[fieldName], data);
            validFields[fieldName] = data[fieldName];
          } catch (e) {
            memo[fieldName] = e.suppressedErrors;
          }

          return memo;
        },
        {});

    if (!_.isEmpty(validated)) {
      throw new ValidationException(validated, 'Validation error');
    }

    return validFields;
  }
}
