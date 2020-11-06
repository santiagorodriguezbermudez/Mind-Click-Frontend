import axios from 'axios';
import REACT_APP_API_URL from '../constants/constants';
import {
  loggedInUser,
  signUpError,
} from './authentication';
import updateState from './application';

export const signupApiCall = user => (
  dispatch => {
    dispatch(updateState('LOADING'));
    axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}/signup`,
      params: {
        full_name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.passwordConfirmation,
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      dispatch(loggedInUser(response.data.auth_token));
      dispatch(updateState('IDLE'));
    }).catch(e => {
      dispatch(signUpError(e.response.data.message));
      dispatch(updateState('IDLE'));
    });
  }
);

export const loginApiCall = user => (
  dispatch => {
    dispatch(updateState('LOADING'));
    axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}/login`,
      params: {
        email: user.email,
        password: user.password,
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      dispatch(loggedInUser(response.data.auth_token));
      dispatch(updateState('IDLE'));
    }).catch(e => {
      dispatch(signUpError(e.response.data.message));
      dispatch(updateState('IDLE'));
    });
  }
);
