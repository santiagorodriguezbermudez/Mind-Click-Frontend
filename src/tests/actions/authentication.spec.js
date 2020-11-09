import {
  loggedInUser,
  loggedOutUser,
} from '../../actions/authentication';

describe('Autentication State', () => {
  it('Should update the state of the authentication when user logs in', () => {
    const token = 'Success';
    const id = 2;
    expect(loggedInUser({ token, id })).toEqual({
      type: 'LOGGED_IN_USER',
      token,
      id,
    });
  });

  it('Should update the state of the authentication when user logs out', () => {
    expect(loggedOutUser()).toEqual({
      type: 'LOGGED_OUT_USER',
      token: '',
    });
  });
});
