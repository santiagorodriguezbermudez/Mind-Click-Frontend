import application from '../../reducers/application';
import {
  loggedInUser,
  loggedOutUser,
} from '../../actions/authentication';
import authenticationInitializer from '../../constants/initializers';

describe('Authentication Reducer', () => {
  it('Should return the initializer by default', () => {
    expect(application(undefined, { type: 'NONE' })).toEqual(authenticationInitializer());
  });

  it('Should update the authentication token on succesful authentication', () => {
    const token = 'CorrectToken';
    const userId = 100;
    expect(application(authenticationInitializer(), loggedInUser({ token, id: userId })))
      .toEqual({
        loggedIn: true,
        token,
        message: '',
        id: userId,
      });
  });

  it('Should update the authentication token on succesful logout', () => {
    expect(application(authenticationInitializer(), loggedOutUser()))
      .toEqual({
        loggedIn: false,
        token: '',
        message: '',
      });
  });
});
