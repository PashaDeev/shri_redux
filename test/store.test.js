const { describe, it } = require('mocha');
const { expect } = require('chai');
const { createStore } = require('../build');

describe('store test', () => {
  it('проверка на начальное состояние', () => {
    const initState = { test: 'success' };
    const reducer = () => {};
    const store = createStore(reducer, initState).getState();
    expect(store).to.deep.equal(initState);
  });
});
