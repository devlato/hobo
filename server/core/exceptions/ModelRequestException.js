'use strict';


import Exception from '@/core/base/Exception';
import {DEFAULT_ERROR_HTTP_STATUS} from '@/core/constants';


class ModelRequestException extends Exception {

  httpStatus = DEFAULT_ERROR_HTTP_STATUS;


  constructor(readyState, error) {
    super(`Request failed, response message = "${error.message}"`, readyState);

    this.httpStatus = readyState.status;
    this.errorType = error.type;
    this.readyState = readyState;
    this.originalMessage = error.message;
  }

}


export default ModelRequestException;
