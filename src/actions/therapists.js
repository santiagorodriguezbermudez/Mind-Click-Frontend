export const fetchTherapists = therapists => ({
  type: 'FETCH_THERAPISTS',
  therapists,
});

export const showTherapist = therapist => ({
  type: 'SHOW_THERAPIST',
  therapist,
});
