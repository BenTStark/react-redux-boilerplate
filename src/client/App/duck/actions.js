import types from "./types.js";

const loginRequest = () => {
  return { type: types.LOGIN_REQUEST };
};

const loginRequest = authInformation => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: authInformation
  };
};

const loginRequest = () => {
  return {
    type: types.LOGIN_ERROR
  };
};

const logout = () => {
  return {
    type: types.LOGOUT
  };
};

export default {
  loginRequest,
  loginSuccess,
  loginError,
  logout
};
