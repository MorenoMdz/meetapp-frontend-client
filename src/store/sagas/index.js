import { all, takeLatest } from 'redux-saga/effects';

// DUCK / REDUCER
import { Types as LoginTypes } from '../ducks/login'; // daqui vem a chamada de ação

// SAGA
import { loginUser } from './login'; // aqui carrega a ação de verdade

export default function* rootSaga() {
  yield all([takeLatest(LoginTypes.REQUEST, loginUser)]);
}
