export const loggedInUser = ({ token, id }) => ({
  type: 'LOGGED_IN_USER',
  token,
  id,
});

export const loginError = errorMessage => ({
  type: 'ERROR_ON_LOGIN',
  errorMessage,
});

export const signUpError = errorMessage => ({
  type: 'ERROR_ON_SIGNUP',
  errorMessage,
});

export const loggedOutUser = () => ({
  type: 'LOGGED_OUT_USER',
  token: '',
});
