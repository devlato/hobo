const Webpack = require('webpack');
const WebpackSpritePlugin = require('sprite-webpack-plugin');
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCompressionPlugin = require('compression-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');
// const Fs = require('fs');


const Settings = require('./settings');

const PNG_FILES_PATTERN = /\.png$/;
const JPG_FILES_PATTERN = /\.jpg$/;

const URL_IMAGE_LOADER = Settings.URL_LOADER + '?limit=10000';
const PNG_LOADER = URL_IMAGE_LOADER + '&mimetype=image/png';
const JPG_LOADER = URL_IMAGE_LOADER + '&mimetype=image/jpeg';


const CSS_LOADER = Settings.CSS_LOADER + '&importLoaders=1&minimize';
const CSS_LOADER_CLEAN = Settings.CSS_LOADER_CLEAN + '&importLoaders=1';
const PREPROCESSOR_TO_CSS_LOADER = CSS_LOADER + '!' + Settings.POSTCSS_LOADER + '!' +
  Settings.RESOLVE_URL_LOADER;
const PREPROCESSOR_TO_CSS_LOADER_CLEAN = CSS_LOADER_CLEAN + '!' + Settings.POSTCSS_LOADER + '!' +
  Settings.RESOLVE_URL_LOADER;
const LESS_TO_CSS_LOADER = PREPROCESSOR_TO_CSS_LOADER + '!' + Settings.LESS_LOADER;
const SCSS_TO_CSS_LOADER = PREPROCESSOR_TO_CSS_LOADER + '!' + Settings.SCSS_LOADER;

const CLIENT_COMPILATION_DEVTOOL = 'source-map';
const CLIENT_OUTPUT_STYLES_NAME = 'styles/main.css';

const WEBPACK_ENABLED_PLUGINS = [
  new Webpack.optimize.OccurenceOrderPlugin(),
  new WebpackExtractTextPlugin(CLIENT_OUTPUT_STYLES_NAME),
  new Webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new Webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false
      },
      compressor: {
        warnings: false,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        if_return: true,
        cascade: true
      }
    }
  ),
  new Webpack.optimize.DedupePlugin(),
  new WebpackSpritePlugin({
    source: Settings.DEFAULT_CLIENT_APP_IMAGES_DIR,
    imgPath: Settings.DEFAULT_CLIENT_APP_SPRITES_DIR,
    cssPath: Settings.DEFAULT_CLIENT_APP_SCSS_SPRITES_DIR,
    format: Settings.SPRITE_IMAGE_FORMAT,
    prefix: Settings.SPRITE_STYLE_CLASS_PREFIX,
    spriteName: Settings.SPRITE_STYLE_FILE_NAME_PREFIX,
    processor: Settings.SPRITE_STYLE_PROCESSOR,
    bundleMode: Settings.SPRITE_BUNDLE_MODE,
    useImport: true
  }),
  new WebpackCompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })];

const WEBPACK_ENABLED_SERVER_PLUGINS = [
  new Webpack.optimize.OccurenceOrderPlugin(),
  new Webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new Webpack.optimize.DedupePlugin()
];


const clientLoaders = [{
  test: Settings.ES6_JS_FILES_PATTERN,
  loaders: Settings.BABEL_LOADER,
  include: Settings.DEFAULT_CLIENT_APP_DIR,
  exclude: Settings.NODE_MODULES_DIR_PATTERN
}, {
  test: Settings.TYPESCRIPT_FILES_PATTERN,
  loaders: Settings.TYPESCRIPT_LOADER,
  include: Settings.DEFAULT_CLIENT_APP_DIR,
  exclude: Settings.NODE_MODULES_DIR_PATTERN
}, {
  test: Settings.PUG_FILES_PATTERN,
  loader: Settings.PUG_LOADER
}, {
  test: Settings.JSON_FILES_PATTERN,
  loader: Settings.JSON_LOADER
}, {
  test: PNG_FILES_PATTERN,
  include: Settings.IMAGES_INCLUDE,
  loader: PNG_LOADER
}, {
  test: JPG_FILES_PATTERN,
  include: Settings.IMAGES_INCLUDE,
  loader: JPG_LOADER
}, {
  test: Settings.GIF_FILES_PATTERN,
  include: Settings.IMAGES_INCLUDE,
  loader: Settings.GIF_LOADER
}, {
  test: Settings.CSS_FILES_PATTERN,
  // include: CSS_DIRS,
  loader: WebpackExtractTextPlugin.extract(Settings.STYLE_LOADER, PREPROCESSOR_TO_CSS_LOADER_CLEAN)
}, {
  test: Settings.SCSS_FILES_PATTERN,
  include: Settings.DEFAULT_CLIENT_APP_SCSS_DIR,
  loader: WebpackExtractTextPlugin.extract(Settings.STYLE_LOADER, SCSS_TO_CSS_LOADER)
}, {
  test: Settings.LESS_FILES_PATTERN,
  include: Settings.DEFAULT_CLIENT_APP_LESS_DIR,
  loader: WebpackExtractTextPlugin.extract(Settings.STYLE_LOADER, LESS_TO_CSS_LOADER)
}, {
  test: Settings.WOFF_FONT_FILES_PATTERN,
  include: Settings.DEFAULT_CLIENT_APP_FONTS_DIR,
  loader: Settings.WOFF_LOADER
}, {
  test: Settings.TTF_FONT_FILES_PATTERN,
  include: Settings.DEFAULT_CLIENT_APP_FONTS_DIR,
  loader: Settings.TTF_LOADER
}, {
  test: Settings.EOT_FONT_FILES_PATTERN,
  include: Settings.DEFAULT_CLIENT_APP_FONTS_DIR,
  loader: Settings.EOT_LOADER
}, {
  test: Settings.SVG_IMAGE_FILES_PATTERN,
  include: Settings.IMAGES_INCLUDE,
  loader: Settings.SVG_LOADER
}];


const serverLoaders = [{
  test: Settings.ES6_JS_FILES_PATTERN,
  loaders: Settings.BABEL_LOADER,
  include: [Settings.DEFAULT_SERVER_APP_DIR, Settings.DEFAULT_WEBPACK_CONFIG_DIR]
}, {
  test: Settings.PUG_FILES_PATTERN,
  loader: Settings.PUG_LOADER
}, {
  test: Settings.JSON_FILES_PATTERN,
  loader: Settings.JSON_LOADER
}];


module.exports = [{
  name: 'Client-Side Bundle',
  devtool: CLIENT_COMPILATION_DEVTOOL,
  context: Settings.DEFAULT_CLIENT_APP_DIR,
  entry: {
    app: Settings.SHIMS.concat([Settings.CLIENT_APP_ENTRY])
  },
  output: {
    path: Settings.DEFAULT_ASSETS_DIR,
    filename: Settings.CLIENT_APP_COMPILED_OUTPUT_FILE_PATTERN,
    publicPath: Settings.ASSETS_DIR_PATTERN
  },
  module: {
    loaders: clientLoaders
  },
  postcss: Settings.POSTCSS_ENABLED_MODULES,
  resolve: {
    extensions: Settings.RESOLVED_EXTENSIONS,
    modulesDirectories: Settings.RESOLVED_MODULE_DIRECTORIES
  },
  plugins: WEBPACK_ENABLED_PLUGINS
}, {
  name: 'Server-Side Bundle',
  devtool: CLIENT_COMPILATION_DEVTOOL,
  context: Settings.DEFAULT_SERVER_APP_DIR,
  target: 'node',
  entry: {
    app: Settings.SHIMS.concat([Settings.SERVER_APP_ENTRY])
  },
  output: {
    path: Settings.DEFAULT_ASSETS_DIR,
    filename: Settings.SERVER_APP_COMPILED_OUTPUT_FILE_PATTERN,
    publicPath: Settings.ASSETS_DIR_PATTERN
  },
  module: {
    loaders: serverLoaders
  },
  externals: [webpackNodeExternals()],
  resolve: {
    extensions: Settings.RESOLVED_SERVER_EXTENSIONS,
    modulesDirectories: Settings.RESOLVED_SERVER_MODULE_DIRECTORIES
  },
  plugins: WEBPACK_ENABLED_SERVER_PLUGINS
}];
