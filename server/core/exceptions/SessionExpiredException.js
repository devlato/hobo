'use strict';


import Exception from '@/core/exceptions/CoreException';


export default class SessionExpiredException extends Exception {

  constructor(reason = null) :SessionExpiredException {
    let message = 'Session expired';

    if (reason) {
      message = `${message}: ${reason}`;
    }

    super(message);

    return this;
  }

}
