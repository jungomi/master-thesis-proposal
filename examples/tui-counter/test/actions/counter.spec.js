import test from 'ava';
import * as actions from '../../src/actions/counter';

test('enableButton', t => {
  const state = {
    value: 0,
    buttonDisabled: true
  };
  const expected = {
    value: 0,
    buttonDisabled: false
  };
  const nextState = actions.enableButton(state);
  t.deepEqual(nextState, expected);
});

test('disableButton', t => {
  const state = {
    value: 0,
    buttonDisabled: false
  };
  const expected = {
    value: 0,
    buttonDisabled: true
  };
  const nextState = actions.disableButton(state);
  t.deepEqual(nextState, expected);
});

test('startIncrement', t => {
  const state = {
    value: 0,
  };
  const expected = {
    value: 0,
    counting: true
  };
  const nextState = actions.startIncrement(state);
  t.deepEqual(nextState, expected);
});

test('stopIncrement', t => {
  const state = {
    value: 0,
    counting: true
  };
  const expected = {
    value: 0,
    counting: false
  };
  const nextState = actions.stopIncrement(state);
  t.deepEqual(nextState, expected);
});

test('increment', t => {
  const state = {
    value: 0
  };
  const expected = {
    value: 1
  };
  const nextState = actions.increment(state);
  t.deepEqual(nextState, expected);
});

test('combine increment and startIncrement', t => {
  const state = {
    value: 0,
    counting: false
  };
  const expected = {
    value: 1,
    counting: true
  };
  const nextState = actions.increment(actions.startIncrement(state));
  const nextStateReverse = actions.startIncrement(actions.increment(state));
  t.deepEqual(nextState, expected);
  t.deepEqual(nextStateReverse, expected);
});
