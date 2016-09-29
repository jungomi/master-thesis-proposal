export const enableButton = store => ({
  ...store,
  buttonDisabled: false
});

export const disableButton = store => ({
  ...store,
  buttonDisabled: true
});

export const startIncrement = store => ({
  ...store,
  counting: true
});

export const stopIncrement = store => ({
  ...store,
  counting: false
});

export const increment = store => ({
  ...store,
  value: store.value + 1
});
