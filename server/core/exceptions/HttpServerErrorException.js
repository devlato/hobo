'use strict';


import Exception from '@/core/exceptions/CoreException';
import {HTTP_STATUS_SERVER_ERROR} from '@/core/constants';


class HttpServerErrorException extends Exception {
  httpStatus = HTTP_STATUS_SERVER_ERROR;
}


export default HttpServerErrorException;
