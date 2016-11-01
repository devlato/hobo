const Path = require('path');


exports.PROJECT_ROOT = Path.join(__dirname, '..');
exports.BASE_PATH = Path.join(exports.PROJECT_ROOT, './server');
exports.PATH_CONSTANTS_PATH = Path.join(exports.BASE_PATH, './core/constants/paths');


const PostCssNext = require('postcss-cssnext');
const PostCssPreCss = require('precss');
const PostCssLost = require('lost');
const PostCssNano = require('cssnano');
const PostCssFontMagician = require('postcss-font-magician');
const PostCssPropertyLookup = require('postcss-property-lookup');
const PostCssShort = require('postcss-short');
const PostCssPixrem = require('pixrem');
const PostCssAspectRatio = require('postcss-aspect-ratio');
const PostCssAnimation = require('postcss-animation');
const PostCssRucksack = require('rucksack-css');

const Constants = require('../server/core/constants/paths');


exports.DEFAULT_ASSETS_DIR = Constants.DEFAULT_ASSETS_DIR;
exports.DEFAULT_CLIENT_APP_DIR = Constants.DEFAULT_CLIENT_APP_DIR;
exports.DEFAULT_SERVER_APP_DIR = Constants.DEFAULT_SERVER_APP_DIR;
exports.DEFAULT_CLIENT_APP_IMAGES_DIR = Constants.DEFAULT_CLIENT_APP_IMAGES_DIR;
exports.DEFAULT_CLIENT_APP_SPRITES_DIR = Constants.DEFAULT_CLIENT_APP_SPRITES_DIR;
exports.DEFAULT_NODE_MODULES_DIR = Constants.DEFAULT_NODE_MODULES_DIR;
exports.DEFAULT_CLIENT_APP_FONTS_DIR = Constants.DEFAULT_CLIENT_APP_FONTS_DIR;
exports.DEFAULT_CLIENT_APP_CSS_DIR = Constants.DEFAULT_CLIENT_APP_CSS_DIR;
exports.DEFAULT_CLIENT_APP_SCSS_DIR = Constants.DEFAULT_CLIENT_APP_SCSS_DIR;
exports.DEFAULT_CLIENT_APP_LESS_DIR = Constants.DEFAULT_CLIENT_APP_LESS_DIR;
exports.DEFAULT_CLIENT_APP_SCSS_SPRITES_DIR = Constants.DEFAULT_CLIENT_APP_SCSS_SPRITES_DIR;
exports.DEFAULT_WEBPACK_CONFIG_DIR = Constants.DEFAULT_WEBPACK_CONFIG_DIR;

exports.IMAGES_INCLUDE = [
  exports.DEFAULT_CLIENT_APP_IMAGES_DIR,
  exports.DEFAULT_CLIENT_APP_SPRITES_DIR
];

exports.BABEL_LOADER = ['babel'];
exports.TYPESCRIPT_LOADER = ['ts'];
exports.ESLINT_LOADER = ['eslint'];
exports.URL_LOADER = 'url';
exports.FILE_LOADER = 'file';
exports.JSON_LOADER = 'json';
exports.PUG_LOADER = 'pug';
exports.STYLE_LOADER = 'style';
exports.CSS_LOADER_MODULE = 'css?module';
exports.CSS_LOADER = exports.CSS_LOADER_MODULE + '&localIdentName=[local]__[hash:base64:5]';
exports.CSS_LOADER_CLEAN = exports.CSS_LOADER_MODULE + '&localIdentName=[local]';
exports.POSTCSS_LOADER = 'postcss';
exports.RESOLVE_URL_LOADER = 'resolve-url';
exports.LESS_LOADER =
        'less?sourceMap&outputStyle=expanded' +
        '&includePaths[]=' + encodeURIComponent(exports.DEFAULT_CLIENT_APP_LESS_DIR) +
        '&includePaths[]=' + encodeURIComponent(exports.DEFAULT_CLIENT_APP_CSS_DIR);
exports.SCSS_LOADER =
        'sass?sourceMap&outputStyle=expanded' +
        '&includePaths[]=' + encodeURIComponent(exports.DEFAULT_CLIENT_APP_SCSS_DIR) +
        '&includePaths[]=' + encodeURIComponent(exports.DEFAULT_CLIENT_APP_CSS_DIR);

exports.IMAGES_LOADER = exports.URL_LOADER;
exports.GIF_LOADER = exports.URL_LOADER + '?limit=10000&mimetype=image/gif';
exports.WOFF_LOADER = exports.URL_LOADER + '?limit=10000&mimetype=application/font-woff';
exports.TTF_LOADER = exports.URL_LOADER + '?limit=10000&mimetype=application/octet-stream';
exports.EOT_LOADER = exports.FILE_LOADER;
exports.SVG_LOADER = 'svg-url-loader';
exports.STYLE_CSS_LOADER = exports.STYLE_LOADER + '!' + exports.CSS_LOADER;
exports.STYLE_CSS_LOADER_MODULE = exports.STYLE_LOADER + '!' + exports.CSS_LOADER_CLEAN;
exports.CSS_PREPROCESSOR_LOADER_CLEAN = exports.STYLE_CSS_LOADER + '&importLoaders=1';
exports.CSS_PREPROCESSOR_LOADER = exports.CSS_PREPROCESSOR_LOADER_CLEAN + '&sourceMap';
exports.PREPROCESSOR_TO_CSS_LOADER = exports.CSS_PREPROCESSOR_LOADER + '!' +
    exports.POSTCSS_LOADER + '!' + exports.RESOLVE_URL_LOADER;
exports.LESS_TO_CSS_LOADER = exports.PREPROCESSOR_TO_CSS_LOADER + '!' + exports.LESS_LOADER;
exports.SCSS_TO_CSS_LOADER = exports.PREPROCESSOR_TO_CSS_LOADER + '!' + exports.SCSS_LOADER;

exports.RESOLVED_EXTENSIONS = ['', '.js', '.jsx', '.scss', '.css', '.less', '.ts'];
exports.RESOLVED_MODULE_DIRECTORIES = ['app', 'node_modules'];

exports.RESOLVED_SERVER_EXTENSIONS = ['', '.js', '.json', '.pug'];
exports.RESOLVED_SERVER_MODULE_DIRECTORIES = ['./server', 'node_modules', './webpack'];

exports.SPRITE_STYLE_PROCESSOR = 'scss';
exports.SPRITE_STYLE_CLASS_PREFIX = 'icon';
exports.SPRITE_STYLE_FILE_NAME_PREFIX = 'sprites';
exports.SPRITE_IMAGE_FORMAT = 'png';
exports.SPRITE_BUNDLE_MODE = 'multiple';

exports.PUG_FILES_PATTERN = /\.pug$/;
exports.ES6_JS_FILES_PATTERN = /\.js$|\.jsx$/;
exports.TYPESCRIPT_FILES_PATTERN = /\.ts$/;
exports.JSON_FILES_PATTERN = /\.json$/;
exports.IMAGE_FILES_PATTERN = /\.(png|jpg)$/;
exports.GIF_FILES_PATTERN = /\.gif$/;
exports.SVG_IMAGE_FILES_PATTERN = /\.svg/;
exports.WOFF_FONT_FILES_PATTERN = /\.woff(\?v=\d+\.\d+\.\d+)?$/;
exports.TTF_FONT_FILES_PATTERN = /\.ttf(\?v=\d+\.\d+\.\d+)?$/;
exports.EOT_FONT_FILES_PATTERN = /\.eot(\?v=\d+\.\d+\.\d+)?$/;
exports.CSS_FILES_PATTERN = /\.css$/;
exports.LESS_FILES_PATTERN = /\.less$/;
exports.SCSS_FILES_PATTERN = /\.scss$/;
exports.NODE_MODULES_DIR_PATTERN = /node_modules/;
exports.ASSETS_DIR_PATTERN = '/assets/';

exports.CLIENT_APP_ENTRY = './client';
exports.SERVER_APP_ENTRY = './app';
exports.CLIENT_APP_COMPILED_OUTPUT_FILE_PATTERN = '[name].js';
exports.SERVER_APP_COMPILED_OUTPUT_FILE_PATTERN = '[name].server.js';
exports.SERVER_APP_LIBRARY_TARGET_FORMAT = 'commonjs2';

exports.SHIMS = [
    'es5-shim/es5-shim',
    'es5-shim/es5-sham',
    'json3/lib/json3',
    'es6-shim/es6-shim',
    'es6-shim/es6-sham',
    'es7-shim/es7-shim',
    'babel-polyfill'
];


const postCssFontMagician = PostCssFontMagician();  // {protocol: 'https'}
const postCssNext = PostCssNext({
  warnForDuplicates: false
});
const postCssNano = PostCssNano({
  discardComments: {
    removeAll: true
  },
  calc: true,
  convertValues: true,
  core: true,
  discardDuplicates: true,
  discardEmpty: true,
  discardOverridden: true,
  mergeIdents: true,
  mergeRules: true,
  minifyFontValues: true,
  minifyGradients: true,
  minifySelectors: true,
  orderedValues: true,
  styleCache: true,
  svgo: true,
  uniqueSelectors: true
});


exports.POSTCSS_ENABLED_MODULES = [
  PostCssRucksack(), postCssNext, PostCssPreCss(), postCssFontMagician,
  PostCssLost(), postCssNano, PostCssShort(), PostCssPixrem(),
  PostCssPropertyLookup(), PostCssAspectRatio(),
  PostCssAnimation()
];
