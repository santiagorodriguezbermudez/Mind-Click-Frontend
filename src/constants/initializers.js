import { validateCurrentToken, getCurrentToken, getUserId } from '../helpers/tokenLocalStorage';

export const authenticationInitializer = () => {
  let loggedIn;
  let token;
  let id;

  if (validateCurrentToken()) {
    loggedIn = true;
    token = getCurrentToken();
    id = getUserId();
  } else {
    loggedIn = false;
    token = '';
    id = 0;
  }

  return ({
    loggedIn,
    token,
    message: '',
    id,
  });
};

export const therapistsInitializer = {
  list: [],
  isFavorite: false,
};
