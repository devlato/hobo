'use strict';


export default (config, cmdArgs) => {
  let middlewaresBefore = [
    'appToRequest',
    'pureSend',
    'jsonRequest',
    'safeRequest',
    'requestTime',
    'cookieParser',
    'session'
  ];

  if (cmdArgs['serve-static']) {
    middlewaresBefore.push('serveStatic');
  }

  return {
    server: {
      environment: 'production',
      showPort: false
    },
    middlewares: {
      before: middlewaresBefore,
      after: [
        'requestException'
      ]
    }
  };
}
