'use strict';


import Exception from '@/core/exceptions/CoreException';


class SchemaValidationException extends Exception {

  constructor(message, errors) :SchemaValidationException {
    super(message);

    this.errors = errors;

    return this;
  }

}


export default SchemaValidationException;
