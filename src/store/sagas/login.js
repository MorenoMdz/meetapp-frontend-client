import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import { login, logout } from '../../services/auth';
import history from '../../routes/history';

import { Creators as LoginActions } from '../ducks/login';

export function* loginUser(action) {
  const { email, password, history } = action.payload;

  if (!email || !password) {
    return yield put(LoginActions.loginFailure('Usuário e Senha obrigatórios'));
  }

  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    yield put(LoginActions.loginSuccess(response.data));
    login(response.data.token);
    localStorage.setItem('@meetapp:user_id', response.data.user_id);

    history.push('/dashboard');
  } catch (error) {
    yield put(LoginActions.loginFailure('Usuário ou Senha inválidos'));
  }
}

export function* logoutUser() {
  try {
    console.log('logout from saga');
    logout();
    localStorage.removeItem('@meetapp:user_id');
    yield put(LoginActions.logoutSuccess());
    history.push('/dashboard'); // this fails not sure why
  } catch (error) {
    history.push('/dashboard');
    yield put(LoginActions.logoutFailure());
  }
}
