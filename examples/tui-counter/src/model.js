'use strict';

const { logAccepted, logRejected } = require('./debug');

class Model {
  constructor(initialStore = {}) {
    this._store = initialStore;
    this.listeners = [];
    this.present = this.present.bind(this);
  }

  present(data) {
    const store = this.store;
    const equalCounter =
      store.counting === data.counting
      && store.value === data.value
      && store.buttonDisabled === data.buttonDisabled;
    if (data.value < store.value || equalCounter) {
      logRejected(`Rejected : ${JSON.stringify(data)}`);
      return;
    }
    this._store = data;
    logAccepted(`Accepted : ${JSON.stringify(data)}`);
    this.notify();
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.store, this.present);
    }
  }

  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Subscribe expected a function');
    }
    this.listeners.push(listener);
    return () => {
      this.listeners.splice(this.listeners.indexOf(listener));
    };
  }

  get store() {
    return this._store;
  }

}

module.exports = Model;
