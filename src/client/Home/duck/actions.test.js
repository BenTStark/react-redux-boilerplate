import Creators from "./actions";
import types from "./types";

describe(">>> Home - Action Test", () => {
  it("+++ testAction", () => {
    expect(Creators.testAction()).toEqual({ type: types.TEST_ACTION });
  });
});
