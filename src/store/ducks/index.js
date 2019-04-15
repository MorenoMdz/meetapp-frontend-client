import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../../routes/history';

import login from './login';
import signup from './signup';
import user from './user';
import meetup from './meetup';
import search from './search';

const reducers = combineReducers({
  router: connectRouter(history),
  login,
  signup,
  user,
  meetup,
  search,
});

export default reducers;
