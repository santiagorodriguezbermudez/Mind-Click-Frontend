import therapists from '../../reducers/therapists';
import { fetchTherapists } from '../../actions/therapists';

const mockTherapists = [
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
];

const mockFavoriteTherapists = [
  {
    favorite_id: 1,
    full_name: 'Test Therapist 1',
    id: 1,
    fee: 10,
    description: 'Test therapist description',
    year_experience: 20,
  },
  {
    favorite_id: 10,
    full_name: 'Test Therapist 2',
    id: 2,
    fee: 12,
    description: 'Test therapist description',
    year_experience: 22,
  },
];

describe('Therapists Reducer', () => {
  it('Should return empty array by default', () => {
    expect(therapists(undefined, { type: 'NONE' })).toEqual([]);
  });

  it('Should update the therapists state when receiving the action', () => {
    expect(therapists('', fetchTherapists(mockTherapists))).toEqual(mockTherapists);
  });

  it('Should update the favorite therapists state when receiving the action', () => {
    expect(therapists('', fetchTherapists(mockFavoriteTherapists))).toEqual(mockFavoriteTherapists);
  });
});
