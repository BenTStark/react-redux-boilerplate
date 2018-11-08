import React, { Component } from "react";

export class HomeComponent extends Component {
  render() {
    return (
      <div>
        <p>State</p>
        <pre>{JSON.stringify(this.props.auth, null, 2)}</pre>
        <p>Local Storage</p>
        <pre>{JSON.stringify(window.localStorage, null, 2)}</pre>
      </div>
    );
  }
}

export default HomeComponent;
