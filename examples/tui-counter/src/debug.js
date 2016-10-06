'use strict';

const debug = require('debug');

const logCounter = debug('counter');
const logAccepted = debug('model:accepted');
const logRejected = debug('model:rejected');
const logState = debug('state');

module.exports = {
  logCounter,
  logAccepted,
  logRejected,
  logState
};
