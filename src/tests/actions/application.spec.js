import updateState from '../../actions/application';

describe('Application Update State', () => {
  it('Should update the state of the application', () => {
    expect(updateState('TEST_STATE')).toEqual({
      type: 'UPDATE_STATE',
      newState: 'TEST_STATE',
    });
  });
});
