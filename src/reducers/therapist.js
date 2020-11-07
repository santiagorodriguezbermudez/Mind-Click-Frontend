const therapist = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_THERAPIST':
      return {
        ...action.stock,
      };
    default:
      return state;
  }
};

export default therapist;
