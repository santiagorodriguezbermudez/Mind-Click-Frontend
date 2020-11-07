import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Therapist from '../components/Therapist';
import { fetchTherapistsAPI } from '../actions/api';
import Loading from '../components/Loading';
import { validateCurrentToken } from '../helpers/tokenLocalStorage';

const TherapistList = ({
  therapistList,
  getTherapists,
  application,
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

  return (
    <div>
      <button type="button">
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
  application: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
  {
    therapistList: state.therapists,
    application: state.application,
  }
);

const mapDispatchToProps = dispatch => ({
  getTherapists: () => {
    dispatch(fetchTherapistsAPI());
  },
});

const connectedTherapistList = connect(mapStateToProps, mapDispatchToProps)(TherapistList);

export default connectedTherapistList;
