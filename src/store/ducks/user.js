/* Action Types */
export const Types = {
  REQUEST: 'user/USER_REQUEST',
  SUCCESS: 'user/USER_SUCCESS',
  FAILURE: 'user/USER_FAILURE',
  FETCH_REQUEST: 'user/FETCH_REQUEST',
  FETCH_SUCCESS: 'user/FETCH_SUCCESS',
  FETCH_FAILURE: 'user/FETCH_FAILURE',
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
};
