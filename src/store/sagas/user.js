import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import { Creators as UserActions } from '../ducks/user';

export function* userUpdate(action) {
  const id = localStorage.getItem('@meetapp:user_id');
  const {
    name,
    email,
    password,
    password_confirmation,
    // history,
    preferences,
  } = action.payload.data;

  // console.log(preferences);
  const newPreferences = preferences.filter(pref => pref.checked).map(pref => pref.id);

  if (!name || !email || !password || !password_confirmation) {
    return yield put(
      UserActions.userFailure('Nome, Email, Senha e confirmação de Senha são obrigatórios'),
    );
  }

  try {
    // Update user
    const response = yield call(api.put, `users/${id}`, {
      name,
      email,
      password,
      password_confirmation,
      preferences: newPreferences,
    });
    console.log(response.data.preferences);

    // TODO flash msg user update in!

    yield put(UserActions.userSuccess(response.data));
    // history.push('/dashboard');
  } catch (error) {
    yield put(UserActions.userFailure('Algo deu errado, tente novamente'));
  }
}

export function* fetchUser(action) {
  try {
    const id = localStorage.getItem('@meetapp:user_id');
    const response = yield call(api.get, `users/${id}`);

    // console.log('from saga:', response.data.preferences);

    // TODO flash msg user update in!

    yield put(UserActions.fetchSuccess(response.data));
  } catch (error) {
    yield put(UserActions.fetchFailure('Algo deu errado, tente novamente'));
  }
}
