import { all, takeLatest } from 'redux-saga/effects';

// DUCK / REDUCER
import { Types as LoginTypes } from '../ducks/login';
import { Types as SignupTypes } from '../ducks/signup';
import { Types as UserTypes } from '../ducks/user';
import { Types as MeetupTypes } from '../ducks/meetup';
import { Types as SearchTypes } from '../ducks/search';

// SAGA
import { loginUser, logoutUser } from './login';
import { signupUser } from './signup';
import { userUpdate, fetchUser, setPreferences } from './user';
import { newMeetup, fetchMeetup } from './meetup';
import {
  fetchByTitle, fetchRegisteredSoon, fetchNotRegSoon, fetchRecommendedSoon,
} from './search';

export default function* rootSaga() {
  yield all([
    takeLatest(LoginTypes.REQUEST, loginUser),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logoutUser),
    takeLatest(SignupTypes.REQUEST, signupUser),
    takeLatest(UserTypes.REQUEST, userUpdate),
    takeLatest(UserTypes.FETCH_REQUEST, fetchUser),
    takeLatest(UserTypes.SET_PREFERENCES_REQUEST, setPreferences),
    takeLatest(MeetupTypes.NEW_REQUEST, newMeetup),
    takeLatest(MeetupTypes.FETCH_REQUEST, fetchMeetup),
    takeLatest(SearchTypes.REGISTERED_REQUEST, fetchRegisteredSoon),
    takeLatest(SearchTypes.FETCH_REQUEST, fetchByTitle),
    takeLatest(SearchTypes.NOT_REG_REQUEST, fetchNotRegSoon),
    takeLatest(SearchTypes.RECOMMENDED_REQUEST, fetchRecommendedSoon),
  ]);
}
