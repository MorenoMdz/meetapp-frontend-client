import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import { Creators as SearchActions } from '../ducks/search';

export function* fetchMeetupsSoon(action) {
  try {
    // const user_id = localStorage.getItem('@meetapp:user_id');
    const meetupsRegistered = yield call(api.get, 'meetups/registered');
    const meetupsRegisteredSoon = yield call(api.get, 'meetups/registered-soon');
    const meetupsNotRegSoon = yield call(api.get, 'meetups/not-registered');
    const meetupsRecommendedSoon = yield call(api.get, 'meetups/recommended-soon');

    console.log('meetupsNotRegSoon from saga:', meetupsNotRegSoon.data);

    const data = {
      meetupsRegistered,
      meetupsRegisteredSoon,
      meetupsRecommendedSoon,
      meetupsNotRegSoon,
    };
    yield put(SearchActions.fetchSoonSuccess(data));
  } catch (error) {
    yield put(SearchActions.fetchSoonFailure('Algo deu errado, tente novamente'));
  }
}
