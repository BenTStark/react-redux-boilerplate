import { connect } from 'react-redux';
import CalendarComponent from './calendar.component';
import { CalendarOperations } from './duck/operations';


const mapStateToProps = state => {
  return { calendar: state.calendarReducer }
};

const mapDispatchToProps = dispatch => {
  // const defaultOperation = () => dispatch(CalendarOperations.defaultOperation());
  //
  //
  // return {
  //   defaultOperation
  // }
};

const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarComponent);

export default CalendarContainer;
