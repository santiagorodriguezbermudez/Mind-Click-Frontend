import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTherapistAPI } from '../actions/api';
import Loading from '../components/Loading';
import { validateCurrentToken } from '../helpers/tokenLocalStorage';
import { formatter } from '../constants/constants';
import '../assets/styles/therapist.css';
import fullStar from '../assets/images/circle-full.svg';
import halfStar from '../assets/images/circle-half.svg';
import emptyStar from '../assets/images/circle-empty.svg';

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

  const returnStar = (numTimes, colorClass, typeOfStar) => (
    [...Array(numTimes)].map((_, index) => (
      <img key={`star-${index * 2}`} src={typeOfStar} alt="icons" className={colorClass} />
    ))
  );

  const returnValueIcons = (value, colorClass) => {
    const valueToNearestHalf = Math.round(parseFloat(value) * 2) / 2;
    const numFullStars = Math.floor(valueToNearestHalf / 1);
    const numHalfStars = valueToNearestHalf % 1;
    let numEmptyStars = 5 - numFullStars - numHalfStars;
    numEmptyStars = Math.floor(numEmptyStars / 1);
    return (
      <div className="personality-stars">
        {returnStar(numFullStars, colorClass, fullStar)}
        {returnStar(Math.ceil(numHalfStars), colorClass, halfStar)}
        {returnStar(numEmptyStars, colorClass, emptyStar)}
      </div>
    );
  };

  const renderPersonality = personalityObject => {
    let color = 0;
    return (
      Object.keys(personalityObject).map(key => {
        const colorClass = `icon-color-${color}`;
        color += 1;
        return (
          <div key={key}>
            <div className={`${colorClass} personalityTitle`}>{key}</div>
            <div>{returnValueIcons(personalityObject[key], colorClass)}</div>
          </div>
        );
      })
    );
  };

  const renderTherapistDetail = () => (
    <div>
      <img src={therapist.therapy_description} alt="profile therapist" className="profile-image" />
      <h1>{therapist.full_name}</h1>
      <h3>{`Price: ${formatter.format(therapist.fee)}`}</h3>
      <h3>{`Years of experience: ${therapist.years_experience}`}</h3>
      <section className="therapist-description shadow-xl">
        <div>
          <h6>My Personality</h6>
          <div className="personality-container">
            {therapist.personality_traits
              ? renderPersonality(JSON.parse(therapist.personality_traits)) : null}
          </div>
        </div>
        <div>
          <p>{therapist.description}</p>
        </div>
        <Link to="/therapists">Back to Directory</Link>
      </section>
    </div>
  );

  return (
    <div className="therapist-detail-container">
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
