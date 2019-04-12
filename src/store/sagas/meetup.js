import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import { Creators as MeetupActions } from '../ducks/meetup';

export function* newMeetup(action) {
  console.log('new Meetup called from saga!');
  const {
    title,
    description,
    cover_url,
    event_date,
    // history,
    preferences,
  } = action.payload.data;

  if (!title || !description) {
    return yield put(MeetupActions.newMeetupFailure('Título e Descrição são obrigatórios'));
  }

  const newPreferences = preferences.filter(pref => pref.checked).map(pref => pref.id);
  console.error(cover_url);
  try {
    const response = yield call(api.post, 'meetups', {
      title,
      description,
      cover_url,
      event_date,
      preferences: newPreferences,
    });

    const data = { ...response.data, flash: 'Novo meetup salvo com sucesso!' };

    yield put(MeetupActions.newMeetupSuccess(data));
    //   // history.push('/dashboard');
  } catch (error) {
    console.error(error);
    yield put(MeetupActions.newMeetupFailure('Algo deu errado, tente novamente'));
  }
}

export function* fetchMeetup(action) {
  console.log('fetch Meetup called from saga!');
  // try {
  //   const id = localStorage.getItem('@meetapp:user_id');
  //   const response = yield call(api.get, `users/${id}`);
  //   const userPreferences = response.data.preferences;
  //   // console.log('from saga:', userPreferences);

  //   const preferences = [
  //     { id: 1, name: 'Front-end', checked: false },
  //     { id: 2, name: 'Back-end', checked: false },
  //     { id: 3, name: 'Mobile', checked: false },
  //     { id: 4, name: 'DevOps', checked: false },
  //     { id: 5, name: 'Gestão', checked: false },
  //     { id: 6, name: 'Marketing', checked: false },
  //   ];

  //   preferences.forEach(pref => userPreferences.forEach((userPref) => {
  //     if (pref.id === userPref.id) {
  //       pref.checked = true;
  //     }
  //   }));

  //   // TODO flash msg user update in!

  //   const data = { ...response.data, preferences };

  //   yield put(UserActions.fetchSuccess(data));
  // } catch (error) {
  //   yield put(UserActions.fetchFailure('Algo deu errado, tente novamente'));
  // }
}
