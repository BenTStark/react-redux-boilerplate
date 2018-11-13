import Creators from "./actions";
import types from "./types";

describe(">>> App - Action Test", () => {
  it("+++ loginRequest", () => {
    expect(Creators.loginRequest()).toEqual({ type: types.LOGIN_REQUEST });
  });

  it("+++ loginSuccess", () => {
    const authInformation = {
      profile: null,
      accessToken: null
    };
    expect(Creators.loginSuccess(authInformation)).toEqual({
      type: types.LOGIN_SUCCESS,
      payload: authInformation
    });
  });

  it("+++ loginError", () => {
    expect(Creators.loginError()).toEqual({ type: types.LOGIN_ERROR });
  });

  it("+++ logout", () => {
    expect(Creators.logout()).toEqual({ type: types.LOGOUT });
  });
});
