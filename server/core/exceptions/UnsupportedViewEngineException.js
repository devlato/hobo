'use strict';


import Exception from '@/core/exceptions/CoreException';


export default class UnsupportedViewEngineException extends Exception {

  constructor(engineName = '[unknown engine name]') :UnsupportedViewEngineException {
    super('View engine "{engineName}" is not supported', {engineName});

    return this;
  }

}
