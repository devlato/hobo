'use strict';


export default (app) => {
  app.logger().info('Applying request processing time measure middleware...');

  return (request, response, next :Function) => {
    let sendResponse = response.send;
    request._startTime = new Date();

    app.logger().info(`Request processing started at ${request._startTime}`);

    response.timedSend = function(data) {
      request._endTime = new Date();
      app.logger().info(`Request processing finished at ${request._endTime}`);

      request._timeElapsed = request._endTime - request._startTime;
      app.logger().info(`Request processing elapsed ${request._timeElapsed}ms`);

      return sendResponse.call(response, data);
    };


    response.send = response.timedSend;


    next();
  };
};
