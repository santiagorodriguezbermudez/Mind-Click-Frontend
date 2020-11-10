import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Therapist from '../components/Therapist';
import {
  fetchTherapistsAPI,
  fetchFavoriteTherapistsAPI,
  addFavoriteAPI,
  removeFavoriteAPI,
} from '../actions/api';
import Loading from '../components/Loading';
import { validateCurrentToken } from '../helpers/tokenLocalStorage';
import '../assets/styles/therapists.css';

const TherapistList = ({
  therapistList,
  getTherapists,
  application,
  getFavorites,
  authentication,
  addFavoriteTherapist,
  removeFavoriteTherapist,
}) => {
  const renderTherapists = () => therapistList.map(therapist => (
    <Therapist
      key={therapist.id}
      therapist={therapist}
      userId={authentication.id}
      addFavoriteTherapist={addFavoriteTherapist}
      removeFavoriteTherapist={removeFavoriteTherapist}
    />
  ));

  const renderError = () => (
    `Error: ${authentication.message}. Please try again.`
  );

  const renderLogin = () => (
    <Redirect to="/login" />
  );

  React.useEffect(() => {
    if (!validateCurrentToken()) {
      return renderLogin();
    }
    return getTherapists();
  }, []);

  const handleFavoriteClick = () => {
    getFavorites(authentication.id);
  };

  const renderComponent = () => (
    <div className="therapists">
      <h1 className="header-therapists">Therapists</h1>
      <button
        type="button"
        onClick={handleFavoriteClick}
        className="favorite-button"
      >
        <span className="material-icons">
          favorite
        </span>
        {'  '}
        <span>
          View Favorites
        </span>
      </button>
      {authentication.message !== '' ? <p className="errorAuth">{renderError()}</p> : null}
      <div className="scroll-container">
        <div className="therapist-container">
          {application === 'LOADING' ? <Loading /> : renderTherapists()}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      { validateCurrentToken() ? renderComponent() : renderLogin() }
    </div>
  );
};

const authenticationItemShape = {
  token: PropTypes.string,
  id: PropTypes.string,
};

TherapistList.propTypes = {
  therapistList: PropTypes.arrayOf(PropTypes.object).isRequired,
  getTherapists: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  application: PropTypes.string.isRequired,
  authentication: PropTypes.shape(authenticationItemShape).isRequired,
  addFavoriteTherapist: PropTypes.func.isRequired,
  removeFavoriteTherapist: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    therapistList: state.therapists,
    application: state.application,
    authentication: state.authentication,
  }
);

const mapDispatchToProps = dispatch => ({
  getTherapists: () => {
    dispatch(fetchTherapistsAPI());
  },
  getFavorites: id => {
    dispatch(fetchFavoriteTherapistsAPI(id));
  },
  addFavoriteTherapist: (userId, therapistId) => {
    dispatch(addFavoriteAPI(userId, therapistId));
  },
  removeFavoriteTherapist: (userId, favoriteId) => {
    dispatch(removeFavoriteAPI(userId, favoriteId));
  },
});

const connectedTherapistList = connect(mapStateToProps, mapDispatchToProps)(TherapistList);

export default connectedTherapistList;
