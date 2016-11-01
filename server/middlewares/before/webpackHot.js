'use strict';


import middleware from 'webpack-hot-middleware';


module.exports = {
  register(app) {
    app.logger().info('Applying Webpack hot module replacement middleware...');

    let compiler = app.config().options.webpack.compiler;

    app.server().use(middleware(compiler));
  }
};
