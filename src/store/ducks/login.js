/* Action Types */
export const Types = {
  REQUEST: 'login/LOGIN_REQUEST',
  SUCCESS: 'login/LOGIN_SUCCESS',
  FAILURE: 'login/LOGIN_FAILURE',
};

/* Reducer */
const INITIAL_STATE = {
  token: '',
  isLogged: false,
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
        token: action.payload.token,
        isLogged: true,
        error: '',
        loading: false,
      };
    case Types.FAILURE:
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
  // send request to SAGA
  loginRequest: ({ email, password, history }) => ({
    type: Types.REQUEST,
    payload: { email, password, history },
  }),

  // send from saga to redux
  loginSuccess: ({ token }) => ({
    type: Types.SUCCESS,
    payload: { token },
  }),

  loginFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
};
