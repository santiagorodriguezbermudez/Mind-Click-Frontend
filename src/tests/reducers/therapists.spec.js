import therapists from '../../reducers/therapists';
import { fetchTherapists, fetchFavoriteTherapists } from '../../actions/therapists';
import { therapistsInitializer } from '../../constants/initializers';

const mockTherapists = {
  list: [
    {
      full_name: 'Test Therapist 1',
      id: 1,
      fee: 10,
      description: 'Test therapist description',
      year_experience: 20,
    },
    {
      full_name: 'Test Therapist 2',
      id: 2,
      fee: 12,
      description: 'Test therapist description',
      year_experience: 22,
    },
  ],
  isFavorite: false,
};

const mockFavoriteTherapists = {
  list: [
    {
      full_name: 'Test Therapist 1',
      id: 1,
      fee: 10,
      description: 'Test therapist description',
      year_experience: 20,
    },
    {
      full_name: 'Test Therapist 2',
      id: 2,
      fee: 12,
      description: 'Test therapist description',
      year_experience: 22,
    },
  ],
  isFavorite: true,
};

describe('Therapists Reducer', () => {
  it('Should return empty array by default', () => {
    expect(therapists(therapistsInitializer, { type: 'NONE' })).toEqual(therapistsInitializer);
  });

  it('Should update the therapists state when receiving the action', () => {
    expect(therapists('', fetchTherapists(mockTherapists.list))).toEqual(mockTherapists);
  });

  it('Should update the favorite therapists state when receiving the action', () => {
    expect(therapists('', fetchFavoriteTherapists(mockFavoriteTherapists.list))).toEqual(mockFavoriteTherapists);
  });
});
