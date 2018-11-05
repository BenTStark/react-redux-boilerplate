import types from "./types.js";

const initalState = {
  profile: null,
  accessToken: null,
  loginRequest: false,
  loginSuccess: false,
  loginError: false
};

function loginRequest(state) {
  return { ...state, loginRequest: true };
}

function loginSuccess(state, credentials) {
  return {
    ...state,
    profile: authInformation.profile,
    accessToken: authInformation.accessToken,
    loginRequest: false,
    loginSuccess: true
  };
}

function loginError(state) {
  return { ...state, loginRequest: false, loginError: true };
}

function logout(state) {
  return {
    ...state,
    user: null,
    accessToken: null,
    loginRequest: false,
    loginSuccess: false
  };
}

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return loginRequest(state);
    case types.LOGIN_SUCCESS:
      return loginRequest(state,action.payload.authInformation);
    case types.LOGIN_ERROR:
      return loginRequest(state);
    case types.LOGOUT:
        return logout(state);
    default:
      return state;
  }
};

export default authReducer;
