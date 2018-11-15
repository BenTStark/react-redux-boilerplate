// als Beispiel wie man mounten könnte:
// https://github.com/MacKentoch/react-redux-bootstrap-webpack-starter
import React from "react";
import NavigationComponent from "./navigation.component";
import NavigationContainer from "./navigation.container";
import configureStore from "redux-mock-store";
import toJson from "enzyme-to-json";
import MockAdapter from "axios-mock-adapter";
import { shallow } from "enzyme";

describe(">>> NavigationComponent - Snapshot", () => {
  it("+++capturing Snapshot of NavigationComponent", () => {
    const auth = {};
    auth.loginSuccess = true;
    auth.profile = { nickname: "John Doe" };
    // Shallow because lot of strange errors with mount
    const renderedValue = shallow(<NavigationComponent auth={auth} />);
    expect(toJson(renderedValue)).toMatchSnapshot();
  });
});

// Component Test
describe(">>> AppComponent --- Shallow Render React Components", () => {
  const wrapper = shallow(<NavigationComponent auth={{}} />);

  it("+++ render the COMPONENT", () => {
    expect(wrapper.length).toEqual(1);
  });
});


// Container Test
describe(">>> NavigationContainer --- REACT-REDUX (Shallow + passing the {store} directly)", () => {
  const initialState = {
    authReducer: {
      profile: null,
      accessToken: null,
      loginRequest: false,
      loginSuccess: false,
      loginError: false
    }
  };
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<NavigationContainer store={store} />);
  });

  it("+++ check Prop matches with initialState", () => {
    expect(container.prop("auth")).toEqual(initialState.authReducer);
  });
});
