'use strict';

const enableButton = store => Object.assign({}, store, {
  buttonDisabled: false
});

const disableButton = store => Object.assign({}, store, {
  buttonDisabled: true
});

const startIncrement = store => Object.assign({}, store, {
  counting: true
});

const stopIncrement = store => Object.assign({}, store, {
  counting: false
});

const increment = store => Object.assign({}, store, {
  value: store.value + 1
});

module.exports = {
  enableButton,
  disableButton,
  startIncrement,
  stopIncrement,
  increment
};
