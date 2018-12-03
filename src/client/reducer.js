import { combineReducers } from "redux";
import authReducer from "./App/duck/reducer";
import homeReducer from "./Home/duck/reducer";
import contactReducer from "./Contact/duck/reducer";
import blogReducer from "./Blog/duck/reducer";
import { connectRouter } from "connected-react-router";

const reducer = history =>
  combineReducers({
    authReducer,
    homeReducer,
    contactReducer,
    blogReducer,
    router: connectRouter(history)
  });

export default reducer;
