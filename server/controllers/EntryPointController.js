'use strict';


import Controller from '@/core/base/Controller';


export default class EntryPointController extends Controller {

  async getEntryPoint(request, response) {
    response.render('index', {
      state: 'hobo'
    });
  }
}
