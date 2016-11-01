'use strict';


import _ from 'lodash';


export default (app) => {
  app.logger().info('Applying request params logger middleware...');

  let config = app.config().options.logRequestParams;

  return (request, response, next :Function) => {
    let requestBody = JSON.stringify(request.body);
    if (requestBody.length > config.maxBodySize) {
      requestBody = `${requestBody.substr(0, config.maxBodySize)}...`;
    }

    app.logger().info(`Logging request attributes...`);
    app.logger().info(`Params: ${JSON.stringify(request.params)}`);
    app.logger().info(`Query: ${JSON.stringify(request.query)}`);
    app.logger().info(`Cookies: ${JSON.stringify(_.merge({}, request.cookies, request.signedCookies))}`);
    app.logger().info(`Body: ${requestBody}`);
    app.logger().info(`Headers: ${JSON.stringify(request.headers)}`);

    next();
  };
};
