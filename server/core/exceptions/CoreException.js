'use strict';


import Exception from '@/core/base/Exception';
import {DEFAULT_ERROR_HTTP_STATUS} from '@/core/constants';


class CoreException extends Exception {
  httpStatus = DEFAULT_ERROR_HTTP_STATUS;
}


export default CoreException;
