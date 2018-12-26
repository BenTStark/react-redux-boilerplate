// optional for API requests
import ActionCreators from "./actions";
import * as emailjs from "emailjs-com";

// This is an example how a simple operation could look like:
const submitMessage = contactFormResult => {
  return ActionCreators.submitMessage(contactFormResult);
};

const sendMail = contactFormResult => {
  emailjs
    .send(
      process.env.EMAILJS_SERVICEID,
      process.env.EMAILJS_TEMPLATEID,
      {
        from_mail: contactFormResult.email,
        from_name: [
          contactFormResult.firstName,
          contactFormResult.lastName
        ].join(" "),
        message: contactFormResult.message
      },
      process.env.EMAILJS_USERID
    )
    .then(response => {
      console.log("Finish: ", response);
    });
};

export const ContactOperations = {
  submitMessage,
  sendMail
};
