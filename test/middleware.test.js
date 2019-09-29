//todo тесты длы middleware

const { describe, it } = require('mocha');
const { expect, should } = require('chai');
const { createStore, applyMiddleware, middleware } = require('../src/store/index');

describe('middleware test', () => {
  it('Не вызывает ошибку', () => {
    expect(() => {
      const store = createStore(() => {}, applyMiddleware(middleware));
    }).not.Throw();
  });

  it('dispatch принимает функцию', () => {
    const store = createStore(() => {}, applyMiddleware(middleware));

    const cb = () => {};

    expect(() => {
      store.dispatch(cb)
    }).not.Throw();
  });

  it('Проверка асинхронной функции', async () => {
    const store = createStore((state, action) => {
      if (!action) return { ...state };

      switch (action.type) {
        case 'INIT':
          return { ...state, test: 'init' };
        case 'get_data':
          return { ...state, ...action.payload };
        default:
          return { ...state };
      }
    }, applyMiddleware(middleware));

    let timeout;

    function fetchData() {
      return dispatch => {
        setTimeout(() => {
          dispatch({ type: 'get_data', payload: { test: 'test' } });
        }, 10);
      };
    }

    let resolve;
    const promise = new Promise(res => resolve = res);

    store.subscribe(data => {
      expect(data.test).to.equal('test');
      clearTimeout(timeout);
      resolve();
    });

    store.dispatch(fetchData());
    timeout = setTimeout(() => {
      expect(() => {
        resolve();
        throw new Error();
      }).not.throw(Error);
    }, 1000);
    await promise;
  })
});
