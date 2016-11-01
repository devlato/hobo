'use strict';


import _ from 'lodash';
import Session from 'express-session';


module.exports = {
  register(app) {
    app.logger().info('Applying session middleware...');

    let config = app.config().options.session;
    let sessionOptions = _.omit(config, ['redisOptions']);

    let session = Session(sessionOptions);

    let sessionRoutes = config.routes;

    app.server().use(sessionRoutes, session);

    return app.server().use((request, response, next :Function) => {
      app.logger().info(`Request with session id "${request.session && request.session.id || '[no session started]'}"`);
      next();
    });
  }
};
