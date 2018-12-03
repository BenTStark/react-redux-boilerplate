// optional for API requests
import ActionCreators from "./actions";

// This is an example how a simple operation could look like:
const submitMessage = contactFormResult =>
  ActionCreators.submitMessage(contactFormResult);

export const ContactOperations = {
  submitMessage
};
