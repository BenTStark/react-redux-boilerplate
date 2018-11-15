import React, { Component } from "react";
import getRoutes from "../routes";
import styles from "./app.scss";
import NavigationContainer from "./navigation.container";

export default class AppComponent extends Component {
  render() {
    return (
      <div className={styles.app}>
        <NavigationContainer />
        {getRoutes()}
        <div>Footer</div>
      </div>
    );
  }
}
