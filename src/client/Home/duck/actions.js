import types from "./types.js";

const defaultAction = value => {
  return {
    type: types.DEFAULT_ACTION,
    value: value
  };
};

export default {
  defaultAction
};
