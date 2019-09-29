function isFunction(obj) {
  return typeof obj === 'function';
}

/**
 * Фнкция для создания редьюсера
 * @param reducer
 * @param initialState: object|function Может быть объектом начального стора или applay middleware
 * @param extension: object|function Может быть объектом начального стора или applay middleware
 * @return {{dispatch(*=): void, getState: (function(): *), subscribe(*=): *}|Function}
 */
module.exports = function createStore(reducer, initialState, extension) {
  if (typeof reducer !== 'function') throw new Error('reducer must be function');

  if ([initialState, extension].every(item => isFunction(item))) {
    throw new Error('can be only one store extension as function');
  }

  if (isFunction(initialState) && extension === undefined) {
    const applyMiddlewares = initialState;
    const preloadState = undefined;
    return applyMiddlewares(createStore, reducer, preloadState);
  }

  const currentReducer = reducer;
  let state = currentReducer(initialState, { type: 'INIT', payload: {} });

  const subscribers = [];
  return {
    dispatch(action) {
      if (typeof action === 'function') {
        throw new Error('action must be plane object');
      }
      const oldState = state;

      state = currentReducer(state, action);

      if (state === oldState) {
        throw new Error('reducer must return copy of object');
      }

      subscribers.forEach(subscriber => {
        subscriber(state);
      });
    },

    getState: () => state,

    subscribe(cb) {
      subscribers.push(cb);

      return () => {
        const index = subscribers.indexOf(cb);

        if (index >= 0) {
          subscribers.splice(index, 1);
        }
      };
    },
  };
};
