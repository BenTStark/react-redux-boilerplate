import types from "./types";

// Actions should not do any change to the value they pass to the store.
// Any value treatment should happen before in operations.js!
// This is an example how an action should look like:
const defaultAction = (value) => {
  return {
    type: types.DEFAULT_ACTION,
    value: value
  }
};






export default {
  defaultAction
};
