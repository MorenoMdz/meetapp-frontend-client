/* Action Types */
export const Types = {
  MEETUPS_REQUEST: 'search/MEETUPS_REQUEST',
  MEETUPS_SUCCESS: 'search/MEETUPS_SUCCESS',
  MEETUPS_FAILURE: 'search/MEETUPS_FAILURE',
  FETCH_REQUEST: 'search/FETCH_REQUEST',
  FETCH_SUCCESS: 'search/FETCH_SUCCESS',
  FETCH_FAILURE: 'search/FETCH_FAILURE',
  NOT_REG_REQUEST: 'search/NOT_REG_REQUEST',
  NOT_REG_SUCCESS: 'search/NOT_REG_SUCCESS',
  NOT_REG_FAILURE: 'search/NOT_REG_FAILURE',
  RECOMMENDED_REQUEST: 'search/RECOMMENDED_REQUEST',
  RECOMMENDED_SUCCESS: 'search/RECOMMENDED_SUCCESS',
  RECOMMENDED_FAILURE: 'search/RECOMMENDED_FAILURE',
  REGISTERED_REQUEST: 'search/REGISTERED_REQUEST',
  REGISTERED_SUCCESS: 'search/REGISTERED_SUCCESS',
  REGISTERED_FAILURE: 'search/REGISTERED_FAILURE',
};

/* Reducer */
const INITIAL_STATE = {
  meetupsRegisteredSoon: {},
  meetupsRecommendedSoon: {},
  meetupsNotRegSoon: {},
  meetupsByTitle: {},
  flash: '',
  loading: false,
  error: '',
};

export default function meetup(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Fetch Registered
    case Types.REGISTERED_REQUEST:
      return { ...state, loading: true };
    case Types.REGISTERED_SUCCESS:
      return {
        ...state,
        meetupsRegisteredSoon: action.payload.data.meetupsRegisteredSoon.data,
        flash: action.payload.data.flash,
        error: '',
        loading: false,
      };
    case Types.REGISTERED_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        flash: '',
        loading: false,
      };
    // Fetch not reg soon
    case Types.NOT_REG_REQUEST:
      return { ...state, loading: true };
    case Types.NOT_REG_SUCCESS:
      return {
        ...state,
        meetupsNotRegSoon: action.payload.data.meetupsNotRegSoon.data,
        flash: action.payload.data.flash,
        error: '',
        loading: false,
      };
    case Types.NOT_REG_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        flash: '',
        loading: false,
      };
    // Fetch Recommended
    case Types.RECOMMENDED_REQUEST:
      return { ...state, loading: true };
    case Types.RECOMMENDED_SUCCESS:
      return {
        ...state,
        meetupsRecommendedSoon: action.payload.data.meetupsRecommendedSoon.data,
        flash: action.payload.data.flash,
        error: '',
        loading: false,
      };
    case Types.RECOMMENDED_FAILURE:
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
        meetupsByTitle: action.payload.data.data,
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
  // Not registered Soon
  fetchNotRegSoonRequest: data => ({
    type: Types.NOT_REG_REQUEST,
    payload: { data },
  }),
  fetchNotRegSoonSuccess: data => ({
    type: Types.NOT_REG_SUCCESS,
    payload: { data },
  }),
  fetchNotRegSoonFailure: error => ({
    type: Types.NOT_REG_FAILURE,
    payload: { error },
  }),
  // Registered Soon
  fetchRegisteredRequest: data => ({
    type: Types.REGISTERED_REQUEST,
    payload: { data },
  }),
  fetchRegisteredSuccess: data => ({
    type: Types.REGISTERED_SUCCESS,
    payload: { data },
  }),
  fetchRegisteredFailure: error => ({
    type: Types.REGISTERED_FAILURE,
    payload: { error },
  }),
  // Recommended
  fetchRecommendedRequest: data => ({
    type: Types.RECOMMENDED_REQUEST,
    payload: { data },
  }),
  fetchRecommendedSuccess: data => ({
    type: Types.RECOMMENDED_SUCCESS,
    payload: { data },
  }),
  fetchRecommendedFailure: error => ({
    type: Types.RECOMMENDED_FAILURE,
    payload: { error },
  }),
  // Search by Title
  fetchByTitleRequest: data => ({
    type: Types.FETCH_REQUEST,
    payload: { data },
  }),
  fetchByTitleSuccess: data => ({
    type: Types.FETCH_SUCCESS,
    payload: { data },
  }),
  fetchByTitleFailure: error => ({
    type: Types.FETCH_FAILURE,
    payload: { error },
  }),
};
