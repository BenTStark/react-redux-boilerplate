import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { object } from "prop-types";

let LoginComponent = props => {
  return (
    <div>
      <Form
        onSubmit={props.onSubmit}
        render={({ handleSubmit, pristine, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="login"
                component="input"
                type="text"
                placeholder="Email, UserId"
              />
            </div>
            <div>
              <Field name="password" component="input" type="password" />
            </div>
            <button type="submit" disabled={pristine || submitting}>
              Login
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default LoginComponent;
