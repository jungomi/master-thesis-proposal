import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import CounterState from '../../src/containers/CounterState';

test.beforeEach(t => {
  t.context.unsubscribe = sinon.spy();
  t.context.model = {
    store: {
      value: 0
    },
    present: sinon.spy(),
    subscribe: sinon.stub().returns(t.context.unsubscribe)
  };
});

test('initializes correctly', t => {
  const counterState = shallow(<CounterState model={t.context.model} />);
  const instance = counterState.instance();
  t.true(t.context.model.subscribe.calledOnce);
  t.is(instance.unsubscribe, t.context.unsubscribe);
  t.is(counterState.name(), 'Counter');
  t.is(counterState.children().length, 0);
});

test('handleNotify unsubscribes with value 12', t => {
  const counterState = shallow(<CounterState model={t.context.model} />);
  const instance = counterState.instance();
  const state = { value: 12 };
  instance.handleNotify(state, t.context.model.present);
  t.true(t.context.unsubscribe.calledOnce);
  t.is(instance.unsubscribe, undefined);
});
