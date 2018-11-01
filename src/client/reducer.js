import { combineReducers } from 'redux';
import { authReducer } from './App/duck/index';
//import { homeReducer } from './Home/duck/index';

const reducer = combineReducers({
    authReducer
    //,homeReducer
});

export default reducer;
