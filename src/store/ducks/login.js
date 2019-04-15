/* Action Types */
export const Types = {
  REQUEST: 'login/LOGIN_REQUEST',
  SUCCESS: 'login/LOGIN_SUCCESS',
  FAILURE: 'login/LOGIN_FAILURE',
  LOGOUT_REQUEST: 'login/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'login/LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'login/LOGOUT_FAILURE',
};

/* Reducer */
const INITIAL_STATE = {
  loading: false,
  error: '',
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true };
    case Types.SUCCESS:
      return {
        ...state,
        id: action.payload.user_id,
        token: action.payload.token,
        error: '',
        loading: false,
      };
    case Types.FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case Types.LOGOUT_REQUEST:
      return { ...state, loading: true };
    case Types.LOGOUT_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
      };
    case Types.LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
}

/* Action Creators */
export const Creators = {
  loginRequest: ({ email, password, history }) => ({
    type: Types.REQUEST,
    payload: { email, password, history },
  }),

  loginSuccess: ({ token, user_id }) => ({
    type: Types.SUCCESS,
    payload: { token, user_id },
  }),

  loginFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),

  logoutRequest: ({ email, password, history }) => ({
    type: Types.LOGOUT_REQUEST,
    payload: { email, password, history },
  }),

  logoutSuccess: ({ token, user_id }) => ({
    type: Types.LOGOUT_SUCCESS,
    payload: { token, user_id },
  }),

  logoutFailure: error => ({
    type: Types.LOGOUT_FAILURE,
    payload: { error },
  }),
};
