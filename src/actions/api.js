import axios from 'axios';
import { REACT_APP_API_URL } from '../constants/constants';
import {
  loggedInUser,
  signUpError,
  loginError,
} from './authentication';
import updateState from './application';
import { getCurrentToken } from '../helpers/tokenLocalStorage';
import { fetchTherapists, showTherapist } from './therapists';

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
      dispatch(updateState('IDLE'));
      dispatch(loggedInUser(response.data.auth_token));
    }).catch(e => {
      dispatch(updateState('IDLE'));
      dispatch(loginError(e.response.data.message));
    });
  }
);

// Hits the endpoint to fetch all of the therapists
export const fetchTherapistsAPI = () => (
  dispatch => {
    dispatch(updateState('LOADING'));
    axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}/therapists`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getCurrentToken(),
      },
    }).then(response => {
      dispatch(updateState('IDLE'));
      dispatch(fetchTherapists(response.data.data.therapists));
    }).catch(() => {
      dispatch(updateState('IDLE'));
      dispatch(fetchTherapists([]));
    });
  }
);

export const fetchFavoriteTherapistsAPI = id => (
  dispatch => {
    dispatch(updateState('LOADING'));
    axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}/users/:${id}/favorite/`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getCurrentToken(),
      },
    }).then(response => {
      dispatch(updateState('IDLE'));
      dispatch(fetchTherapists(response.data.data.therapists));
    }).catch(() => {
      dispatch(updateState('IDLE'));
      dispatch(fetchTherapists([]));
    });
  }
);

// Hits the endpoint to fetch a specific therapist
export const fetchTherapistAPI = id => (
  dispatch => {
    dispatch(updateState('LOADING'));
    axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}/therapists/${id}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getCurrentToken(),
      },
    }).then(response => {
      dispatch(updateState('IDLE'));
      dispatch(showTherapist(response.data.data.therapist));
    }).catch(() => {
      dispatch(updateState('IDLE'));
      dispatch(showTherapist({}));
    });
  }
);
