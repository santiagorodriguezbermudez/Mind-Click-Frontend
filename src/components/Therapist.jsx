import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatter } from '../constants/constants';
import errorImage from '../assets/images/error.jpg';

const Therapist = ({ therapist }) => (
  <div
    className="stock-index-card"
  >
    <div className="relative">
      <img
        src={therapist.image}
        alt="therapist"
        onError={e => {
          e.target.onerror = null;
          e.target.src = errorImage;
        }}
      />
      <span className="absolute bottom-0 right-0">
        Price:
        {` ${formatter.format(therapist.fee)}`}
      </span>
    </div>
    <div className="p-2">
      <p className="text-2xl">
        Name:
        {therapist.full_name}
      </p>
      <p className="text-xl">
        Year of experience:
        {therapist.years_experience}
      </p>
      <p>
        Description:
        {therapist.description.substr(0, 100)}
      </p>
      <span className="material-icons">
        favorite
      </span>
      <Link to={`/therapists/${therapist.id}`}>More Information</Link>
    </div>
  </div>
);

const therapistItemShape = {
  image: PropTypes.string,
  fee: PropTypes.number,
  fullName: PropTypes.string,
  yearsExperience: PropTypes.number,
  description: PropTypes.string,
};

Therapist.propTypes = {
  therapist: PropTypes.shape(therapistItemShape).isRequired,
};

export default Therapist;
