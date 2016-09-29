import {
  disableButton,
  enableButton,
  increment,
  stopIncrement
} from '../actions/counter';

// Automatically increments the counter until 10 and when it reaches 11 it
// disables the button for 5 seconds and increments it afterwards.
export const counterNap = (state, present) => {
  if (state.counting) {
    if (state.value < 10) {
      setTimeout(() => {
        present(increment(state));
      }, 1000);
    } else {
      present(stopIncrement(state));
    }
  } else {
    if (state.value === 11) {
      if (state.buttonDisabled) {
        setTimeout(() => {
          present(increment(enableButton(state)));
        }, 5000);
      } else {
        present(disableButton(state));
      }
    }
  }
};
