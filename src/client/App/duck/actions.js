import types from "./index";

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

export default {
  loginRequest,
  loginSuccess,
  loginError,
  logout
};
