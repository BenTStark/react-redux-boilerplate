import React from 'react';
import {IndexRoute, Route} from 'react-router';
//import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    AppContainer,
    HomeContainer,
// Add Here all other container and components
} from './components';

export default (store) => {
  // tbd: check how to use this in order to implement LoginSuccess

  // const requireLogin = (nextState, replace, cb) => {
  //   function checkAuth() {
  //     const { auth: { user }} = store.getState();
  //     if (!user) {
  //       // oops, not logged in, so can't be here!
  //       replace('/');
  //     }
  //     cb();
  //   }
  //
  //   if (!isAuthLoaded(store.getState())) {
  //     store.dispatch(loadAuth()).then(checkAuth);
  //   } else {
  //     checkAuth();
  //   }
  // };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={AppContainer}>
      { /* Home (main) route */ }
      <IndexRoute component={HomeContainer}/>
      // { /* Routes requiring login */ }
      // <Route onEnter={requireLogin}>
      //   <Route path="chat" component={Chat}/>
      //   <Route path="loginSuccess" component={LoginSuccess}/>
      // </Route>
      //
      // { /* Routes */ }
      // <Route path="about" component={About}/>
      // <Route path="login" component={Login}/>
      // <Route path="pagination" component={Pagination}/>
      // <Route path="survey" component={Survey}/>
      // <Route path="widgets" component={Widgets}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
