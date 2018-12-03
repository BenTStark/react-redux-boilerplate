import React, { Component } from "react";
import ContactFormComponent from "./contactForm.component";
import { object } from "prop-types";
import { ContactOperations } from "./duck/operations";

import styles from "./contact.scss";

export default class ContactComponent extends Component {
  submitMessage = contactFormResult => {
    const id = array => {
      return array.length ? Math.max(...array) : 0;
    };
    contactFormResult.id = id(this.props.contact.byId) + 1;
    this.props.submitMessage(contactFormResult);
  };

  render() {
    return (
      <div>
        <ContactFormComponent onSubmit={this.submitMessage} name="BenTStark" />
      </div>
    );
  }
}
