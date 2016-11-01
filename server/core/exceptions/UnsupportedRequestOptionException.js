'use strict';


import _ from 'lodash';
import Exception from '@/core/exceptions/CoreException';


export default class UnsupportedRequestOptionException extends Exception {

  constructor(optionValue = '[no option provided]', optionName = '[unknown option name]') {
    super(`Remote request option "${optionName}" = "`
        + _.isPlainObject(optionValue) || _.isArray(optionValue)
            ? JSON.stringify(optionValue)
            : optionValue
        + ' is not supported');

    return this;
  }

}
