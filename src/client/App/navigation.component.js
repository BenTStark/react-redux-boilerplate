import React, { Component } from "react";
import { object } from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import { AppOperations } from "./duck/operations";
import styles from "./app.scss";
import types from "./duck/types";
import LoginComponent from "./login.component";
import { Switch } from "@blueprintjs/core";

export default class NavigationComponent extends Component {
  static propTypes = {
    auth: object.isRequired
  };

  componentWillMount() {
    // Check for credentials in window.localStorage
    AppOperations.checkLogin().then(response => {
      console.log(response);
      if (response.result === types.LOGIN_SUCCESS) {
        this.props.loginSuccess(response.payload);
      }
    });
    // check Auth0 for credentials
    AppOperations.authentication().then(response => {
      console.log(response);
      switch (response.result) {
        case types.LOGIN_SUCCESS:
          this.props.loginSuccess(response.payload);
          this.props.pushHistory("/");
        case types.LOGIN_ERROR:
          this.props.loginError();
          this.props.pushHistory("/");
      }
    });
  }

  handleLogin = () => {
    AppOperations.handleLogin();
    this.props.loginRequest();
  };

  handleCustomLogin = loginInformation => {
    AppOperations.handleCustomLogin(
      loginInformation.login,
      loginInformation.password
    );
  };

  handleLogout = () => {
    this.props.logout();
    AppOperations.handleLogout(); // careful, this is a static method
    this.props.pushHistory("/");
  };

  handleCustomLogout = () => {
    AppOperations.handleCustomLogout();
  };

  handlePublicChange = () => {
    this.props.toogleLoginMethod();
  };

  render() {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer to="/" className={styles.title}>
                <div>
                  <span>React-Redux-Boilerplate</span>
                </div>
              </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            {!this.props.auth.loginSuccess && (
              <Switch
                checked={this.props.auth.useLock}
                label="Benutze Auth0 Lock"
                onChange={this.handlePublicChange}
              />
            )}
            <Nav navbar>
              {!this.props.auth.loginSuccess &&
                this.props.auth.useLock && (
                  <NavItem onClick={this.handleLogin}>Login Lock</NavItem>
                )}
              {!this.props.auth.loginSuccess &&
                !this.props.auth.useLock && (
                  <LoginComponent onSubmit={this.handleCustomLogin} />
                )}
              {this.props.auth.loginSuccess &&
                this.props.auth.useLock && (
                  <NavItem onClick={this.handleLogout}>Logout Lock</NavItem>
                )}
              {this.props.auth.loginSuccess &&
                !this.props.auth.useLock && (
                  <NavItem onClick={this.handleCustomLogout}>
                    Logout Custom
                  </NavItem>
                )}

              <LinkContainer to="/otherRoute">
                <NavItem>Other Route</NavItem>
              </LinkContainer>
              <LinkContainer to="/blog">
                <NavItem>Blog</NavItem>
              </LinkContainer>
              <LinkContainer to="/contact">
                <NavItem>Contact</NavItem>
              </LinkContainer>
              <LinkContainer to="/calendar">
                <NavItem>Calendar</NavItem>
              </LinkContainer>
            </Nav>
            {this.props.auth.loginSuccess && (
              <p className="navbar-text">
                Logged in as <strong>{this.props.auth.profile.nickname}</strong>.
              </p>
            )}
            <Nav navbar pullRight>
              <NavItem
                target="_blank"
                title="View on Github"
                href="https://github.com/BenTStark/react-redux-boilerplate"
              >
                <i className="fa fa-github" />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
