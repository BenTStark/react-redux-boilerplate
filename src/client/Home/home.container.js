import { connect } from "react-redux";
import HomeComponent from "./home.component";
import { HomeOperations } from "./duck/operations";

const mapStateToProps = state => {
  return { auth: state.authReducer, home: state.homeReducer };
};

const mapDispatchToProps = dispatch => {
  const getObj = () => dispatch(HomeOperations.getObj());
  const testAction = () => dispatch(HomeOperations.testAction());
  return {
    getObj,
    testAction
  };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

export default HomeContainer;
