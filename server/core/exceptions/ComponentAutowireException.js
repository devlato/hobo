'use strict';


import Exception from '@/core/exceptions/CoreException';


class ComponentAutowireException extends Exception {

  constructor(
      autowireItem = '[unknown]',
      autowireAs = '[unknown]',
      autowireWhere = '[unknown]'
  ) :ComponentAutowireException {
    super('Cannot autowire instance of type "{autowireItem}" as {autowireWhere}.{autowireAs}',
        {autowireItem, autowireAs, autowireWhere});

    return this;
  }

}


export default ComponentAutowireException;
