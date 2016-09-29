/* eslint-disable no-console */
class Model {
  constructor(initialState = {}) {
    this._state = initialState;
    this.listeners = [];
    this.present = this.present.bind(this);
  }

  present(data) {
    const state = this.state;
    const equalCounter =
      state.counting === data.counting
      && state.value === data.value
      && state.buttonDisabled === data.buttonDisabled;
    if (data.value < state.value || equalCounter) {
      console.log('[Model] Rejected :', data);
      return;
    }
    this._state = data;
    console.log('[Model] Accepted :', data);
    this.notify();
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state, this.present);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners.splice(this.listeners.indexOf(listener));
    };
  }

  get state() {
    return this._state;
  }

}

export default Model;
