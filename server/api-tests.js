import Path from 'path';
import Fs from 'fs';
import Mocha from 'mocha';
// import CookieParser from 'cookie-parser';


export default class ApiTest {

  static newMocha(app) {
    app.logger().info('Creating Mocha...');

    let express = app.server();
    let options = app.config().options.tests;
    let testPath = app.coreDirectory('TESTS');

    app.logger().info(`Mocha will be started with timeout ${options.timeout}...`);
    app.logger().info(`Mocha will log results to "${options.reporting.log}" file using "${options.reporting.name}" reporter...`);
    app.logger().info(`Mocha will use "${testPath}" as tests directory...`);

    let mocha = new Mocha({
      timeout: options.timeout,
      reporter: options.reporting.reporter,
      reporterOptions: {
        junit_report_name: options.reporting.name,
        junit_report_path: options.reporting.log
      }
    });

    mocha.suite.ctx.express = express;

    app.logger().info('Mocha has been initialized successfully...');
    app.logger().info(`Finding Mocha tests in test directory "${testPath}"...`);

    Fs
      .readdirSync(testPath)
      .filter(fileName => fileName.substr(-3) === '.js')
      .forEach(fileName => {
        app.logger().info(`Attaching Mocha test "${fileName}"...`);
        mocha.addFile(Path.join(testPath, fileName));
      });

    app.logger().info('Mocha tests were attached successfully...');

    return mocha;
  }


  static run(app) {
    app.logger().info('Starting API Tests...');

    let mocha = this.newMocha(app);

    app.logger().info('Starting Mocha...');
    mocha.run((failures) => {
      if (failures) {
        app.logger().info('Mocha has detected some test failures: ', failures);

        if (!!failures.stack) {
          app.logger().error('Mocha test failure details: ', failures.stack);
        }
      }

      app.logger().info('No failures in Mocha tests has been detected');
    });
  }
}
