/**
 * Фнкция для создания цепочки из middlewares
 * @param middlewares bиспользуемые в приложении
 * @return function Вернет функцию которая создаст цепочку
 */
function composeMiddlewares(...middlewares) {
  if (!middlewares.length) {
    throw new Error('no pass one middleware');
  }

  if (middlewares.length === 1) {
    return middlewares[0];
  }

  return middlewares.reduce((prev, curr) => (...args) => prev(curr(...args)));
}

/**
 * Функция для создания цепочки из middlewares,
 * @param middlewares принимает в качестве аргументов middlewares
 * @return {function(*, *=, ...[*]): {dispatch: *, store: *}} Возврщает функцию для стора
 */
export default function applyMiddleware(...middlewares) {
  /**
   * Фнкция, которая исполняется непосредственно в сторе
   * @param createStore функция создания стора
   * @param reducer
   * @param args начальное состояние
   * @return {{dispatch: *, store: *}}
   */
  return (createStore, reducer, ...args) => {
    const store = createStore(reducer, ...args);

    let dispatch = () => {
      throw new Error('dispatch called too early');
    };

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...payload) => dispatch(action, ...payload),
    };

    const middleWaresWithCurrentStore = middlewares.map(middleware => middleware(middlewareAPI));

    dispatch = composeMiddlewares(...middleWaresWithCurrentStore)(store.dispatch);

    return {
      store,
      dispatch,
    };
  };
}
