import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ReduxAsyncConnect } from "redux-connect";
import configureStore from "./configureStore";
import AppComponent from "./App/app.component";

const history = createBrowserHistory();
const store = configureStore(history);

// Find Object in index.html for starting point.
const destination = document.getElementById("root");

ReactDOM.render(
  <Provider store={store} key="provider">
    <ConnectedRouter history={history}>
      <AppComponent />
    </ConnectedRouter>
  </Provider>,
  destination
);
