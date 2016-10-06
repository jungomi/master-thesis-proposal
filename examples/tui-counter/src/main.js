'use strict';

const readline = require('readline');
const Model = require('./model');
const { increment, startIncrement } = require('./actions/counter');
const counterState = require('./state/counter');
const input = require('./user/input');
const render = require('./user/output');

const initialStore = {
  value: 0,
  buttonDisabled: false,
  counting: false
};
const model = new Model(initialStore);
const unsubscribe = counterState(model, render);
const handleIncrement = () => {
  if (!model.store.buttonDisabled) {
    model.present(increment(startIncrement(model.store)));
  }
};

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (_, key) => {
  input(key, handleIncrement, unsubscribe);
});
