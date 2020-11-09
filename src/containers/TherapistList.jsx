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
    <div>
      <h1 className="header-therapists">Therapists</h1>
      {authentication.message !== '' ? <p className="errorAuth">{renderError()}</p> : null}
      <div className="therapist-container">
        {application === 'LOADING' ? <Loading /> : renderTherapists()}
      </div>
      <button
        type="button"
        onClick={handleFavoriteClick}
      >
        <span className="material-icons">
          favorite
        </span>
        {'  '}
        View Favorites
      </button>
    </div>
  );

  return (
    <div>
      { validateCurrentToken() ? renderComponent() : renderLogin() }
    </div>
  );
};

TherapistList.propTypes = {
  therapistList: PropTypes.arrayOf(PropTypes.object).isRequired,
  getTherapists: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  application: PropTypes.string.isRequired,
  authentication: PropTypes.objectOf(PropTypes.string).isRequired,
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
