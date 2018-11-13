import HomeComponent from "./home.component";
import HomeContainer from "./home.container";
import { HomeOperations } from "./duck/operations";
import types from "./duck/types";

import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import toJson from "enzyme-to-json";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Snapshot for Home React Component
describe(">>> HomeComponent - Snapshot", () => {
  it("+++capturing Snapshot of HomeComponent", () => {
    const renderedValue = shallow(
      <HomeComponent auth={{}} home={{}} />
    );
    expect(toJson(renderedValue)).toMatchSnapshot();
  });
});

// Component Test
describe(">>> HomeComponent --- Shallow Render React Components", () => {
  const wrapper = shallow(<HomeComponent auth={{}} home={{}} />);

  it("+++ render the COMPONENT", () => {
    expect(wrapper.length).toEqual(1);
  });
});

// Container Test
describe(">>> HomeContainer --- REACT-REDUX (Shallow + passing the {store} directly)", () => {
  const initialState = {
    authReducer: {
      profile: null,
      accessToken: null,
      loginRequest: false,
      loginSuccess: false,
      loginError: false
    },
    homeReducer: {
      payload: null,
      test: false
    }
  };
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<HomeContainer store={store} />);
  });

  it("+++ check Prop matches with initialState", () => {
    expect(container.prop("home")).toEqual(initialState.homeReducer);
    expect(container.prop("auth")).toEqual(initialState.authReducer);
  });

  describe(">>> Test Axios Request", () => {
    const mockData = { response: "content" };
    beforeEach(() => {
      const mock = new MockAdapter(axios);
      mock.onGet(HomeOperations.getDataUrl).reply(200, mockData);
      container
        .dive()
        .find("#axios")
        .simulate("click");
    });

    it("+++ Click Request Button", () => {
      expect(store.getActions()).toEqual([
        {
          type: types.GET_OBJECT,
          payload: mockData
        }
      ]);
    });
  });
});
