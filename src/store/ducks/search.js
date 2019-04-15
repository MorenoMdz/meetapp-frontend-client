/* Action Types */
export const Types = {
  SOON_REQUEST: 'search/MEETUPS_SOON_REQUEST',
  SOON_SUCCESS: 'search/MEETUPS_SOON_SUCCESS',
  SOON_FAILURE: 'search/MEETUPS_SOON_FAILURE',
  FETCH_REQUEST: 'search/FETCH_REQUEST',
  FETCH_SUCCESS: 'search/FETCH_SUCCESS',
  FETCH_FAILURE: 'search/FETCH_FAILURE',
};

/* Reducer */
const INITIAL_STATE = {
  meetupsRegistered: {},
  meetupsRegisteredSoon: {},
  meetupsRecommendedSoon: {},
  flash: '',
  loading: false,
  error: '',
};

export default function meetup(state = INITIAL_STATE, action) {
  switch (action.type) {
    // New meetup
    case Types.SOON_REQUEST:
      return { ...state, loading: true };
    case Types.SOON_SUCCESS:
      return {
        ...state,
        meetupsRegistered: action.payload.data.meetupsRegistered.data,
        meetupsRegisteredSoon: action.payload.data.meetupsRegisteredSoon.data,
        meetupsNotRegSoon: action.payload.data.meetupsNotRegSoon.data,
        meetupsRecommendedSoon: action.payload.data.meetupsRecommendedSoon.data,
        error: '',
        flash: action.payload.data.flash,
        loading: false,
      };
    case Types.SOON_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        flash: '',
        loading: false,
      };
    // Fetch meetup
    case Types.FETCH_REQUEST:
      return { ...state, loading: true };
    case Types.FETCH_SUCCESS:
      return {
        ...state,
        meetupsSoon: [...action.payload.data],
        event_date: action.payload.data.event_date,
        flash: action.payload.data.flash,
        error: '',
        loading: false,
      };
    case Types.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        flash: '',
        loading: false,
      };
    default:
      return state;
  }
}

/* Action Creators */
export const Creators = {
  fetchSoonRequest: data => ({
    type: Types.SOON_REQUEST,
    payload: { data },
  }),

  fetchSoonSuccess: data => ({
    type: Types.SOON_SUCCESS,
    payload: { data },
  }),

  fetchSoonFailure: error => ({
    type: Types.SOON_FAILURE,
    payload: { error },
  }),

  fetchRequest: data => ({
    type: Types.FETCH_REQUEST,
    payload: { data },
  }),

  fetchSuccess: data => ({
    type: Types.FETCH_SUCCESS,
    payload: { data },
  }),

  fetchFailure: error => ({
    type: Types.FETCH_FAILURE,
    payload: { error },
  }),
};
