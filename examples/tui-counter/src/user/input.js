'use strict';

const input = (key, handleIncrement, unsubscribe) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
  switch (key.name) {
  case 'q':
    process.exit();
    break;
  case 'u':
    unsubscribe();
    break;
  default:
    handleIncrement();
  }
};

module.exports = input;
