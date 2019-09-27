//todo тесты длы middleware

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { createStore, applyMiddleware, middleware } = require('../build');

describe('middleware test', () => {
  it('Не вызывает ошибку', () => {
    const store = createStore(() => {}, applyMiddleware(middleware));
  })
})
