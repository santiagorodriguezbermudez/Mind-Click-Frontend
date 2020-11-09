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
      className="material-icons"
      type="button"
    >
      favorite
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
    <div>
      <div>
        <img
          src={therapist.therapy_description}
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
      <div>
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
        {therapist.favorite_id ? renderRemoveButton() : renderAddButton() }
        <Link to={`/therapists/${therapist.id}`}>More Information</Link>
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
  userId: PropTypes.number.isRequired,
  addFavoriteTherapist: PropTypes.func.isRequired,
  removeFavoriteTherapist: PropTypes.func.isRequired,
};

export default Therapist;
