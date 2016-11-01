'use strict';


export default (app) => {
  app.logger().info('Applying request handler async wrapper middleware...');

  return async (request, response, next :Function) => {
    let sendResponse = response.send;

    response.safeSend = function(data) {
      try {
        app.logger().info('Sending response...');
        return sendResponse.call(response, {
          status: 'ok',
          data: data
        });
      } catch (e) {
        app.logger().info('Error occurred while trying to send response: ', e.message || '[no message]');
        app.logger().error(e.stack);
        return sendResponse.call(response, {
          status: 'error',
          details: e.message,
          trace: e.stack,
          errors: []
        });
      }
    };


    response.send = response.safeSend;


    try {
      await next();
    } catch (e) {
      app.logger().info('Error occurred while trying to process request: ', e.message);
      app.logger().error(e.stack);
      return sendResponse.call(response, {
        status: 'error',
        details: e.message,
        trace: e.stack,
        errors: []
      });
    }
  };
};
