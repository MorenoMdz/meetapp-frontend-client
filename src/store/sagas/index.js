import { all, takeLatest } from 'redux-saga/effects';

// DUCK / REDUCER
import { Types as LoginTypes } from '../ducks/login';
import { Types as SignupTypes } from '../ducks/signup';
import { Types as UserTypes } from '../ducks/user';
import { Types as MeetupTypes } from '../ducks/meetup';

// SAGA
import { loginUser } from './login';
import { signupUser } from './signup';
import { userUpdate, fetchUser } from './user';
import { newMeetup, fetchMeetup } from './meetup';

export default function* rootSaga() {
  yield all([
    takeLatest(LoginTypes.REQUEST, loginUser),
    takeLatest(SignupTypes.REQUEST, signupUser),
    takeLatest(UserTypes.REQUEST, userUpdate),
    takeLatest(UserTypes.FETCH_REQUEST, fetchUser),
    takeLatest(MeetupTypes.NEW_REQUEST, newMeetup),
    takeLatest(MeetupTypes.FETCH_REQUEST, fetchMeetup),
  ]);
}
