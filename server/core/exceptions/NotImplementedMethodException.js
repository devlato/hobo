'use strict';


import Exception from '@/core/exceptions/CoreException';
import {HTTP_STATUS_NOT_FOUND} from '@/core/constants';


class NotImplementedMethodException extends Exception {

  httpStatus = HTTP_STATUS_NOT_FOUND;


  constructor(className = '[Unknown Class]', method) :NotImplementedMethodException {
    super('"{className}" class "{method}" method is not implemented', {className, method});

    return this;
  }

}


export default NotImplementedMethodException;
