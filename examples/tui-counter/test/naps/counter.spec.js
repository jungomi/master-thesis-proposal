import test from 'ava';
import sinon from 'sinon';
import { counterNap } from '../../src/naps/counter';

test.beforeEach(t => {
  t.context.clock = sinon.useFakeTimers();
  t.context.present = sinon.spy();
});

test.afterEach(t => {
  t.context.clock.restore();
});

test('counterNap counting < 10', t => {
  const state = {
    value: 0,
    counting: true
  };
  const nextState = {
    value: 1,
    counting: true
  };
  counterNap(state, t.context.present);
  t.false(t.context.present.called);
  t.context.clock.tick(1000);
  t.true(t.context.present.calledOnce);
  t.true(t.context.present.calledWith(nextState));
});

test('counterNap counting >= 10', t => {
  const state = {
    value: 10,
    counting: true
  };
  const nextState = {
    value: 10,
    counting: false
  };
  counterNap(state, t.context.present);
  t.true(t.context.present.calledOnce);
  t.true(t.context.present.calledWith(nextState));
});

test('counterNap not counting === 11 with button enabled', t => {
  const state = {
    value: 11,
    counting: false,
    buttonDisabled: false
  };
  const nextState = {
    value: 11,
    counting: false,
    buttonDisabled: true
  };
  counterNap(state, t.context.present);
  t.true(t.context.present.calledOnce);
  t.true(t.context.present.calledWith(nextState));
});

test('counterNap not counting === 11 with button disabled', t => {
  const state = {
    value: 11,
    counting: false,
    buttonDisabled: true
  };
  const nextState = {
    value: 12,
    counting: false,
    buttonDisabled: false
  };
  counterNap(state, t.context.present);
  t.false(t.context.present.called);
  t.context.clock.tick(5000);
  t.true(t.context.present.calledOnce);
  t.true(t.context.present.calledWith(nextState));
});
