import { connect } from "react-redux";
import HomeComponent from "./home.component";
import { HomeOperations } from "./duck/operations";
import axios from "axios";

const mapStateToProps = state => {
  return { auth: state.authReducer, home: state.homeReducer, contact: state.contactReducer  };
};

const mapDispatchToProps = dispatch => {
  const testAction = () => dispatch(HomeOperations.testAction());
  const getObj = () =>
    axios.get(HomeOperations.getDataUrl).then(response => {
      dispatch(HomeOperations.getObj(response.data));
    });

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
