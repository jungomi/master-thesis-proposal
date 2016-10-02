import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import Counter from '../../src/components/Counter';

test('renders correctly', t => {
  const clickHandler = sinon.spy();
  const props = {
    value: 5,
    handleClick: clickHandler,
    buttonDisabled: false
  };
  const counter = shallow(<Counter {...props} />);
  t.true(counter.contains(<span>{props.value}</span>));
  const button = counter.find('.button');
  t.false(button.hasClass('button-disabled'));
  button.simulate('click');
  t.true(clickHandler.calledOnce);
});

test('button is disabled', t => {
  const clickHandler = sinon.spy();
  const props = {
    value: 5,
    handleClick: clickHandler,
    buttonDisabled: true
  };
  const counter = shallow(<Counter {...props} />);
  const button = counter.find('.button');
  t.true(button.hasClass('button-disabled'));
  button.simulate('click');
  t.false(clickHandler.called);
});
