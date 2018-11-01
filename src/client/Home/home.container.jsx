import { connect } from 'react-redux';
import HomeComponent from './home.component';
import { homeOperations } from './duck';

const mapStateToProps = state => {
  const { auth } = state.authReducer;
  return { auth }
};

// const mapDispatchToProps = dispatch => {
//   const defaultOperation = () => dispatch(homeOperations.defaultOperation()));
//
//   return {
//     defaultOperation
//   }
// };

const HomeContainer = connect(
  mapStateToProps,
  Null
)(HomeComponent);

export default HomeContainer;
