import { connect } from "react-redux";
import HomeComponent from "./home.component";
import { homeOperations } from "./duck";

const mapStateToProps = state => {
  return { auth: state.authReducer };
};

const HomeContainer = connect(mapStateToProps)(HomeComponent);

export default HomeContainer;
