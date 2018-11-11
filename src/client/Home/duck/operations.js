import Creators from "./actions";

// URLs for API us are build here, but used in container!
const getDataUrl = "https://mirrorpi.ddns.net/api";

const getObj = objAsync => Creators.getObj(objAsync);

const testAction = () => Creators.testAction();

export const HomeOperations = {
  getObj,
  getDataUrl,
  testAction
};
