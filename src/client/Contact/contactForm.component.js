import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { object } from "prop-types";

// const onSubmit = values => {
//   window.alert(JSON.stringify(values, 0, 2));
// };

let ContactFormComponent = props => {
  return (
    <div>
      <div>
        hallo {props.name}. hier sind die Props: {JSON.stringify(props, 0, 4)}
      </div>
      <Form
        onSubmit={props.onSubmit}
        render={({ handleSubmit, pristine, reset, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">Vorname</label>
              <Field name="firstName" component="input" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">Nachname</label>
              <Field name="lastName" component="input" type="text" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" component="input" type="email" />
            </div>
            <div>
              <label htmlFor="message">Nachricht</label>
              <Field name="message" component="input" type="text" />
            </div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
            <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default ContactFormComponent;

//export default ContactFormComponent;
