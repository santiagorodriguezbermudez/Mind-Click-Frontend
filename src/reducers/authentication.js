import { saveCurrentToken, removeCurrentToken } from '../helpers/tokenLocalStorage';

const authentication = (state = false, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      saveCurrentToken(action.token);
      return {
        loggedIn: true,
        token: action.token,
      };
    case 'LOGGED_OUT_USER':
      removeCurrentToken();
      return {
        loggedIn: false,
        token: '',
      };
    default:
      return state;
  }
};

export default authentication;
