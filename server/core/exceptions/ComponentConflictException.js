'use strict';


import Exception from '@/core/exceptions/CoreException';


class ComponentConflictException extends Exception {

  constructor(
      componentId :string = '[no componentId]',
      componentInstance :string = '[no componentInstance]',
      existingComponentInstance :string = '[no existing componentInstance]'
  ) :ComponentConflictException {
    super('Cannot add component with id "{componentId}" of type {newType} because this id is bound '
              + 'by another instance of type "{existingType}"', {
        componentId,
        newType: componentInstance.constructor.name,
        existingType: existingComponentInstance.constructor.name
    });

    return this;
  }

}


export default ComponentConflictException;
