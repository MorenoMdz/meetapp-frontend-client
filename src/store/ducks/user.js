/* Action Types */
export const Types = {
  REQUEST: 'user/USER_REQUEST',
  SUCCESS: 'user/USER_SUCCESS',
  FAILURE: 'user/USER_FAILURE',
  FETCH_REQUEST: 'user/FETCH_REQUEST',
  FETCH_SUCCESS: 'user/FETCH_SUCCESS',
  FETCH_FAILURE: 'user/FETCH_FAILURE',
  SET_PREFERENCES_REQUEST: 'user/SET_PREFERENCES_REQUEST',
  SET_PREFERENCES_SUCCESS: 'user/SET_PREFERENCES_SUCCESS',
  SET_PREFERENCES_FAILURE: 'user/SET_PREFERENCES_FAILURE',
};

/* Reducer */
const INITIAL_STATE = {
  loading: false,
  error: '',
  id: '',
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  preferences: [],
  flash: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Update
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        error: '',
        flash: 'Dados atualizados com sucesso!',
        loading: false,
      };
    case Types.FAILURE:
      return {
        ...state,
        error: action.payload.error,
        flash: '',
        loading: false,
      };
    // Fetch
    case Types.FETCH_REQUEST:
      return { ...state, loading: true };
    case Types.FETCH_SUCCESS:
      return {
        ...state,
        name: action.payload.data.name,
        email: action.payload.data.email,
        preferences: action.payload.data.preferences,
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
    // Set Preferences
    case Types.SET_PREFERENCES_REQUEST:
      return { ...state, loading: true };
    case Types.SET_PREFERENCES_SUCCESS:
      return {
        ...state,
        flash: action.payload.data.flash,
        error: '',
        loading: false,
      };
    case Types.SET_PREFERENCES_FAILURE:
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
  userRequest: data => ({
    type: Types.REQUEST,
    payload: { data },
  }),

  userSuccess: ({ token }) => ({
    type: Types.SUCCESS,
    payload: { token },
  }),

  userFailure: error => ({
    type: Types.FAILURE,
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

  setPreferencesRequest: data => ({
    type: Types.SET_PREFERENCES_REQUEST,
    payload: { data },
  }),

  setPreferencesSuccess: data => ({
    type: Types.SET_PREFERENCES_SUCCESS,
    payload: { data },
  }),

  setPreferencesFailure: error => ({
    type: Types.SET_PREFERENCES_FAILURE,
    payload: { error },
  }),
};
