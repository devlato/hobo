'use strict';


export default (app) => {
  app.logger().info('Applying original send backup middleware...');

  return (request, response, next :Function) => {
    let send = response.send;
    let render = response.render;

    response.pureSend = function() {
      return send.apply(response, arguments);
    };

    response.pureRender = function() {
      response.send = send;
      return render.apply(response, arguments);
    };

    next();
  };
};
