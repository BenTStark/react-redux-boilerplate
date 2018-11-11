import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import HomeComponent from "./home.component";
import HomeContainer from "./home.container";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

// Snapshot for Home React Component
describe(">>> HomeComponent - Snapshot", () => {
  it("+++capturing Snapshot of HomeComponent", () => {
    const renderedValue = renderer.create(<HomeComponent />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

// Component Test
describe(">>> HomeComponent --- Shallow Render React Components", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomeComponent />);
  });

  it("+++ render the COMPONENT", () => {
    expect(wrapper.length).toEqual(1);
  });
});

// Container Test
describe(">>> HomeContainer --- REACT-REDUX (Shallow + passing the {store} directly)", () => {
  const initialState = {
    payload: null,
    test: false
  };
  const mockStore = configureStore();
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    console.log(store.getState());
    wrapper = mount(
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    );
  });

  it("+++ render the connected(SMART) component", () => {
    console.log(JSON.stringify(wrapper.find()));
    expect(wrapper.find(HomeContainer).length).toEqual(1);
  });

  it("+++ check Prop matches with initialState", () => {
    console.log(wrapper.find(HomeContainer).prop());
    expect(wrapper.find(HomeComponent).prop("home")).toEqual(initialState);
  });

  // it('+++ check action on dispatching ', () => {
  //     let action
  //     store.dispatch(addInputs(500))
  //     store.dispatch(subtractInputs(100))
  //     action = store.getActions()
  //     expect(action[0].type).toBe("ADD_INPUTS")
  //     expect(action[1].type).toBe("SUBTRACT_INPUTS")
  // });
});

//---------------------------
// describe(">>> HomeContainer --- REACT-REDUX (Shallow + passing the {store} directly)", () => {
//   const initialState = {
//     payload: null,
//     test: false
//   };
//   const mockStore = configureStore();
//   let store, container;
//
//   beforeEach(() => {
//     store = mockStore(initialState);
//     container = shallow(<HomeContainer store={store} />);
//   });
//
//   it("+++ render the CONTAINER", () => {
//     expect(container.length).toEqual(1);
//   });
//
//   it("+++ check Prop matches with initialState", () => {
//     console.log(container.prop("home"));
//     expect(container.prop("home")).toEqual(initialState);
//   });
// });
