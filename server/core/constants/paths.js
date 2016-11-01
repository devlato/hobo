'use strict';


var _ = require('lodash');
var Path = require('path');


exports.PROJECT_ROOT = process.cwd();
exports.BASE_DIR = Path.resolve(exports.PROJECT_ROOT, './server');

exports.DEFAULT_GENERATOR_DIR = Path.resolve(exports.PROJECT_ROOT, './generator');
exports.DEFAULT_GENERATOR_TEMPLATES_DIR = Path.resolve(exports.DEFAULT_GENERATOR_DIR, './templates');

exports.DEFAULT_MOCK_DIR = Path.resolve(exports.PROJECT_ROOT, './mock');
exports.DEFAULT_MOCK_TEMPLATES_DIR = Path.resolve(exports.DEFAULT_MOCK_DIR, './templates');
exports.DEFAULT_MOCK_ASSETS_DIR = Path.resolve(exports.DEFAULT_MOCK_DIR, './assets');
exports.DEFAULT_MOCK_IMAGES_DIR = Path.resolve(exports.DEFAULT_MOCK_ASSETS_DIR, './images');
exports.DEFAULT_MOCK_IMAGES_SAMPLES_DIR = Path.resolve(exports.DEFAULT_MOCK_IMAGES_DIR, './samples');
exports.DEFAULT_MOCK_IMAGES_UPLOAD_DIR = Path.resolve(exports.DEFAULT_MOCK_IMAGES_DIR, './upload');

exports.DEFAULT_CONFIG_PATH = Path.resolve(exports.BASE_DIR, './core/skeleton-config');
exports.DEFAULT_ENVIRONMENT = process.env.NODE_ENV || 'development';

exports.DEFAULT_RUNTIME_DIR = Path.resolve(exports.BASE_DIR, './runtime');
exports.DEFAULT_LOGS_DIR = Path.resolve(exports.DEFAULT_RUNTIME_DIR, './logs');

exports.DEFAULT_SERVER_APP_DIR = exports.BASE_DIR;
exports.DEFAULT_MODELS_DIR = Path.resolve(exports.DEFAULT_SERVER_APP_DIR, './models');
exports.DEFAULT_CONTROLLERS_DIR = Path.resolve(exports.DEFAULT_SERVER_APP_DIR, './controllers');
exports.DEFAULT_SERVICES_DIR = Path.resolve(exports.DEFAULT_SERVER_APP_DIR, './services');
exports.DEFAULT_ENUMERATIONS_DIR = Path.resolve(exports.DEFAULT_SERVER_APP_DIR, './enumerations');
exports.DEFAULT_MIDDLEWARES_DIR = Path.resolve(exports.DEFAULT_SERVER_APP_DIR, './middlewares');
exports.DEFAULT_MIDDLEWARES_BEFORE_DIR = Path.resolve(exports.DEFAULT_MIDDLEWARES_DIR, './before');
exports.DEFAULT_MIDDLEWARES_AFTER_DIR = Path.resolve(exports.DEFAULT_MIDDLEWARES_DIR, './after');
exports.DEFAULT_VALIDATIONS_DIR = Path.resolve(exports.DEFAULT_SERVER_APP_DIR, './validations');
exports.DEFAULT_VALIDATORS_DIR = Path.resolve(exports.DEFAULT_VALIDATIONS_DIR, './validators');
exports.DEFAULT_VALIDATION_SCHEMAS_DIR = Path.resolve(exports.DEFAULT_VALIDATIONS_DIR, './schemas');
exports.DEFAULT_TESTS_DIR = Path.resolve(exports.DEFAULT_SERVER_APP_DIR, './tests');

exports.DEFAULT_CLIENT_APP_DIR = Path.resolve(exports.PROJECT_ROOT, './app');
exports.DEFAULT_NODE_MODULES_DIR = Path.resolve(exports.PROJECT_ROOT, './node_modules');
exports.DEFAULT_CLIENT_ENTRY_POINT_PATH = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './client');
exports.DEFAULT_CLIENT_APP_IMAGES_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './images');
exports.DEFAULT_CLIENT_APP_SPRITES_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './sprites');
exports.DEFAULT_CLIENT_APP_FONTS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './fonts');
exports.DEFAULT_CLIENT_APP_SCSS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR);
exports.DEFAULT_CLIENT_APP_CSS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR);
exports.DEFAULT_CLIENT_APP_LESS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR);
exports.DEFAULT_CLIENT_APP_COMPONENTS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './components');
exports.DEFAULT_CLIENT_APP_SERVICE_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './services');
exports.DEFAULT_CLIENT_APP_ACTION_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './actions');
exports.DEFAULT_CLIENT_APP_REDUCER_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './reducers');
exports.DEFAULT_CLIENT_APP_CONTROL_COMPONENT_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_COMPONENTS_DIR, './controls');
exports.DEFAULT_CLIENT_APP_FORM_COMPONENT_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_CONTROL_COMPONENT_DIR, './forms');
exports.DEFAULT_CLIENT_APP_ITEM_COMPONENT_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_CONTROL_COMPONENT_DIR, './items');
exports.DEFAULT_CLIENT_APP_PAGE_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_COMPONENTS_DIR, './pages');
exports.DEFAULT_CLIENT_APP_DEVELOPMENT_PAGE_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_PAGE_DIR, './development');
exports.DEFAULT_CLIENT_APP_REDUX_CONNECTORS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_COMPONENTS_DIR, './connected');
exports.DEFAULT_CLIENT_APP_REDUX_PAGE_CONNECTORS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_REDUX_CONNECTORS_DIR, './pages');
exports.DEFAULT_CLIENT_APP_SCSS_SPRITES_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_COMPONENTS_DIR, './_styles/sprites/');

exports.DEFAULT_CONFIGURATION_DIR = Path.resolve(exports.DEFAULT_SERVER_APP_DIR, './configuration');
exports.DEFAULT_MAIN_CONFIGURATION_PATH = Path.resolve(exports.DEFAULT_CONFIGURATION_DIR, './config');
exports.DEFAULT_TARGET_SPECIFIC_CONFIGURATION_PATH = Path.resolve(exports.DEFAULT_CONFIGURATION_DIR, './target');
exports.DEFAULT_ENVIRONMENT_CONFIGURATION_PATH = Path.resolve(exports.DEFAULT_CONFIGURATION_DIR, './' + exports.DEFAULT_ENVIRONMENT);
exports.DEFAULT_LOCAL_CONFIGURATION_PATH = Path.resolve(exports.DEFAULT_CONFIGURATION_DIR, './local');

exports.DEFAULT_STATIC_FILES_DIR = Path.resolve(exports.PROJECT_ROOT, './public');

exports.DEFAULT_ASSETS_DIR = Path.resolve(exports.DEFAULT_STATIC_FILES_DIR, './assets');
exports.DEFAULT_UPLOAD_DIR = Path.resolve(exports.DEFAULT_STATIC_FILES_DIR, './upload');
exports.DEFAULT_RELATIVE_UPLOAD_DIR = '/upload';
exports.DEFAULT_VIEWS_COMMON_DIR = Path.resolve(exports.DEFAULT_SERVER_APP_DIR, './templates');
exports.DEFAULT_VIEWS_DIR = Path.resolve(exports.DEFAULT_VIEWS_COMMON_DIR, './views');
exports.DEFAULT_EMAIL_TEMPLATES_DIR = Path.resolve(exports.DEFAULT_VIEWS_COMMON_DIR, './emails');

exports.DEFAULT_WEBPACK_CONFIG_DIR = Path.resolve(exports.PROJECT_ROOT, './webpack');
exports.DEFAULT_WEBPACK_DEVELOPMENT_CONFIG_PATH = Path.resolve(exports.DEFAULT_WEBPACK_CONFIG_DIR, './webpack.config.' + exports.DEFAULT_ENVIRONMENT);

exports.DEFAULT_TESTS_OUTPUT_FILE_PATH = Path.resolve(exports.DEFAULT_LOGS_DIR, './test-results.xml');
