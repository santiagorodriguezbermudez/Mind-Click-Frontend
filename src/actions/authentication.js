export const loggedInUser = ({ token, id }) => ({
  type: 'LOGGED_IN_USER',
  token,
  id,
});

export const loggedOutUser = () => ({
  type: 'LOGGED_OUT_USER',
});

export const errorAuth = error => ({
  type: 'ERROR_ON_AUTH',
  errorMessage: error,
});

export const errorFetchingTherapists = error => ({
  type: 'ERROR_FETCHING_THERAPISTS',
  errorMessage: error,
});
