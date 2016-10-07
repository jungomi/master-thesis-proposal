import test from 'ava';
import sinon from 'sinon';
import counterState from '../../src/state/counter';

test.beforeEach(t => {
  t.context.unsubscribe = sinon.spy();
  t.context.render = sinon.spy();
  t.context.model = {
    store: {
      value: 0
    },
    present: sinon.spy(),
    subscribe: sinon.stub().returns(t.context.unsubscribe)
  };
});

test('initializes correctly', t => {
  counterState(t.context.model, t.context.render);
  t.true(t.context.model.subscribe.calledOnce);
  t.true(t.context.render.calledOnce);
  t.true(t.context.render.calledWith(t.context.model.store.value));
});

test('unsubscribes correctly', t => {
  const unsubscribe = counterState(t.context.model, t.context.render);
  t.true(t.context.model.subscribe.calledOnce);
  unsubscribe();
  t.true(t.context.unsubscribe.calledOnce);
  unsubscribe();
  t.true(t.context.unsubscribe.calledOnce);
});
