// App Test erstmal wie Home. Evtl. mit dieser Seite
// als Beispiel:
// https://github.com/MacKentoch/react-redux-bootstrap-webpack-starter
// Trennung von NavBar, Footer, Routes und dann entsprechend Testen

import AppComponent from "./app.component";

import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe(">>> App", () => {
  it("+++Fake Test", () => {});
  const auth = {};
  auth.loginSuccess = true;
  auth.profile = { nickname: "John Doe" };
  const renderedValue = shallow(<AppComponent auth={auth} />);
  expect(toJson(renderedValue)).toMatchSnapshot();
});

// todo... Test wie bei HomeComponent
