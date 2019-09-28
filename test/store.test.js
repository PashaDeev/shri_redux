const { describe, it } = require('mocha');
const { expect } = require('chai');
const { createStore } = require('../build');

const actionDict = {
  CHANGE_DATA: 'CHANGE_DATA',
};

const reducer = function(state, action) {
  switch (action.type) {
    case actionDict.CHANGE_DATA:
      return { test: 'ready' };
    default:
      return { ...state };
  }
};

describe('store test', () => {
  const initState = { test: 'success' };
  it('проверка на начальное состояние', () => {
    const reducer = () => {};
    const store = createStore(reducer, initState).getState();
    expect(store).to.deep.equal(initState);
  });

  it('не переданный reducer вызывет ошибку', () => {
    expect(() => {
      createStore(null, initState);
    }).to.throw(Error);
  });

  it('reducer изменяет состояние', () => {
    const resultState = { test: 'ready' };
    const store = createStore(reducer, initState);
    store.dispatch({ type: actionDict.CHANGE_DATA });

    expect(store.getState()).to.deep.equal(resultState);
  });

  it('объект возвращенный редьюсером должен быть копией', () => {
    const reducer = function(state, action) {
      switch (action.type) {
        case actionDict.CHANGE_DATA:
          return { test: 'ready' };
        default:
          return state;
      }
    };

    const store = createStore(reducer, initState);

    expect(() => {store.dispatch({})}).to.throw(Error);
  });

  it('Вызывает обработчики при изменении состояния', () => {
    let test = 'init';

    const cb = function() {
      test = 'reuse';
    };

    const store = createStore(reducer);
    store.subscribe(cb);
    store.dispatch({});

    expect(test).to.equal('reuse');
  });

  it('Отписывается от событий стора', () => {
    let test = 'init';

    const cb = function() {
      test = 'reuse';
    };

    const store = createStore(reducer);
    const unsibscribe = store.subscribe(cb);
    unsibscribe();
    store.dispatch({});

    expect(test).to.equal('init');
  })
});
