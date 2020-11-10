import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatter } from '../constants/constants';
import errorImage from '../assets/images/error.jpg';

const Therapist = ({
  therapist,
  userId,
  addFavoriteTherapist,
  removeFavoriteTherapist,
}) => {
  const handleAddFavorite = () => {
    addFavoriteTherapist(userId, therapist.id);
  };

  const handleRemoveFavorite = () => {
    removeFavoriteTherapist(userId, therapist.favorite_id);
  };

  const renderAddButton = () => (
    <button
      onClick={handleAddFavorite}
      type="button"
    >
      <span className="material-icons">
        favorite
      </span>
      Add as Favorite
    </button>
  );

  const renderRemoveButton = () => (
    <button
      onClick={handleRemoveFavorite}
      className="material-icons"
      type="button"
    >
      Remove as Favorite
    </button>
  );

  return (
    <div className="therapist-index-profile">
      <div className="therapist-index-profile-image">
        <img
          src={therapist.therapy_description}
          alt="therapist"
          onError={e => {
            e.target.onerror = null;
            e.target.src = errorImage;
          }}
        />
        <span>
          Price:
          {` ${formatter.format(therapist.fee)}`}
          / per session
        </span>
      </div>
      <div className="therapist-index-profile-description">
        <p className="therapist-name">
          {therapist.full_name}
        </p>
        <p className="text-xl">
          Year of experience:
          {therapist.years_experience}
        </p>
        <p>
          Description:
          {therapist.description.length > 100 ? `${therapist.description.substr(0, 100)}...` : therapist.description}
        </p>
        <Link to={`/therapists/${therapist.id}`}>More Information</Link>
        {therapist.favorite_id ? renderRemoveButton() : renderAddButton() }
      </div>
    </div>
  );
};

const therapistItemShape = {
  image: PropTypes.string,
  fee: PropTypes.number,
  fullName: PropTypes.string,
  yearsExperience: PropTypes.number,
  description: PropTypes.string,
};

Therapist.propTypes = {
  therapist: PropTypes.shape(therapistItemShape).isRequired,
  userId: PropTypes.string.isRequired,
  addFavoriteTherapist: PropTypes.func.isRequired,
  removeFavoriteTherapist: PropTypes.func.isRequired,
};

export default Therapist;
