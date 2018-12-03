import contactReducer from "./reducer";
import types from "./types";

describe(">>>>>> NA - Reducer Test", () => {
  let initialState = {
    byId: [],
    byHash: {}
  };

  // This is an example how a simple Test of a Reducer function could look like:
  it("+++ reducer for SUBMIT_MESSAGE", () => {
    let expectedState = {
      byId: [1],
      byHash: {
        "1": { id: 1, content: "content" }
      }
    };

    let state = contactReducer(initialState, {
      type: types.SUBMIT_MESSAGE,
      contactFormResult: { id: 1, content: "content" }
    });
    expect(state).toEqual(expectedState);
  });
});
