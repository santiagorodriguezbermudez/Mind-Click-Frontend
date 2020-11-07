export const fetchTherapists = therapists => ({
  type: 'FETCH_THERAPISTS',
  therapists,
});

export const favoriteTherapists = therapists => ({
  type: 'FAVORITE_THERAPISTS',
  therapists,
});

export const showTherapist = therapist => ({
  type: 'SHOW_THERAPIST',
  therapist,
});
