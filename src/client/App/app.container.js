import { connect } from "react-redux";
import AppComponent from "./app.component";
// tbd: schauen ob ich das Brauche...vermutlich für Login Behandlung
//import { AppOperations } from './duck';

//import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
//import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
//import { push } from 'react-router-redux';
//import { asyncConnect } from 'redux-async-connect';

// tbd: Brauche ich dieses asyncConnect überhaupt?

// @asyncConnect([{
//   promise: ({store: {dispatch, getState}}) => {
//     const promises = [];
//
//     if (!isInfoLoaded(getState())) {
//       promises.push(dispatch(loadInfo()));
//     }
//     if (!isAuthLoaded(getState())) {
//       promises.push(dispatch(loadAuth()));
//     }
//
//     return Promise.all(promises);
//   }
// }])
// @connect(
//   state => ({user: state.auth.user}),
//   {logout, pushState: push})

const mapStateToProps = state => {
  // tbd: sind die UserInfos in dem Reducer?
  const { auth } = state.authReducer;
  return { auth };
};

const mapDispatchToProps = dispatch => {
  const loginRequest = () => dispatch(AppOperations.loginRequest());
  const loginSuccess = authInformation =>
    dispatch(AppOperations.loginSuccess(authInformation));
  const loginError = () => dispatch(AppOperations.loginError());
  const logout = () => dispatch(AppOperations.logout());

  return {
    loginRequest,
    loginSuccess,
    loginError,
    logout
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default AppContainer;
