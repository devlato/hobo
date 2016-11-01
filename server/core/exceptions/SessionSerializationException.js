'use strict';


import Exception from '@/core/exceptions/CoreException';


class SessionSerializationException extends Exception {

  constructor(userId = '[no user id]') :SessionSerializationException {
    super('Cannot serialize or deserialize user with id "{userId}"', {userId});

    return this;
  }

}


export default SessionSerializationException;
