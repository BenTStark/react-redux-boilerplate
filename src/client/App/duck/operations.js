// optional for API requests
import Creators from "./actions";

const loginRequest = () => Creators.loginRequest();
const loginSuccess = authInformation => Creators.loginSuccess(authInformation);
const loginError = () => Creators.loginError();
const logout = () => Creators.logout();

export const AppOperations = {
  loginRequest,
  loginSuccess,
  loginError,
  logout,
};

//export default AppOperations;
