import { therapistsInitializer } from '../constants/initializers';

const therapists = (state = therapistsInitializer, action) => {
  switch (action.type) {
    case 'FETCH_THERAPISTS':
      return {
        ...state,
        userList: [
          ...action.therapists,
        ],
        isFavorite: false,
      };
    case 'FETCH_FAVORITE_THERAPISTS':
      return {
        ...state,
        favoriteList: [
          ...action.therapists,
        ],
        isFavorite: true,
      };
    default:
      return state;
  }
};

export default therapists;
