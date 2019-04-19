/* Action Types */
export const Types = {
  MEETUPS_REQUEST: 'search/MEETUPS_REQUEST',
  MEETUPS_SUCCESS: 'search/MEETUPS_SUCCESS',
  MEETUPS_FAILURE: 'search/MEETUPS_FAILURE',
  FETCH_REQUEST: 'search/FETCH_REQUEST',
  FETCH_SUCCESS: 'search/FETCH_SUCCESS',
  FETCH_FAILURE: 'search/FETCH_FAILURE',
};

/* Reducer */
const INITIAL_STATE = {
  meetupsRegistered: {},
  meetupsRegisteredSoon: {},
  meetupsRecommendedSoon: {},
  meetupsNotRegSoon: {},
  meetupsByTitle: {},
  flash: '',
  loading: false,
  error: '',
};

// Achei extenso as declarações aqui, algo que possa ficar mais compacto o código dentro de cada case?
export default function meetup(state = INITIAL_STATE, action) {
  switch (action.type) {
    // New meetup
    case Types.MEETUPS_REQUEST:
      return { ...state, loading: true };
    case Types.MEETUPS_SUCCESS:
      return {
        ...state,
        meetupsRegistered: action.payload.data.meetupsRegistered.data,
        meetupsRegisteredSoon: action.payload.data.meetupsRegisteredSoon.data,
        meetupsNotRegSoon: action.payload.data.meetupsNotRegSoon.data,
        meetupsRecommendedSoon: action.payload.data.meetupsRecommendedSoon.data,
        meetupsByTitle: action.payload.data.meetupsByTitle.data,
        error: '',
        flash: action.payload.data.flash,
        loading: false,
      };
    case Types.MEETUPS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        flash: '',
        loading: false,
      };
    // Fetch single meetup
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
  fetchManyRequest: data => ({
    type: Types.MEETUPS_REQUEST,
    payload: { data },
  }),

  fetchManySuccess: data => ({
    type: Types.MEETUPS_SUCCESS,
    payload: { data },
  }),

  fetchManyFailure: error => ({
    type: Types.MEETUPS_FAILURE,
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
