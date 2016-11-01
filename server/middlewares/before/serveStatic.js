'use strict';


import Express from 'express';


module.exports = {
  register(app) {
    app.logger().info('Applying static files serving middleware...');

    return app.server().use(Express.static(app.coreDirectory('STATIC_FILES')));
  }
};
