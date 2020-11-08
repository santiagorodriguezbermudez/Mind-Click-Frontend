import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Therapist from '../components/Therapist';
import { fetchTherapistsAPI, fetchFavoriteTherapistsAPI } from '../actions/api';
import Loading from '../components/Loading';
import { validateCurrentToken } from '../helpers/tokenLocalStorage';

const TherapistList = ({
  therapistList,
  getTherapists,
  application,
  getFavorites,
  authentication,
}) => {
  const renderTherapists = () => therapistList.map(therapist => (
    <Therapist key={therapist.id} therapist={therapist} />
  ));

  React.useEffect(() => {
    if (!validateCurrentToken()) {
      return <Redirect to="/login" />;
    }
    return getTherapists();
  }, []);

  const handleFavoriteClick = () => {
    getFavorites(authentication.id);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleFavoriteClick()}
      >
        View Favorites
      </button>
      <div className="therapist-container">
        {application === 'LOADING' ? <Loading /> : renderTherapists()}
      </div>
    </div>
  );
};

TherapistList.propTypes = {
  therapistList: PropTypes.arrayOf(PropTypes.object).isRequired,
  getTherapists: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  application: PropTypes.string.isRequired,
  authentication: PropTypes.objectOf(PropTypes.string).isRequired,
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
});

const connectedTherapistList = connect(mapStateToProps, mapDispatchToProps)(TherapistList);

export default connectedTherapistList;
