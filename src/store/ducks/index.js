import { combineReducers } from 'redux';

import login from './login';
import signup from './signup';
import user from './user';
import meetup from './meetup';

const reducers = combineReducers({
  login, signup, user, meetup,
});

export default reducers;
