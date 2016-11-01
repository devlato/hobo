'use strict';


import Exception from '@/core/exceptions/CoreException';


class ComponentNotFoundException extends Exception {

  constructor(
      componentId,
      message
  ) :ComponentNotFoundException {
    let exceptionMessage = 'Cannot find required component "{componentId}"';
    if (message) {
      exceptionMessage += `: ${message}`;
    }
    super(exceptionMessage, {componentId});

    return this;
  }

}


export default ComponentNotFoundException;
