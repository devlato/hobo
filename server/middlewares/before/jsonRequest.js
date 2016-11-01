'use strict';


import _ from 'lodash';
import {DEFAULT_ERROR_HTTP_STATUS} from '@/core/constants';
import Environments from '@/core/enumerations/Environments';


export default (app) => {
  app.logger().info('Applying forced json response middleware...');

  return (request, response, next :Function) => {

    response.asRendered = function() {
      response._asRendered = true;
      return response;
    };


    response.sendingAsRendered = function() {
      return response._asRendered;
    };


    response.cleanRender = function() {
      response.asRendered();
      return response.pureRender.apply(response, arguments);
    };


    response.sendJson = function(data) {
      if (!response.sendingAsRendered()) {
        try {
          app.logger().info('Converting response to JSON...');
          return response.pureSend(JSON.stringify(data));
        } catch (error) {
          let e = error || {
            message: '[no message]',
            stack: '[no stack]',
            errors: [],
            errorType: 'UnknownException',
            constructor: {
              name: 'UnknownException'
            }
          };

          app.logger().info('Error occurred while trying to send response: ', e.message || '[no message]');
          app.logger().error(e.stack);

          let responseData = {
            status: 'error',
            details: e.message,
            type: e.errorType || e.constructor.name,
            errors: e.errors
          };
          if (app.environment() !== Environments.PRODUCTION) {
            responseData.trace = e.stack;
          }
          return response
              .status(e.httpStatus || DEFAULT_ERROR_HTTP_STATUS)
              .pureSend(JSON.stringify(responseData));
        }
      } else {
        app.logger().info('Sending rendered view...');
        return response.pureSend(data);
      }
    };


    response.send = response.sendJson;
    response.render = response.cleanRender;


    next();
  };
};
