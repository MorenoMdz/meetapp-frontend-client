import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import { Creators as SearchActions } from '../ducks/search';

export function* fetchByTitle(action) {
  try {
    const { title = '', page = 1 } = action.payload.data;
    const meetupsByTitle = yield call(api.get, 'meetups/by-title', {
      params: { title, page },
    });
    yield put(SearchActions.fetchByTitleSuccess(meetupsByTitle));
  } catch (error) {
    yield put(SearchActions.fetchByTitleFailure('Algo deu errado, tente novamente'));
  }
}

export function* fetchRegisteredSoon(action) {
  const { page } = action.payload.data;
  try {
    const meetupsRegisteredSoon = yield call(api.get, `meetups/registered-soon?page=${page}`);
    const data = {
      meetupsRegisteredSoon,
    };
    yield put(SearchActions.fetchRegisteredSuccess(data));
  } catch (error) {
    yield put(SearchActions.fetchRegisteredFailure('Algo deu errado, tente novamente'));
  }
}

export function* fetchNotRegSoon(action) {
  const { page } = action.payload.data;
  try {
    const meetupsNotRegSoon = yield call(api.get, `meetups/not-registered?page=${page}`);
    const data = {
      meetupsNotRegSoon,
    };
    yield put(SearchActions.fetchNotRegSoonSuccess(data));
  } catch (error) {
    yield put(SearchActions.fetchNotRegSoonFailure('Algo deu errado, tente novamente'));
  }
}

export function* fetchRecommendedSoon(action) {
  const { page } = action.payload.data;
  try {
    const meetupsRecommendedSoon = yield call(api.get, `meetups/recommended-soon?page=${page}`);
    const data = {
      meetupsRecommendedSoon,
    };
    yield put(SearchActions.fetchRecommendedSuccess(data));
  } catch (error) {
    yield put(SearchActions.fetchRecommendedFailure('Algo deu errado, tente novamente'));
  }
}
