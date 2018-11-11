import { combineReducers } from "redux";
import authReducer from "./App/duck/reducer";
import homeReducer from './Home/duck/reducer';
import { connectRouter } from "connected-react-router";

const reducer = history =>
  combineReducers({
    authReducer,
    homeReducer,
    router: connectRouter(history)
  });

export default reducer;
