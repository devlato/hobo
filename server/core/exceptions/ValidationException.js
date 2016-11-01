'use strict';


import Exception from '@/core/exceptions/CoreException';


class ValidationException extends Exception {

  constructor(suppressedFields, message) :ValidationException {
    super(message);

    this.suppressedErrors = suppressedFields;

    return this;
  }

}


export default ValidationException;
