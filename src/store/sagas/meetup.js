import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import history from '../../routes/history';

import { Creators as MeetupActions } from '../ducks/meetup';

export function* newMeetup(action) {
  const {
    title,
    description,
    cover_url,
    event_date,
    preferences,
    street,
    number,
    district,
    city,
    state,
  } = action.payload.data;
  if (!title || !description || !street || !number || !city || !state) {
    return yield put(
      MeetupActions.newMeetupFailure('Título, Descrição e Endereço são obrigatórios'),
    );
  }
  const newPreferences = preferences.filter(pref => pref.checked).map(pref => pref.id);
  try {
    const response = yield call(api.post, 'meetups', {
      title,
      description,
      cover_url,
      event_date,
      preferences: newPreferences,
      address: {
        street,
        number,
        district,
        city,
        state,
      },
    });
    const data = { ...response.data, flash: 'Novo meetup salvo com sucesso!' };
    yield put(MeetupActions.newMeetupSuccess(data));
    history.push('/dashboard');
  } catch (error) {
    yield put(MeetupActions.newMeetupFailure('Algo deu errado, tente novamente'));
  }
}

export function* fetchMeetup(action) {
  const { id } = action.payload.data;
  try {
    const user_id = parseInt(localStorage.getItem('@meetapp:user_id'));
    const response = yield call(api.get, `meetups/${id}`);
    const users = response.data.users;
    const alreadyRegistered = users.map(user => user.id).includes(user_id);
    const address = response.data.address[0];
    const data = { ...response.data, address, alreadyRegistered };
    yield put(MeetupActions.fetchSuccess(data));
  } catch (error) {
    yield put(MeetupActions.fetchFailure('Algo deu errado, tente novamente'));
  }
}
