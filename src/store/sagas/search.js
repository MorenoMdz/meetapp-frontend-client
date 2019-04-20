import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import { Creators as SearchActions } from '../ducks/search';

export function* fetchByTitle(action) {
  try {
    const { title = '', page = 1 } = action.payload.data;
    const meetupsByTitle = yield call(api.get, 'meetups/by-title', {
      params: { title, page },
    });
    console.log('by title: ', meetupsByTitle);
    yield put(SearchActions.fetchByTitleSuccess(meetupsByTitle));
  } catch (error) {
    console.log('from saga: ', error);
    yield put(SearchActions.fetchByTitleFailure('Algo deu errado, tente novamente'));
  }
}

export function* fetchManyMeetups(action) {
  try {
    const meetupsRegistered = yield call(api.get, 'meetups/registered');
    const meetupsRegisteredSoon = yield call(api.get, 'meetups/registered-soon');
    const meetupsNotRegSoon = yield call(api.get, 'meetups/not-registered');
    const meetupsRecommendedSoon = yield call(api.get, 'meetups/recommended-soon');
    const data = {
      meetupsRegistered,
      meetupsRegisteredSoon,
      meetupsRecommendedSoon,
      meetupsNotRegSoon,
    };
    yield put(SearchActions.fetchManySuccess(data));
    // console.log('meetupsByTitle from saga:', meetupsByTitle.data);
  } catch (error) {
    console.log('from saga: ', error);
    yield put(SearchActions.fetchManyFailure('Algo deu errado, tente novamente'));
  }
}
