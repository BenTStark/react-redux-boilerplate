// optional for API requests
import ActionCreators from "./actions";
import AuthService from "./auth.service";
import types from "./types";

const loginRequest = () => ActionCreators.loginRequest();
const loginSuccess = authInformation =>
  ActionCreators.loginSuccess(authInformation);
const loginError = () => ActionCreators.loginError();
const logout = () => ActionCreators.logout();
const toogleLoginMethod = () => ActionCreators.toogleLoginMethod();

const checkLogin = () => {
  console.log("check");
  return new Promise((resolve, reject) => {
    const payload = {},
      authInformation = {};
    authInformation.result = "";
    if (AuthService.loggedIn()) {
      payload.profile = AuthService.getProfile();
      payload.accessToken = AuthService.getAccessToken();
      authInformation.result = types.LOGIN_SUCCESS;
    }
    authInformation.payload = payload;
    resolve(authInformation);
  });
};

const authentication = () => {
  // Add callback for lock's `authenticated` event
  console.log("auth");
  return new Promise((resolve, reject) => {
    const payload = {},
      authInformation = {};
    authInformation.result = "";
    authInformation.payload = payload;
    AuthService.lock.on("authenticated", authResult => {
      console.log(authResult);
      AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          console.log(error);
          authInformation.result = types.LOGIN_ERROR;
          authInformation.payload = error;
          reject(authInformation);
        } else {
          console.log(profile);
          AuthService.setToken(authResult.idToken, authResult.accessToken); // static method
          AuthService.setProfile(profile); // static method
          payload.profile = profile;
          payload.accessToken = authResult.accessToken;
          authInformation.result = types.LOGIN_SUCCESS;
          authInformation.payload = payload;
          AuthService.lock.hide();
          resolve(authInformation);
        }
      });
    });
    // Add callback for lock's `authorization_error` event
    AuthService.lock.on("authorization_error", error => {
      authInformation.result = types.LOGIN_ERROR;
      reject(authInformation);
    });
  });
};

const handleLogin = () => {
  AuthService.login();
};

const handleCustomLogin = (username, password) => {
  AuthService.customLogin(username, password);
};

const handleLogout = () => {
  AuthService.logout();
};

const handleCustomLogout = () => {
  AuthService.customLogout();
};

export const AppOperations = {
  handleLogin,
  handleCustomLogin,
  loginRequest,
  loginSuccess,
  loginError,
  handleLogout,
  handleCustomLogout,
  logout,
  toogleLoginMethod,
  checkLogin,
  authentication
};

//export default AppOperations;
