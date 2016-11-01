const appRoot = require('app-root-path');

const tsc = require('typescript');
const babelJest = require('babel-jest');

const tsConfig = require(appRoot + '/tsconfig.json');

module.exports = {
  process: function process(src, path) {
    const isTypeScript = path.endsWith('.ts') || path.endsWith('.tsx');
    const isJavaScript = path.endsWith('.js') || path.endsWith('.jsx');
    const isSass = path.endsWith('.scss');
    const isJson = path.endsWith('.json');

    if (isSass) {
      return '';
    }

    if (isJson) {
      return JSON.parse(src);
    }

    let newSrc = src;

    if (isTypeScript) {
      newSrc = tsc.transpile(newSrc, tsConfig.compilerOptions);
    }

    if (isJavaScript || isTypeScript) {
      newSrc = babelJest.process(newSrc, isJavaScript ? path : 'file.js');
    }

    return newSrc;
  }
};
