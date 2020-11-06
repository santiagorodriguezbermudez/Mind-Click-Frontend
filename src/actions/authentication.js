export const loggedInUser = token => ({
  type: 'LOGGED_IN_USER',
  token,
});

export const signUpError = errorMessage => ({
  type: 'Error on Signup',
  errorMessage,
});

export const loggedOutUser = () => ({
  type: 'LOGGED_OUT_USER',
  token: '',
});
