import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTherapistAPI } from '../actions/api';
import Loading from '../components/Loading';
import { validateCurrentToken } from '../helpers/tokenLocalStorage';

const TherapistDetail = ({
  therapist,
  fetchTherapist,
  application,
}) => {
  const { id } = useParams();

  React.useEffect(() => {
    if (!validateCurrentToken()) {
      return <Redirect to="/login" />;
    }
    return fetchTherapist(id);
  }, []);

  const renderTherapistDetail = () => (
    <div>
      <section>
        <p>{therapist.id}</p>
        <p>{therapist.full_name}</p>
      </section>
    </div>
  );

  return (
    <div>
      {application === 'LOADING' ? <Loading /> : renderTherapistDetail()}
    </div>
  );
};

const therapistItemShape = {
  id: PropTypes.number,
  full_name: PropTypes.string,
};

TherapistDetail.propTypes = {
  therapist: PropTypes.shape(therapistItemShape).isRequired,
  fetchTherapist: PropTypes.func.isRequired,
  application: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
  {
    therapist: state.therapist,
    application: state.application,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchTherapist: id => {
    dispatch(fetchTherapistAPI(id));
  },
});

const connectedTherapistDetail = connect(mapStateToProps, mapDispatchToProps)(TherapistDetail);

export default connectedTherapistDetail;
