import { combineReducers } from 'redux';

import login from './login';
import signup from './signup';
import user from './user';
import meetup from './meetup';
import search from './search';

const reducers = combineReducers({
  login,
  signup,
  user,
  meetup,
  search,
});

export default reducers;
