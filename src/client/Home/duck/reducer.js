import types from "./types";

const initalState = {
  payload: null,
  test: false
};

function getObj(state, getObjAsnyc) {
  return {
    ...state,
    payload: getObjAsnyc
  };
}

function testAction(state) {
  return {
    ...state,
    test: !state.test
  };
}

const homeReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_OBJECT:
      return getObj(state, action.payload);
    case types.TEST_ACTION:
      return testAction(state);
    default:
      return state;
  }
};

export default homeReducer;
