import { all, takeLatest } from 'redux-saga/effects';

// DUCK / REDUCER
import { Types as LoginTypes } from '../ducks/login';
import { Types as SignupTypes } from '../ducks/signup';

// SAGA
import { loginUser } from './login';
import { signupUser } from './signup';

export default function* rootSaga() {
  yield all([
    takeLatest(LoginTypes.REQUEST, loginUser),
    takeLatest(SignupTypes.REQUEST, signupUser),
  ]);
}
