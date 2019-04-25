import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import { login } from '../../services/auth';

import { Creators as SignupActions } from '../ducks/signup';

export function* signupUser(action) {
  const {
    name, email, password, password_confirmation, history,
  } = action.payload.data;

  if (!email || !password || !password_confirmation) {
    return yield put(
      SignupActions.signupFailure('Usuário, Senha e confirmação de Senha são obrigatórios'),
    );
  }

  try {
    // Create a new user
    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
      password_confirmation,
    });

    // Login the new user
    const loginResponse = yield call(api.post, 'sessions', {
      email,
      password,
    });
    login(loginResponse.data.token);
    localStorage.removeItem('@meetapp:user_id');
    localStorage.setItem('@meetapp:user_id', loginResponse.data.user_id);
    yield put(SignupActions.signupSuccess(response.data));
    history.push('/preferences');
  } catch (error) {
    console.log('from saga: ', error.response);
    yield put(SignupActions.signupFailure(error.response));
  }
}
