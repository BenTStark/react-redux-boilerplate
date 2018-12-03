import ActionCreators from "./actions";
import types from "./types";

describe(">>> NA - Action Test", () => {
  // This is an example how a simple action test should look like:
  it("+++ submitMessage", () => {
    const contactFormResult = { id: 1, content: "content" };
    expect(ActionCreators.submitMessage(contactFormResult)).toEqual({
      type: types.SUBMIT_MESSAGE,
      contactFormResult: contactFormResult
    });
  });
});
