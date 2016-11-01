'use strict';


import ExpressCookieParser from 'cookie-parser';


module.exports = {
  register(app) {
    app.logger().info('Applying cookie parsing middleware...');

    let config = app.config().options.cookies;

    return app.server().use(ExpressCookieParser(config.secret, config.options));
  }
};
