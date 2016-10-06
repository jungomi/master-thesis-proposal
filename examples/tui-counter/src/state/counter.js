'use strict';

const { logCounter, logState } = require('../debug');
const { counterNap } = require('../naps/counter');

const prompt = 'Press U to unsubscribe from the state notifications\n'
  + 'Press Q to quit\n'
  + 'Press any key to increment the counter';

const counterState = (model, render) => {
  let unsubscribe;

  const tryUnsubscribe = () => {
    if (typeof unsubscribe === 'function') {
      logState('Unsubscribed');
      unsubscribe();
      unsubscribe = undefined;
    }
  };

  const handleNotify = (store, present) => {
    counterNap(store, present);
    const value = store.value || 0;
    logCounter(value);
    logState(store);
    render(value, prompt);
    if (store.value === 12) {
      tryUnsubscribe();
    }
  };

  unsubscribe = model.subscribe(handleNotify);
  const initialValue = model.store.value || 0;
  logCounter(initialValue);
  render(initialValue, prompt);

  return tryUnsubscribe;
};

module.exports = counterState;
