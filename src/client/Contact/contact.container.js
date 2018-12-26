import { connect } from "react-redux";
import ContactComponent from "./contact.component";
import { ContactOperations } from "./duck/operations";
//import axios from "axios";

const mapStateToProps = state => {
  return { contact: state.contactReducer };
};

const mapDispatchToProps = dispatch => {
  const submitMessage = contactFormResult => {
    dispatch(ContactOperations.submitMessage(contactFormResult));
  };
  return {
    submitMessage
  };
};

const ContactContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactComponent);

export default ContactContainer;
