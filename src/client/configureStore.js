import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import reducer from "./reducer";

export default function configureStore(history, initialState = {}) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [thunk, reduxRouterMiddleware];

  const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunk, reduxRouterMiddleware),
    // Required! Enable Redux DevTools with the monitors you chose
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  // Sync dispatched route actions to the history

  const store = createStore(reducer(history), initialState, enhancer);

  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     store.replaceReducer(require('./../reducers').default);
  //   });
  // }
  return store;
}
