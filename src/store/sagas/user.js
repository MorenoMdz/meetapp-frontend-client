import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import history from '../../routes/history';

import { Creators as UserActions } from '../ducks/user';

export function* setPreferences(action) {
  const id = localStorage.getItem('@meetapp:user_id');
  const { preferences } = action.payload.data;

  const newPreferences = preferences.filter(pref => pref.checked).map(pref => pref.id);

  try {
    const response = yield call(api.put, `users/${id}`, {
      preferences: newPreferences,
    });

    const data = { ...response.data, flash: 'Preferências salvas com sucesso!' };

    yield put(UserActions.setPreferencesSuccess(data));
    history.push('/dashboard');
    // yield put(history.push('/dashboard'));
  } catch (error) {
    yield put(UserActions.setPreferencesFailure('Algo deu errado, tente novamente'));
  }
}

export function* userUpdate(action) {
  const id = localStorage.getItem('@meetapp:user_id');
  const {
    name,
    email,
    password,
    password_confirmation,
    history,
    preferences,
  } = action.payload.data;

  const newPreferences = preferences.filter(pref => pref.checked).map(pref => pref.id);

  if (!name || !email) {
    return yield put(UserActions.userFailure('Nome e Email são obrigatórios'));
  }

  if (password && password !== password_confirmation) {
    return yield put(UserActions.userFailure('Senha confirmação não conferem'));
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

    const data = { ...response.data, flash: 'Atualizado com sucesso!' };

    yield put(UserActions.userSuccess(data));
    history.push('/dashboard');
  } catch (error) {
    yield put(UserActions.userFailure('Algo deu errado, tente novamente'));
  }
}

export function* fetchUser(action) {
  try {
    const id = localStorage.getItem('@meetapp:user_id');
    const response = yield call(api.get, `users/${id}`);
    const userPreferences = response.data.preferences;

    const preferences = [
      { id: 1, name: 'Front-end', checked: false },
      { id: 2, name: 'Back-end', checked: false },
      { id: 3, name: 'Mobile', checked: false },
      { id: 4, name: 'DevOps', checked: false },
      { id: 5, name: 'Gestão', checked: false },
      { id: 6, name: 'Marketing', checked: false },
    ];

    preferences.forEach(pref => userPreferences.forEach((userPref) => {
      if (pref.id === userPref.id) {
        pref.checked = true;
      }
    }));

    const data = { ...response.data, preferences };

    yield put(UserActions.fetchSuccess(data));
  } catch (error) {
    yield put(UserActions.fetchFailure('Algo deu errado, tente novamente'));
  }
}
