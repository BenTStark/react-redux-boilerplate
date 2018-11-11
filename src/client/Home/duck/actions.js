import types from "./types";

const getObj = getObjAsnyc => {
  return {
    type: types.GET_OBJECT,
    payload: getObjAsnyc
  };
};

const testAction = () => {
  return { type: types.TEST_ACTION };
};

export default {
  getObj,
  testAction
};
