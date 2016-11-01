import Path from 'path';
import Paths from '@/core/constants/paths';


module.exports = {
  server: {
    environment: 'development',
    port: 8095,
    showPort: true
  },
  logger: console,
  csrf: {
    path: '/api',
    keyTtl: 3 * 60 * 60 * 1000  // Key per day
  },
  session: {
    name: 'uiSessionId',
    routes: '*',
    redisOptions: {
      prefix: 'uiSessionId:',
      ttl: 3 * 60 * 60,
      redisConnectionCheckPeriod: 200
    },
    cookie: {
      secure: false
    },
    secret: 'secret shit'
  },
  cookies: {
    secret: 'secret shit'
  },
  routing: {
    routes: {
      '[GET] *': 'EntryPointController.getEntryPoint'
    }
  }
};
