'use strict';


import _ from 'lodash';


export default (app) => {
  app.logger().info('Applying app to request.palo mapper middleware...');

  return (request, response, next :Function) => {
    request.palo = app;
    response.palo = app;

    next();
  };
};
