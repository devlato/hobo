'use strict';


import Component from '@/core/base/Component';
import NotImplementedMethodException from '@/core/exceptions/NotImplementedMethodException';


class Controller extends Component {

  async get(request, response) {
    throw new NotImplementedMethodException(this.name || 'Controller', 'GET');
  }


  async post (request, response) {
    throw new NotImplementedMethodException(this.name || 'Controller', 'POST');
  }


  async put (request, response) {
    throw new NotImplementedMethodException(this.name || 'Controller', 'PUT');
  }


  async delete(request, response) {
    throw new NotImplementedMethodException(this.name || 'Controller', 'DELETE');
  }

}


export default Controller;
