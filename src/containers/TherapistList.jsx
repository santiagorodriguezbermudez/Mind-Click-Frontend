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
  therapists,
  getTherapists,
  application,
  getFavorites,
  authentication,
  addFavoriteTherapist,
  removeFavoriteTherapist,
}) => {
  const isAlreadyAFavorite = therapist => {
    const userFavorites = therapists.favoriteList;
    return userFavorites.some(favoriteTherapist => favoriteTherapist.id === therapist.id);
  };

  const renderTherapists = () => {
    let therapistsListToRender;

    if (therapists.isFavorite) {
      therapistsListToRender = therapists.favoriteList;
    } else {
      therapistsListToRender = therapists.userList;
    }

    return (
      therapistsListToRender.map(therapist => (
        <Therapist
          key={therapist.id}
          therapist={therapist}
          userId={authentication.id}
          addFavoriteTherapist={addFavoriteTherapist}
          removeFavoriteTherapist={removeFavoriteTherapist}
          isAlreadyFavorite={therapists.isFavorite ? true : isAlreadyAFavorite(therapist)}
        />
      ))
    );
  };

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
    getFavorites(authentication.id);
    return getTherapists();
  }, []);

  const handleFavoriteClick = () => {
    getFavorites(authentication.id);
  };

  const handleAllClick = () => {
    getTherapists();
  };

  const renderViewFavoritesButton = () => (
    <button
      type="button"
      onClick={() => handleFavoriteClick()}
      className="favorite-button"
    >
      <span className="material-icons">
        favorite
      </span>
      <span>
        View Favorites
      </span>
    </button>
  );

  const renderAllTherapistButton = () => (
    <button
      type="button"
      onClick={() => handleAllClick()}
      className="favorite-button"
    >
      View All Therapists
    </button>
  );

  const renderComponent = () => (
    <div className="therapists">
      <h1 className="header-therapists">Therapists</h1>
      {therapists.isFavorite ? renderAllTherapistButton() : renderViewFavoritesButton() }
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
  id: PropTypes.number,
};

const therapistListItemShape = {
  list: PropTypes.array,
  isFavorite: PropTypes.bool,
};

TherapistList.propTypes = {
  therapists: PropTypes.shape(therapistListItemShape).isRequired,
  getTherapists: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  application: PropTypes.string.isRequired,
  authentication: PropTypes.shape(authenticationItemShape).isRequired,
  addFavoriteTherapist: PropTypes.func.isRequired,
  removeFavoriteTherapist: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    therapists: state.therapists,
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
