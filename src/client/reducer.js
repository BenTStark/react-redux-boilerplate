import { combineReducers } from "redux";
import authReducer from "./App/duck/index";
import homeReducer from './Home/duck/index';
import { connectRouter } from "connected-react-router";

const reducer = history =>
  combineReducers({
    authReducer,
    homeReducer,
    router: connectRouter(history)
  });

export default reducer;
