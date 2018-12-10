import types from "./types";

const loginRequest = () => {
  return { type: types.LOGIN_REQUEST };
};

const loginSuccess = authInformation => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: authInformation
  };
};

const loginError = () => {
  return {
    type: types.LOGIN_ERROR
  };
};

const logout = () => {
  return {
    type: types.LOGOUT
  };
};

const toogleLoginMethod = () => {
  return { type: types.TOGGLE_LOGIN_METHOD };
};

export default {
  loginRequest,
  loginSuccess,
  loginError,
  logout,
  toogleLoginMethod
};
