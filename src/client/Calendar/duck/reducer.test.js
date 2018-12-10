import calendarReducer from "./reducer";
import types from "./types";

describe(">>>>>> Calendar - Reducer Test", () => {
  let initialState = {
    value: null
  };
  // This is an example how a simple Test of a Reducer function could look like:
  it("+++ reducer for DEFAULT_ACTION", () => {
    let state = {
      ...initialState,
      value: "value"
    };
    let expectedState = initialState;
    state = calendarReducer(state, { type: types.DEFAULT_ACTION, value: "value" });
    expect(state).toEqual(expectedState);
  });

  

  
});
