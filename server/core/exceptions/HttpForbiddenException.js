'use strict';


import Exception from '@/core/exceptions/CoreException';
import {HTTP_STATUS_FORBIDDEN} from '@/core/constants';


class HttpForbiddenException extends Exception {
  httpStatus = HTTP_STATUS_FORBIDDEN;
}


export default HttpForbiddenException;
