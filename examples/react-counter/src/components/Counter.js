import React, { PropTypes } from 'react';

const Counter = ({ value, handleClick, buttonDisabled }) => {
  const onClick = () => {
    if (!buttonDisabled) {
      handleClick();
    }
  };
  const classes = ['button'];
  if (buttonDisabled) {
    classes.push('button-disabled');
  }
  return (
    <div id="counter">
      <span>{value}</span>
      <div className="buttons">
        <div
          className={classes.join(' ')}
          onClick={onClick}
        >
          <span>Increment</span>
        </div>
      </div>
    </div>
  );
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool
};

export default Counter;
