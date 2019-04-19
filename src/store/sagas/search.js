import { call, put } from 'redux-saga/effects';

import axios from 'axios';
import api from '../../services/api';

import { Creators as SearchActions } from '../ducks/search';

export function* fetchManyMeetups(action) {
  try {
    // TODO case switch comming from action.type
    const meetupsRegistered = yield call(api.get, 'meetups/registered');
    const meetupsRegisteredSoon = yield call(api.get, 'meetups/registered-soon');
    const meetupsNotRegSoon = yield call(api.get, 'meetups/not-registered');
    const meetupsRecommendedSoon = yield call(api.get, 'meetups/recommended-soon');
    const { title = '', page = 1 } = action.payload.data;
    const meetupsByTitle = yield call(api.get, 'meetups/by-title', {
      params: { title, page },
    });

    // console.log('meetupsByTitle from saga:', meetupsByTitle.data);

    const data = {
      meetupsRegistered,
      meetupsRegisteredSoon,
      meetupsRecommendedSoon,
      meetupsNotRegSoon,
      meetupsByTitle,
    };
    yield put(SearchActions.fetchManySuccess(data));
  } catch (error) {
    console.log('from saga: ', error);
    yield put(SearchActions.fetchManyFailure('Algo deu errado, tente novamente'));
  }
}
