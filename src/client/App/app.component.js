import React, { Component, PropTypes } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import AuthService from "./duck/auth";
import getRoutes from "../routes";

export class AppComponent extends Component {
  componentWillMount() {
    const authInformation = {};
    // Check for credentials in window.localStorage
    if (AuthService.loggedIn()) {
      authInformation.profile = AuthService.getProfile();
      authInformation.accessToken = AuthService.getAccessToken();

      this.props.loginSuccess(authInformation);
    }

    // Add callback for lock's `authenticated` event
    AuthService.lock.on("authenticated", authResult => {
      console.log(authResult);
      AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return this.props.loginError();
        }
        AuthService.setToken(authResult.idToken, authResult.accessToken); // static method
        AuthService.setProfile(profile); // static method

        authInformation.profile = profile;
        authInformation.accessToken = authResult.accessToken;

        this.props.loginSuccess(authInformation);
        this.props.pushHistory("/");
        AuthService.lock.hide();
      });
    });
    // Add callback for lock's `authorization_error` event
    AuthService.lock.on("authorization_error", error => {
      //this.props.loginError(error);
      this.props.loginError();
      this.props.pushHistory("/");
    });
  }

  handleLogin = () => {
    //event.preventDefault();
    AuthService.login();
    this.props.loginRequest();
  };

  handleLogout = () => {
    //event.preventDefault();
    this.props.logout();
    AuthService.logout(); // careful, this is a static method
    this.props.pushHistory("/");
  };

  render() {
    const styles = require("./app.scss");

    return (
      <div className={styles.app}>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer to="/" activeStyle={{ color: "#ffffff" }}>
                <div className={styles.brand}>
                  <span>React-Redux-Boilerplate</span>
                </div>
              </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav navbar>
              {!this.props.auth.loginSuccess && (
                <NavItem onClick={this.handleLogin}>Login</NavItem>
              )}
              {this.props.auth.loginSuccess && (
                <NavItem onClick={this.handleLogout}>Logout</NavItem>
              )}
              <LinkContainer to="/callback">
                <NavItem>Callback</NavItem>
              </LinkContainer>
              <LinkContainer to="/test">
                <NavItem>Test</NavItem>
              </LinkContainer>
            </Nav>
            {this.props.auth.loginSuccess && (
              <p className={styles.loggedInMessage + " navbar-text"}>
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
        {getRoutes()}
        <div>Footer</div>
      </div>
    );
  }
}

export default AppComponent;
