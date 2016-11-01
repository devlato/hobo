'use strict';


import _ from 'lodash';

import Component from '@/core/base/Component';


export default class Converter extends Component {

  fields = {
    // fieldName: 'Converter' or {converter: 'Converter', args: {}}
  };


  constructor(app, fields) :Converter {
    super(app);

    this.fields = fields;

    return this;
  }


  convert(field, args) {
    
  }

}
