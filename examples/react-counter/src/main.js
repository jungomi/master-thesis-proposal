import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Model from './model';

const initialState = {
  value: 0,
  buttonDisabled: false,
  counting: false
};
const model = new Model(initialState);

ReactDOM.render(
  <App model={model} />,
  document.getElementById('app')
);
