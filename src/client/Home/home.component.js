import React, { Component } from "react";

export class HomeComponent extends Component {

  render() {
    return (
      <div>
        <p>Auth State</p>
        <pre>{JSON.stringify(this.props.auth, null, 2)}</pre>
        <p>Home State</p>
        <button onClick={() => this.props.testAction()}>Test Action</button>
        <button onClick={() => this.props.getObj()}>Test Axios</button>
        <pre>{JSON.stringify(this.props.home, null, 2)}</pre>
        <p>Local Storage</p>
        <pre>{JSON.stringify(window.localStorage, null, 2)}</pre>
      </div>
    );
  }
}

export default HomeComponent;
