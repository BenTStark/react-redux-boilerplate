import ActionCreators from "./actions";
import types from "./types";

describe(">>> App - Action Test", () => {
  it("+++ loginRequest", () => {
    expect(ActionCreators.loginRequest()).toEqual({ type: types.LOGIN_REQUEST });
  });

  it("+++ loginSuccess", () => {
    const authInformation = {
      profile: null,
      accessToken: null
    };
    expect(ActionCreators.loginSuccess(authInformation)).toEqual({
      type: types.LOGIN_SUCCESS,
      payload: authInformation
    });
  });

  it("+++ loginError", () => {
    expect(ActionCreators.loginError()).toEqual({ type: types.LOGIN_ERROR });
  });

  it("+++ logout", () => {
    expect(ActionCreators.logout()).toEqual({ type: types.LOGOUT });
  });
});
