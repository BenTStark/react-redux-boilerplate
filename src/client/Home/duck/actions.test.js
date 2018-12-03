import ActionCreators from "./actions";
import types from "./types";

describe(">>> Home - Action Test", () => {
  it("+++ testAction", () => {
    expect(ActionCreators.testAction()).toEqual({ type: types.TEST_ACTION });
  });
});
