import { connect } from "react-redux";
import { push } from "connected-react-router";
import NavigationComponent from "./navigation.component";
import { AppOperations } from "./duck/operations";

const mapStateToProps = state => {
  return { auth: state.authReducer };
};

const mapDispatchToProps = dispatch => {
  const loginRequest = () => dispatch(AppOperations.loginRequest());
  const loginSuccess = authInformation =>
    dispatch(AppOperations.loginSuccess(authInformation));
  const loginError = () => dispatch(AppOperations.loginError());
  const logout = () => dispatch(AppOperations.logout());
  const pushHistory = pathname => dispatch(push(pathname));

  return {
    loginRequest,
    loginSuccess,
    loginError,
    logout,
    pushHistory
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationComponent);
