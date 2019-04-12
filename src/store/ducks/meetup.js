/* Action Types */
export const Types = {
  NEW_REQUEST: 'meetup/NEW_MEETUP_REQUEST',
  NEW_SUCCESS: 'meetup/NEW_MEETUP_SUCCESS',
  NEW_FAILURE: 'meetup/NEW_MEETUP_FAILURE',
  FETCH_REQUEST: 'meetup/FETCH_REQUEST',
  FETCH_SUCCESS: 'meetup/FETCH_SUCCESS',
  FETCH_FAILURE: 'meetup/FETCH_FAILURE',
};

/* Reducer */
const INITIAL_STATE = {
  id: '',
  title: '',
  description: '',
  cover: '',
  preferences: [
    { id: 1, name: 'Front-end' },
    { id: 2, name: 'Back-end' },
    { id: 3, name: 'Mobile' },
    { id: 4, name: 'DevOps' },
    { id: 5, name: 'Gestão' },
    { id: 6, name: 'Marketing' },
  ],
  flash: '',
  loading: false,
  error: '',
};

export default function meetup(state = INITIAL_STATE, action) {
  switch (action.type) {
    // New meetup
    case Types.NEW_REQUEST:
      return { ...state, loading: true };
    case Types.NEW_SUCCESS:
      return {
        ...state,
        title: action.payload.data.title,
        description: action.payload.data.description,
        cover: action.payload.data.cover,
        error: '',
        flash: action.payload.data.flash,
        loading: false,
      };
    case Types.NEW_FAILURE:
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
        title: action.payload.data.title,
        description: action.payload.data.description,
        cover: action.payload.data.cover,
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
  newMeetupRequest: data => ({
    type: Types.NEW_REQUEST,
    payload: { data },
  }),

  newMeetupSuccess: data => ({
    type: Types.NEW_SUCCESS,
    payload: { data },
  }),

  newMeetupFailure: error => ({
    type: Types.NEW_FAILURE,
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
