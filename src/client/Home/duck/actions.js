import homeTypes from "./types";

const getObj = getObjAsnyc => {
  console.log("action");
  console.log(types);
  console.log(getObjAsnyc);
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
