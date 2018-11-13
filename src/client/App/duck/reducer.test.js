import authReducer from "./reducer";
import types from "./types";

describe(">>>>>> Home - Reducer Test", () => {
  let initialState = {
    profile: null,
    accessToken: null,
    loginRequest: false,
    loginSuccess: false,
    loginError: false
  };

  it("+++ reducer for LOGIN_REQUEST", () => {
    let state = initialState;
    let expectedState = {
      ...initialState,
      loginRequest: true
    };
    state = authReducer(state, { type: types.LOGIN_REQUEST });
    expect(state).toEqual(expectedState);
  });
  it("+++ reducer for LOGIN_SUCCESS", () => {
    let state = { ...initialState, loginRequest: true };
    let expectedState = {
      ...initialState,
      profile: "tester",
      accessToken: "token",
      loginSuccess: true
    };
    state = authReducer(state, {
      type: types.LOGIN_SUCCESS,
      payload: { profile: "tester", accessToken: "token" }
    });
    expect(state).toEqual(expectedState);
  });
  it("+++ reducer for LOGIN_ERROR", () => {
    let state = { ...initialState, loginRequest: true };
    let expectedState = {
      ...initialState,
      loginError: true
    };
    state = authReducer(state, { type: types.LOGIN_ERROR });
    expect(state).toEqual(expectedState);
  });
  it("+++ reducer for LOGOUT", () => {
    let state = {
      ...initialState,
      profile: "tester",
      accessToken: "token",
      loginSuccess: true
    };
    let expectedState = initialState;
    state = authReducer(state, { type: types.LOGOUT });
    expect(state).toEqual(expectedState);
  });
});
