'use strict';


import _ from 'lodash';
import PagerSortDirections from '@/core/enumerations/PagerSortDirections';
import Environments from '@/core/enumerations/Environments';
import HttpMethods from '@/core/enumerations/HttpMethods';

import Constants from './paths';


_.each(Constants, (value, key) => {
  module.exports[key] = value;
});


export const DEFAULT_ENVIRONMENT :string = process.env.NODE_ENV || Environments.DEVELOPMENT;

export const DEFAULT_WEBPACK_DEV_SERVER_PORT :number = 3000;
export const DEFAULT_WEBPACK_HOT_MIDDLEWARE_SCRIPT :string =
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

export const DEFAULT_HOST :string = '127.0.0.1';
export const DEFAULT_DISPLAY_HOST :string = 'localhost';
export const DEFAULT_PORT :number = 3000;
export const DEFAULT_PROTOCOL :string = 'http';

export const DEFAULT_ROUTER_PREFIX :string = '/';
export const DEFAULT_SUPPORTED_METHODS :Array<string> = _.values(HttpMethods);
export const EMPTY_ROUTE_CONFIGURATION :Object = {};
export const EMPTY_ROUTING_PREFIX :string = '';
export const DEFAULT_ROUTING_REGEX_PREFIX :string = 'regex:';
export const EMPTY_REGEX_DELIMITERS :string = '';
export const DEFAULT_ROUTING_REGEX_DELIMITER: RegExp = /(^\/|\/$)/ig;
export const DEFAULT_ROUTE_METHOD_DELIMITER: RegExp = /(\s|\t)/ig;
export const DEFAULT_ROUTE_CLEANUP_PATTERN: RegExp = /(^\[|\]$)/ig;
export const DEFAULT_ROUTE_CLEANUP_REPLACE :string = '';
export const DEFAULT_HTTP_METHOD :string = HttpMethods.GET;
export const DEFAULT_CONTROLLER_METHOD_DELIMITER :string = '.';
export const DEFAULT_ROUTING_AUTH_ROUTE_REGEXP :RegExp = /^\@auth\(.+?\)$/ig;
export const DEFAULT_ROUTING_AUTH_REPLACE_PATTERN :RegExp = /(^\@[a-z]+?\(|\)$)/ig;
export const DEFAULT_ROUTING_AUTH_EMPTY_PATTERN :string = '';

export const DEFAULT_MODEL_HOST :string = 'localhost';
export const DEFAULT_MOCK_HOST :string = 'localhost';

export const DEFAULT_PAGE :number = 0;
export const DEFAULT_ITEMS_PER_PAGE_AMOUNT :number = 20;
export const DEFAULT_SORT_DIRECTION :string = PagerSortDirections.ASC;
export const DEFAULT_SORT_FIELDS :Array<string> = ['id'];

export const DEFAULT_RELEASE_VERSION :string = 'latest';
export const RELEASE_TIMESTAMP :number = new Date().getTime();

export const DEFAULT_COOKIE_SECRET :string = 'verysecretcookie';

export const DEFAULT_SESSION_SECRET :string = DEFAULT_COOKIE_SECRET;
export const DEFAULT_SESSION_COOKIE_DOMAIN :string = `${DEFAULT_HOST}:${DEFAULT_PORT}`;
export const DEFAULT_SESSION_COOKIE_LIFETIME :number = 365 * 24 * 60 * 60 * 1000;

export const DEFAULT_REDIS_HOST :string = '127.0.0.1';
export const DEFAULT_REDIS_PORT :number = 6379;
export const DEFAULT_REDIS_IP_FAMILY :number = 4;
export const DEFAULT_REDIS_DB :number = 0;
export const DEFAULT_REDIS_TTL :number = 250;

export const DEFAULT_ERROR_HTTP_STATUS :number = 400;
export const HTTP_STATUS_NOT_FOUND :number = 404;
export const HTTP_STATUS_FORBIDDEN :number = 403;
export const HTTP_STATUS_SERVER_ERROR :number = 500;
export const HTTP_STATUS_CONFLICT :number = 409;
export const HTTP_STATUS_SERVICE_UNAVAILABLE :number = 503;

export const EXIT_STATUS_INITIALIZATION_FAILED = 1;
