import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { ReduxAsyncConnect } from "redux-connect";

//import rootReducer from './reducers/reducer';

import getRoutes from "./routes";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
const history = syncHistoryWithStore(browserHistory, store);

// Find Object in index.html for starting point.
const destination = document.getElementById("root");
// tbd: checken ob das passt und wie das ReduxAsyncConnect genau funktioniert
const component = (
  <Router
    render={props => (
      <ReduxAsyncConnect {...props} /*filter={item => !item.deferred}*/ />
    )}
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>
);
