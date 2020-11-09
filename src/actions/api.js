import axios from 'axios';
import { REACT_APP_API_URL } from '../constants/constants';
import {
  loggedInUser,
  errorAuth,
  errorFetchingTherapists,
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
      const dataAuth = {
        token: response.data.auth_token,
        id: response.data.id,
      };
      dispatch(loggedInUser(dataAuth));
      dispatch(updateState('IDLE'));
    }).catch(e => {
      dispatch(updateState('IDLE'));
      dispatch(errorAuth(e.response.data.message));
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
      const dataAuth = {
        token: response.data.auth_token,
        id: response.data.id,
      };
      dispatch(loggedInUser(dataAuth));
      dispatch(updateState('IDLE'));
    }).catch(e => {
      dispatch(updateState('IDLE'));
      dispatch(errorAuth(e.response.data.message));
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
    }).catch(error => {
      dispatch(updateState('IDLE'));
      dispatch(errorFetchingTherapists(error.response.data.message));
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
    }).catch(error => {
      dispatch(updateState('IDLE'));
      dispatch(errorFetchingTherapists(error.response.data.message));
      dispatch(showTherapist({}));
    });
  }
);

// Favorites end points
export const fetchFavoriteTherapistsAPI = id => (
  dispatch => {
    dispatch(updateState('LOADING'));
    axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}/users/${id}/favorites/`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getCurrentToken(),
      },
    }).then(response => {
      dispatch(updateState('IDLE'));
      dispatch(fetchTherapists(response.data.data.therapists));
    }).catch(error => {
      dispatch(updateState('IDLE'));
      dispatch(errorFetchingTherapists(error.response.data.message));
      dispatch(fetchTherapists([]));
    });
  }
);

export const addFavoriteAPI = (userId, therapistId) => (
  dispatch => {
    dispatch(updateState('LOADING'));
    axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}/users/${userId}/favorites`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getCurrentToken(),
      },
      params: {
        user_id: userId,
        therapist_id: therapistId,
      },
    }).then(error => {
      dispatch(updateState('IDLE'));
      dispatch(errorFetchingTherapists(error.response.data.message));
      dispatch(fetchFavoriteTherapistsAPI(userId));
    });
  }
);

export const removeFavoriteAPI = (userId, favoriteId) => (
  dispatch => {
    dispatch(updateState('LOADING'));
    axios({
      method: 'DELETE',
      url: `${REACT_APP_API_URL}/users/${userId}/favorites/${favoriteId}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getCurrentToken(),
      },
    }).then(() => {
      dispatch(updateState('IDLE'));
      dispatch(fetchFavoriteTherapistsAPI(userId));
    });
  }
);
