import { combineReducers } from 'redux';
import authentication from './authentication';
import application from './application';
import therapists from './therapists';
import therapist from './therapist';

const combinedReducers = combineReducers({
  authentication,
  application,
  therapists,
  therapist,
});

export default combinedReducers;
