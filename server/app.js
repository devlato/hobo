import App from '@/core/bootstrap';
// import ApiTests from './api-tests';


class AppFactory {

  static app() {
    if (!this._app) {
      this._app = AppFactory.newApp();
    }

    return this._app;
  }


  static server() {
    return AppFactory.app().server();
  }


  static newApp() {
    return new App();
  }


  static async run() {
    return await AppFactory.app().run();
  }


  static async handleSignals() {
    this.server().on('SIGNIT', () => {
      console.log('Stopping server...');
      this.server().close();
    });
  }


  static async start() {
    try {
      let app = await AppFactory.run();
      this.handleSignals();
      return app;
    } catch (e) {
      console.log('Failed to start app: ', e.message || '[no message]');
      console.error(e.stack);
    }
  }
}

(async() => {
  try {
    let app = await AppFactory.start();
    // if (app.environment() === 'development') {
    //   ApiTests.run(app);
    // }
  } catch (e) {
    console.log('Failed to start app: ', e.message || '[no message]');
    console.error(e.stack);
  }
})();
