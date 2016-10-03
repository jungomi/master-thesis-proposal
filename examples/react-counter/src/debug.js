import debug from 'debug';

debug.colors = ['green', 'red', 'blue'];
debug.enable('model:*,state');

export const logAccepted = debug('model:accepted');
export const logRejected = debug('model:rejected');
export const logState = debug('state');
