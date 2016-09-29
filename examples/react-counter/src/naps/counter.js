import {
  disableButton,
  enableButton,
  increment,
  stopIncrement
} from '../actions/counter';

// Automatically increments the counter until 10 and when it reaches 11 it
// disables the button for 5 seconds and increments it afterwards.
export const counterNap = (store, present) => {
  if (store.counting) {
    if (store.value < 10) {
      setTimeout(() => {
        present(increment(store));
      }, 1000);
    } else {
      present(stopIncrement(store));
    }
  } else {
    if (store.value === 11) {
      if (store.buttonDisabled) {
        setTimeout(() => {
          present(increment(enableButton(store)));
        }, 5000);
      } else {
        present(disableButton(store));
      }
    }
  }
};
