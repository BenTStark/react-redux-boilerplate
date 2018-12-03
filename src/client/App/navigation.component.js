import React, { Component } from "react";
import { object } from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import { AppOperations } from "./duck/operations";
import styles from "./app.scss";
import types from "./duck/types";

export default class NavigationComponent extends Component {
  static propTypes = {
    auth: object.isRequired
  };

  componentWillMount() {
    // Check for credentials in window.localStorage
    AppOperations.checkLogin().then(response => {
      if (response.result === types.LOGIN_SUCCESS) {
        this.props.loginSuccess(response.payload);
      }
    });
    // check Auth0 for credentials
    AppOperations.authentication().then(response => {
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
    //event.preventDefault();
    AppOperations.handleLogin();
    this.props.loginRequest();
  };

  handleLogout = () => {
    //event.preventDefault();
    this.props.logout();
    AppOperations.handleLogout(); // careful, this is a static method
    this.props.pushHistory("/");
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
            <Nav navbar>
              {!this.props.auth.loginSuccess && (
                <NavItem onClick={this.handleLogin}>Login</NavItem>
              )}
              {this.props.auth.loginSuccess && (
                <NavItem onClick={this.handleLogout}>Logout</NavItem>
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
