import React, { Component } from "react";
import { object } from "prop-types";
import styles from "./home.scss";

export default class HomeComponent extends Component {
  static propTypes = {
    auth: object.isRequired,
    home: object.isRequired
  };

  render() {
    return (
      <div className={styles.base}>
        <p>Auth State</p>
        <pre>{JSON.stringify(this.props.auth, null, 2)}</pre>
        <p>Home State</p>
        <button onClick={() => this.props.testAction()}>Test Action</button>
        <button id="axios" onClick={() => this.props.getObj()}>
          Test Axios
        </button>
        <pre>{JSON.stringify(this.props.home, null, 2)}</pre>
        <p>Contact State</p>
        <pre>{JSON.stringify(this.props.contact, null, 2)}</pre>
        <p>Local Storage</p>
        <pre>{JSON.stringify(window.localStorage, null, 2)}</pre>
        <p>Environment</p>
        <p>{process.env.EMAILJS_USERID}</p>
        <p>{process.env.EMAILJS_TEMPLATEID}</p>
      </div>
    );
  }
}

//export default HomeComponent;
