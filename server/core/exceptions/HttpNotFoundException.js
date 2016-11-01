'use strict';


import Exception from '@/core/exceptions/CoreException';
import {HTTP_STATUS_NOT_FOUND} from '@/core/constants';


class HttpNotFoundException extends Exception {
  httpStatus = HTTP_STATUS_NOT_FOUND;
}


export default HttpNotFoundException;
