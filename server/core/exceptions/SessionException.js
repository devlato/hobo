'use strict';


import Exception from '@/core/exceptions/CoreException';


class SessionException extends Exception {

  constructor(sessionId = '[no session id]') :SessionException {
    super('Cannot perform session operation with session id "{sessionId}"', {sessionId});

    return this;
  }

}


export default SessionException;
