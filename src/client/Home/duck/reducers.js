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
  console.log("reducer");
  console.log(action);
  switch (action.type) {
    case types.GET_OBJECT:
      return getObj(state, action.payload);
    case types.TEST_ACTIONS:
      return testAction(state);
    default:
      return state;
  }
};

export default homeReducer;
