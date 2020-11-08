import { validateCurrentToken, getCurrentToken } from '../helpers/tokenLocalStorage';

const authenticationInitializer = () => {
  let loggedIn;
  let token;

  if (validateCurrentToken()) {
    loggedIn = true;
    token = getCurrentToken();
  } else {
    loggedIn = false;
    token = '';
  }

  return ({
    loggedIn,
    token,
    message: '',
    id: '',
  });
};

export default authenticationInitializer;
