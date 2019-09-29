const createStore = require('./create_store');
const applyMiddleware = require('./apply_middleware');
const middleware = require('./function_middleware');

// eslint-disable-next-line func-names
(function(root) {
  const forExport = { createStore, applyMiddleware, middleware };

  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = forExport;
    // eslint-disable-next-line no-undef
  } else if (typeof define === 'function' && define.amd) {
    // eslint-disable-next-line no-undef
    define([], func);
  } else if (typeof exports === 'object') {
    exports.redux = forExport;
  }
  // eslint-disable-next-line no-param-reassign
  root.redux = forExport;
})((typeof window !== 'undefined' && window) || global);
