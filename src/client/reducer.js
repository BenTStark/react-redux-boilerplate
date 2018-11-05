import { combineReducers } from "redux";
import authReducer from "./App/duck/index";
import { connectRouter } from "connected-react-router";
//import { homeReducer } from './Home/duck/index';

const reducer = history =>
  combineReducers({
    authReducer,
    //,homeReducer
    router: connectRouter(history)
  });

export default reducer;
