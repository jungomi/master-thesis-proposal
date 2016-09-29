import React, { PropTypes } from 'react';

const Counter = ({ value, onClick, buttonDisabled }) => (
  <div>
    <h3>Value</h3>
    <span>{value}</span>
    <button onClick={onClick} disabled={buttonDisabled}>Increment</button>
  </div>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool
};

export default Counter;
