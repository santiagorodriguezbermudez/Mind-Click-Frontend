import {
  fetchTherapists,
  showTherapist,
} from '../../actions/therapists';

const therapists = [{ full_name: 'Therapist 1' }, { full_name: 'Therapist 2' }];

describe('Fetch Therapists Action', () => {
  it('Should update the state of the application to show the therapists', () => {
    expect(fetchTherapists(therapists))
      .toEqual({
        type: 'FETCH_THERAPISTS',
        therapists,
      });
  });
});

describe('Show Therapist Action', () => {
  it('Should update the state of the application to show one therapist', () => {
    expect(showTherapist(therapists[0])).toEqual({
      type: 'SHOW_THERAPIST',
      stock: therapists[0],
    });
  });
});
