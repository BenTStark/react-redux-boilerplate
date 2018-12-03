import ActionCreators from "./actions";

// URLs for API us are build here, but used in container!
const getDataUrl = "https://mirrorpi.ddns.net/api";

const getObj = objAsync => ActionCreators.getObj(objAsync);

const testAction = () => ActionCreators.testAction();

export const HomeOperations = {
  getObj,
  getDataUrl,
  testAction
};
