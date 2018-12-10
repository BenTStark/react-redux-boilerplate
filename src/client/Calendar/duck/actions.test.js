import ActionCreators from "./actions";
import types from "./types";

describe(">>> Calendar - Action Test", () => {
  // This is an example how a simple action test should look like:
  it("+++ defaultAction", () => {
    const value = "value"
    expect(ActionCreators.defaultAction(value)).toEqual({ type: types.DEFAULT_ACTION, value: value });
  });

  

  
});
