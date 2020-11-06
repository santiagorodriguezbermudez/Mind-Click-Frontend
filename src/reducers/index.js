import { combineReducers } from 'redux';
import authentication from './authentication';
import application from './application';

const combinedReducers = combineReducers({
  authentication,
  application,
});

export default combinedReducers;
