import React, { Component, PropTypes } from "react";
//import { IndexLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
//import Helmet from 'react-helmet';
import * as AuthService from "./duck/auth";
// Ein Element aus der erikras repo
//import { InfoBar } from 'components';
import getRoutes from "../routes";

export class AppComponent extends Component {
  // static propTypes = {
  //   //children: PropTypes.object.isRequired,
  //   profile: PropTypes.object
  //   //accessToken: PropTypes.object
  //   //logout: PropTypes.func.isRequired,
  //   //pushState: PropTypes.func.isRequired
  // };

  // static contextTypes = {
  //   store: PropTypes.object.isRequired
  // };
  componentWillMount() {
    // Add callback for lock's `authenticated` event
    AuthService.lock.on("authenticated", authResult => {
      AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          //return this.props.loginError(error);
          return this.props.loginError();
        }
        AuthService.setToken(authResult.idToken, authResult.accessToken); // static method
        AuthService.setProfile(profile); // static method
        this.props.loginSuccess(profile, authResult.accessToken);
        this.props.push("/");
        AuthService.lock.hide();
      });
    });
    // Add callback for lock's `authorization_error` event
    AuthService.lock.on("authorization_error", error => {
      //this.props.loginError(error);
      this.props.loginError();
      this.props.push("/");
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
    this.props.push("/");
  };

  render() {
    //const {user} = this.props;
    const styles = require("./app.scss");

    return (
      <div className={styles.app}>
        {/* tbd: sieht nützlich aus, aber muss ich erst noch verstehen
          <Helmet {...config.app.head}/>*/}
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

// {user && (
//   <LinkContainer to="/chat">
//     <NavItem eventKey={1}>Chat</NavItem>
//   </LinkContainer>
// )}
// <LinkContainer to="/about">
//    <NavItem eventKey={5}>About Us</NavItem>
// </LinkContainer>

// {!this.props.auth.loginSuccess && <LinkContainer>// /*to="/login"*/>
//     <NavItem eventKey={6} onClick={this.handleLogin}>
//       Login
//     </NavItem>
//   </LinkContainer>
// }

// {this.props.auth.loginSuccess &&
//   <LinkContainer to="/">
//     <NavItem
//       eventKey={7}
//       className="logout-link"
//       onClick={this.handleLogout}
//     >
//       Logout
//     </NavItem>
//   </LinkContainer>
// }
