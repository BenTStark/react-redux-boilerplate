import types from "./types";

const initialState = {
  byId: [],
  byHash: {}
};

// This is an example how a simple Reducer function could look like:
function submitMessage(state, contactFormResult) {
  return {
    byId: [...state.byId, contactFormResult.id],
    byHash: {
      ...state.byHash,
      [contactFormResult.id]: contactFormResult
    }
  };
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBMIT_MESSAGE:
      return submitMessage(state, action.contactFormResult);
    default:
      return state;
  }
};

export default contactReducer;
