import types from "./types";

const initalState = {
  value: null
};

// This is an example how a simple Reducer function could look like:
function defaultReducerFunction(state, value) {
  return {
    ...state,
    value: value
  };
}





const calendarReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.DEFAULT_ACTION:
        return defaultReducerFunction(state,action.value);
    
    default:
      return state;
  }
};

export default calendarReducer;
