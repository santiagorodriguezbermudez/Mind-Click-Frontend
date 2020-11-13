const therapist = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_THERAPIST':
      return {
        ...action.therapist,
      };
    default:
      return state;
  }
};

export default therapist;
