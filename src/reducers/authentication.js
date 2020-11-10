import { saveCurrentToken, removeCurrentToken } from '../helpers/tokenLocalStorage';
import { authenticationInitializer } from '../constants/initializers';

const authentication = (state = authenticationInitializer(), action) => {
  const authObj = {
    token: action.token,
    id: action.id,
  };
  switch (action.type) {
    case 'LOGGED_IN_USER':
      saveCurrentToken(authObj);
      return {
        ...state,
        loggedIn: true,
        token: action.token,
        message: '',
        id: action.id,
      };
    case 'LOGGED_OUT_USER':
      removeCurrentToken();
      return {
        ...state,
        loggedIn: false,
        token: '',
        message: '',
        id: '',
      };
    case 'ERROR_ON_AUTH':
      return {
        ...state,
        loggedIn: false,
        token: '',
        message: action.errorMessage,
      };
    case 'ERROR_FETCHING_THERAPISTS':
      return {
        ...state,
        message: action.errorMessage,
      };
    default:
      return state;
  }
};

export default authentication;
