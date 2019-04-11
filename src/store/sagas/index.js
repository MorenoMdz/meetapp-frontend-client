import { all, takeLatest } from 'redux-saga/effects';

// DUCK / REDUCER
import { Types as LoginTypes } from '../ducks/login';
import { Types as SignupTypes } from '../ducks/signup';
import { Types as UserTypes } from '../ducks/user';

// SAGA
import { loginUser } from './login';
import { signupUser } from './signup';
import { userUpdate, fetchUser } from './user';

export default function* rootSaga() {
  yield all([
    takeLatest(LoginTypes.REQUEST, loginUser),
    takeLatest(SignupTypes.REQUEST, signupUser),
    takeLatest(UserTypes.REQUEST, userUpdate),
    takeLatest(UserTypes.FETCH_REQUEST, fetchUser),
  ]);
}
