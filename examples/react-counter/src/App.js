import React, { PropTypes } from 'react';
import CounterState from './containers/CounterState';

const App = ({ model }) => (
  <div>
    <h1>A simple counter</h1>
    <CounterState model={model} />
  </div>
);

App.propTypes = {
  model: PropTypes.object.isRequired
};

export default App;
