/* Action Types */
export const Types = {
  REQUEST: 'signup/SIGNUP_REQUEST',
  SUCCESS: 'signup/SIGNUP_SUCCESS',
  FAILURE: 'signup/SIGNUP_FAILURE',
};

/* Reducer */
const INITIAL_STATE = {
  isLogged: false,
  loading: false,
  error: '',
};

export default function signup(state = INITIAL_STATE, action) {
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
  signupRequest: data => ({
    type: Types.REQUEST,
    payload: { data },
  }),

  // send from saga to redux
  signupSuccess: ({ token }) => ({
    type: Types.SUCCESS,
    payload: { token },
  }),

  signupFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
};
