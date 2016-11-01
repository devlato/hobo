import Webpack from 'webpack';
import WebpackSpritePlugin from 'sprite-webpack-plugin';

import {
    DEFAULT_ASSETS_DIR,
    DEFAULT_CLIENT_APP_DIR,
    DEFAULT_CLIENT_APP_FONTS_DIR,
    DEFAULT_CLIENT_APP_CSS_DIR,
    DEFAULT_CLIENT_APP_SCSS_DIR,
    DEFAULT_CLIENT_APP_LESS_DIR,
    IMAGES_INCLUDE,
    BABEL_LOADER,
    TYPESCRIPT_LOADER,
    JSON_LOADER,
    IMAGES_LOADER,
    WOFF_LOADER,
    TTF_LOADER,
    EOT_LOADER,
    SVG_LOADER,
    GIF_LOADER,
    STYLE_CSS_LOADER,
    LESS_TO_CSS_LOADER,
    SCSS_TO_CSS_LOADER,
    RESOLVED_EXTENSIONS,
    RESOLVED_MODULE_DIRECTORIES,
    ES6_JS_FILES_PATTERN,
    TYPESCRIPT_FILES_PATTERN,
    JSON_FILES_PATTERN,
    IMAGE_FILES_PATTERN,
    GIF_FILES_PATTERN,
    SVG_IMAGE_FILES_PATTERN,
    WOFF_FONT_FILES_PATTERN,
    TTF_FONT_FILES_PATTERN,
    EOT_FONT_FILES_PATTERN,
    CSS_FILES_PATTERN,
    STYLE_CSS_LOADER_MODULE,
    LESS_FILES_PATTERN,
    SCSS_FILES_PATTERN,
    NODE_MODULES_DIR_PATTERN,
    ASSETS_DIR_PATTERN,
    CLIENT_APP_ENTRY,
    CLIENT_APP_COMPILED_OUTPUT_FILE_PATTERN,
    POSTCSS_ENABLED_MODULES,
    DEFAULT_CLIENT_APP_IMAGES_DIR,
    DEFAULT_CLIENT_APP_SPRITES_DIR,
    DEFAULT_CLIENT_APP_SCSS_SPRITES_DIR,
    SPRITE_IMAGE_FORMAT,
    SPRITE_STYLE_CLASS_PREFIX,
    SPRITE_STYLE_FILE_NAME_PREFIX,
    SPRITE_STYLE_PROCESSOR,
    SPRITE_BUNDLE_MODE,
    SHIMS,
    PUG_FILES_PATTERN,
    PUG_LOADER
} from './settings';


import {
    DEFAULT_WEBPACK_HOT_MIDDLEWARE_SCRIPT
} from '@/core/constants';


let commonLoaders = [{
  test: ES6_JS_FILES_PATTERN,
  loaders: BABEL_LOADER,
  include: DEFAULT_CLIENT_APP_DIR,
  exclude: NODE_MODULES_DIR_PATTERN
}, {
  test: TYPESCRIPT_FILES_PATTERN,
  loaders: TYPESCRIPT_LOADER,
  include: DEFAULT_CLIENT_APP_DIR,
  exclude: NODE_MODULES_DIR_PATTERN
}, {
  test: PUG_FILES_PATTERN,
  loader: PUG_LOADER
}, {
  test: JSON_FILES_PATTERN,
  loader: JSON_LOADER
}, {
  test: IMAGE_FILES_PATTERN,
  // include: IMAGES_INCLUDE,
  loader: IMAGES_LOADER
}, {
  test: GIF_FILES_PATTERN,
  // include: IMAGES_INCLUDE,
  loader: GIF_LOADER
}, {
  test: WOFF_FONT_FILES_PATTERN,
  // include: DEFAULT_CLIENT_APP_FONTS_DIR,
  loader: WOFF_LOADER
}, {
  test: TTF_FONT_FILES_PATTERN,
  // include: DEFAULT_CLIENT_APP_FONTS_DIR,
  loader: TTF_LOADER
}, {
  test: EOT_FONT_FILES_PATTERN,
  // include: DEFAULT_CLIENT_APP_FONTS_DIR,
  loader: EOT_LOADER
}, {
  test: SVG_IMAGE_FILES_PATTERN,
  // include: IMAGES_INCLUDE,
  loader: SVG_LOADER
}];


let CLIENT_COMPILATION_DEVTOOL = 'eval';
let WEBPACK_ENABLED_PLUGINS = [
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.NoErrorsPlugin(),
  new WebpackSpritePlugin({
    source: DEFAULT_CLIENT_APP_IMAGES_DIR,
    imgPath: DEFAULT_CLIENT_APP_SPRITES_DIR,
    cssPath: DEFAULT_CLIENT_APP_SCSS_SPRITES_DIR,
    format: SPRITE_IMAGE_FORMAT,
    prefix: SPRITE_STYLE_CLASS_PREFIX,
    spriteName: SPRITE_STYLE_FILE_NAME_PREFIX,
    processor: SPRITE_STYLE_PROCESSOR,
    bundleMode: SPRITE_BUNDLE_MODE,
    useImport: true
  })
];



let webpack = {
  devtool: CLIENT_COMPILATION_DEVTOOL,
  name: 'Client-Side Bundle',
  context: DEFAULT_CLIENT_APP_DIR,
  entry: {
    app: SHIMS.concat([
      CLIENT_APP_ENTRY,
      DEFAULT_WEBPACK_HOT_MIDDLEWARE_SCRIPT
    ])
  },
  output: {
    path: DEFAULT_ASSETS_DIR,
    filename: CLIENT_APP_COMPILED_OUTPUT_FILE_PATTERN,
    publicPath: ASSETS_DIR_PATTERN
  },
  module: {
    loaders: commonLoaders.concat([{
      test: SCSS_FILES_PATTERN,
      include: DEFAULT_CLIENT_APP_SCSS_DIR,
      loader: SCSS_TO_CSS_LOADER
    }, {
      test: LESS_FILES_PATTERN,
      include: DEFAULT_CLIENT_APP_LESS_DIR,
      loader: LESS_TO_CSS_LOADER
    }, {
      test: CSS_FILES_PATTERN,
      // include: [DEFAULT_CLIENT_APP_CSS_DIR],
      loader: STYLE_CSS_LOADER_MODULE
    }])
  },
  postcss: POSTCSS_ENABLED_MODULES,
  resolve: {
    extensions: RESOLVED_EXTENSIONS,
    modulesDirectories: RESOLVED_MODULE_DIRECTORIES
  },
  plugins: WEBPACK_ENABLED_PLUGINS
};


module.exports = webpack;
