import { therapistsInitializer } from '../constants/initializers';

const therapists = (state = therapistsInitializer, action) => {
  switch (action.type) {
    case 'FETCH_THERAPISTS':
      return {
        ...state,
        list: [
          ...action.therapists,
        ],
        isFavorite: false,
      };
    case 'FETCH_FAVORITE_THERAPISTS':
      return {
        ...state,
        list: [
          ...action.therapists,
        ],
        isFavorite: true,
      };
    default:
      return state;
  }
};

export default therapists;
