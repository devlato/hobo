'use strict';


import Exception from '@/core/exceptions/CoreException';


class CsrfViolationException extends Exception {

  constructor(token = '[no csrf token]') :CsrfViolationException {
    super('Invalid CSRF token "{token}" has been passed', {token});

    return this;
  }

}


export default CsrfViolationException;
