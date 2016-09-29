export const enableButton = state => ({
  ...state,
  buttonDisabled: false
});

export const disableButton = state => ({
  ...state,
  buttonDisabled: true
});

export const startIncrement = state => ({
  ...state,
  counting: true
});

export const stopIncrement = state => ({
  ...state,
  counting: false
});

export const increment = state => ({
  ...state,
  value: state.value + 1
});
