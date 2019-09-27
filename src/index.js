import createStore from './create_store';
import applyMiddleware from './apply_middleware';

// eslint-disable-next-line func-names
(function(root) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = { createStore, applyMiddleware };
    // eslint-disable-next-line no-undef
  } else if (typeof define === 'function' && define.amd) {
    // eslint-disable-next-line no-undef
    define([], func);
  } else if (typeof exports === 'object') {
    exports.redux = { createStore, applyMiddleware };
  }
  // eslint-disable-next-line no-param-reassign
  root.redux = { createStore, applyMiddleware };
  if (typeof window !== `undefined`) {
    window.redux = { createStore, applyMiddleware };
  }

  if (typeof global !== `undefined`) {
    global.redux = { createStore, applyMiddleware };
  }
})(this);
