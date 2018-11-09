// optional for API requests
import axios from "axios";
import Creators from "./actions";

const getObjAsnyc = () => {
  console.log("async");
  const requestOptions = {
    method: "get",
    url: "https://mirrorpi.ddns.net/api"
  };

  const request = axios(requestOptions).then(response => {
    console.log(requestOptions);
    console.log(response);
    return { response: response, options: requestOptions };
  });

  return { payload: request };
};

const getObj = () => {
  console.log("opertions");
  Creators.getObj(getObjAsnyc());
};

const testAction = () => {
  Creators.testAction();
};

export const HomeOperations = {
  getObj,
  testAction
};
