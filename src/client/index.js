import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ReduxAsyncConnect } from "redux-connect";
import configureStore from "./configureStore";
import AppContainer from "./App/app.container";

// const store = createStore(
//   reducer,
//   undefined,
//   compose(
//     applyMiddleware(...middleware),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   )
// );
const history = createBrowserHistory();
const store = configureStore(history);
//const history = syncHistoryWithStore(_history, store);

// Find Object in index.html for starting point.
const destination = document.getElementById("root");
// tbd: checken ob das passt und wie das ReduxAsyncConnect genau funktioniert
// const component = (
//   //<ConnectedRouter  render={props => <ReduxAsyncConnect {...props} />} history={history}>
//   <ConnectedRouter  history={history}>
//     <AppContainer/>
//   </ConnectedRouter >
// );

ReactDOM.render(
  <Provider store={store} key="provider">
    <ConnectedRouter history={history}>
      <AppContainer />
    </ConnectedRouter>
  </Provider>,
  destination
);
