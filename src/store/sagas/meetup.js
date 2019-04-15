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
    const meetup_id = response.data.id;

    console.tron.log('from saga: ', meetup_id);

    yield put(MeetupActions.newMeetupSuccess(data));
    history.push('/dashboard');
    // history.push(`/meetup/${meetup_id}`);
  } catch (error) {
    console.error(error);
    yield put(MeetupActions.newMeetupFailure('Algo deu errado, tente novamente'));
  }
}

export function* fetchMeetup(action) {
  const { id } = action.payload.data;
  try {
    // const id = localStorage.getItem('@meetapp:user_id');
    const response = yield call(api.get, `meetups/${id}`);
    // const userPreferences = response.data.preferences;
    // console.log('from saga:', response.data);
    const address = response.data.address[0];
    console.log('from saga:', address);
    const data = { ...response.data, address };
    yield put(MeetupActions.fetchSuccess(data));
  } catch (error) {
    yield put(MeetupActions.fetchFailure('Algo deu errado, tente novamente'));
  }
}
