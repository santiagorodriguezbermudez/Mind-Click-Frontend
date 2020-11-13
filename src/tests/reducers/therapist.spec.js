import therapist from '../../reducers/therapist';
import { showTherapist } from '../../actions/therapists';

const mockTherapist = {
  full_name: 'Test Therapist',
  fee: 100,
  description: 'This is just a test',
  years_experience: 22,
};

describe('Therapist Reducer', () => {
  it('Should return empty object by default', () => {
    expect(therapist(undefined, { type: 'NONE' })).toEqual({});
  });

  it('Should update the therapist state when receiving the action', () => {
    expect(therapist('', showTherapist(mockTherapist))).toEqual(mockTherapist);
  });
});
