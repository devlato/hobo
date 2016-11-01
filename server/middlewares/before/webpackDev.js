import middleware from 'webpack-dev-middleware';


module.exports = {
  register(app) {
    app.logger().info('Applying Webpack dev middleware...');

    const config = app.config().options.webpack || {};
    const compiler = config.compiler;

    const publicPath = config.options && config.options.output ? config.options.output.publicPath : {};

    app.server().use(middleware(compiler, {
      noInfo: true,
      publicPath
    }));
  }
};
