import test from 'ava';
import sinon from 'sinon';
import Model from '../src/model';

const initialState = {
  value: 0,
  counting: false,
  buttonDisabled: false
};

test.beforeEach(t => {
  t.context.model = new Model(initialState);
});

test('present rejected data', t => {
  t.context.model.notify = sinon.spy();
  t.context.model.present(initialState);
  t.false(t.context.model.notify.called);
  t.deepEqual(t.context.model.store, initialState);
});

test('present accepted data', t => {
  const nextState = {
    value: 1,
    counting: true,
    buttonDisabled: false
  };
  t.context.model.notify = sinon.spy();
  t.context.model.present(nextState);
  t.true(t.context.model.notify.called);
  t.deepEqual(t.context.model.store, nextState);
});

test('notify', t => {
  const listen = sinon.spy();
  t.context.model.subscribe(listen);
  t.context.model.notify();
  t.true(listen.calledOnce);
});

test('subscribe', t => {
  const listen = () => {};
  t.is(t.context.model.listeners.length, 0);
  const unsubscribe = t.context.model.subscribe(listen);
  t.is(t.context.model.listeners.length, 1);
  t.true(t.context.model.listeners.includes(listen));
  t.is(typeof unsubscribe, 'function');
  unsubscribe();
  t.is(t.context.model.listeners.length, 0);
});

test('subscribe without function', t => {
  const listen = {};
  const subscribeError = 'Subscribe expected a function';
  t.is(t.context.model.listeners.length, 0);
  t.throws(() => t.context.model.subscribe(listen), subscribeError);
  t.is(t.context.model.listeners.length, 0);
});
