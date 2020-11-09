export const loggedInUser = ({ token, id }) => ({
  type: 'LOGGED_IN_USER',
  token,
  id,
});

export const loggedOutUser = () => ({
  type: 'LOGGED_OUT_USER',
  token: '',
});
