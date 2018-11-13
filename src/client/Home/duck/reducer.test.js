import homeReducer from "./reducer";
import types from "./types";

describe(">>>>>> Home - Reducer Test", () => {
  it("+++ reducer for TEST_ACTION", () => {
    let state = { test: false };
    state = homeReducer(state, { type: types.TEST_ACTION });
    expect(state).toEqual({ test: true });
  });
});
