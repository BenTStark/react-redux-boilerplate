// optional for API requests
import Creators from "./actions";

const loginRequest = () => Creators.loginRequest();
const loginSuccess = authInformation => Creators.loginSuccess(authInformation);
const loginError = () => Creators.loginError();
const logout = () => Creators.logout();

export default {
  loginRequest,
  loginSuccess,
  loginError,
  logout
};
