const therapists = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_THERAPISTS':
      return [
        ...action.therapists,
      ];
    default:
      return state;
  }
};

export default therapists;
