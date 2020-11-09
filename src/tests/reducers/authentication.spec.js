import authentication from '../../reducers/authentication';
import {
  loggedInUser,
  loggedOutUser,
  errorAuth,
} from '../../actions/authentication';
import authenticationInitializer from '../../constants/initializers';

describe('Authentication Reducer', () => {
  it('Should return the initializer by default', () => {
    expect(authentication(undefined, { type: 'NONE' })).toEqual(authenticationInitializer());
  });

  it('Should update the authentication token on succesfull authentication', () => {
    const token = 'CorrectToken';
    const userId = 100;
    expect(authentication(authenticationInitializer(), loggedInUser({ token, id: userId })))
      .toEqual({
        loggedIn: true,
        token,
        message: '',
        id: userId,
      });
  });

  it('Should update the authentication token on succesfull logout', () => {
    expect(authentication(authenticationInitializer(), loggedOutUser()))
      .toEqual({
        loggedIn: false,
        token: '',
        message: '',
        id: '',
      });
  });

  it('Should update the authentication token on error from login', () => {
    const error = 'Error on Log in';
    expect(authentication(authenticationInitializer(), errorAuth(error)))
      .toEqual({
        loggedIn: false,
        token: '',
        message: error,
        id: '',
      });
  });
});
