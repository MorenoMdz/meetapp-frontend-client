import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import { Creators as MeetupActions } from '../ducks/meetup';

export function* newMeetup(action) {
  const {
    title,
    description,
    cover_url,
    event_date,
    history,
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

    yield put(MeetupActions.newMeetupSuccess(data));
    // history.push(`/meetup/${meetup_id}`);
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
