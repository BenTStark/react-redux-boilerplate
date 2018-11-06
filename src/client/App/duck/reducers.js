import types from "./types";

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

function loginSuccess(state, authInformation) {
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
      return loginSuccess(state,action.payload);
    case types.LOGIN_ERROR:
      return loginError(state);
    case types.LOGOUT:
        return logout(state);
    default:
      return state;
  }
};

export default authReducer;
