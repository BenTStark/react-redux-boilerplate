import CalendarComponent from "./calendar.component";
// To Do: bei App Template wird das nicht genutzt (weils aber auch nur ein Component ist)
import CalendarContainer from "./calendar.container";
import { CalendarOperations } from "./duck/operations";


import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import toJson from "enzyme-to-json";
import MockAdapter from "axios-mock-adapter";


// Snapshot for Calendar React Component
describe(">>> CalendarComponent - Snapshot", () => {
  it("+++capturing Snapshot of CalendarComponent", () => {
    // To Do: bei App Template wird das nicht genutzt wird hier shallow genutzt!
    const renderedValue = mount(
      <CalendarComponent calendar={{}} />
    );
    expect(toJson(renderedValue)).toMatchSnapshot();
  });
});

// Component Test
describe(">>> CalendarComponent --- Shallow Render React Components", () => {
  const wrapper = shallow(<CalendarComponent auth={{}} home={{}} />);

  it("+++ render the COMPONENT", () => {
    expect(wrapper.length).toEqual(1);
  });
});


// Container Test
describe(">>> CalendarContainer --- REACT-REDUX (Shallow + passing the {store} directly)", () => {
  const initialState = {
    calendarReducer: {
      value: null
    }
  };
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<CalendarContainer store={store} />);
  });

  it("+++ check Prop matches with initialState", () => {
    expect(container.prop("calendar")).toEqual(initialState.calendarReducer);
    
  });

  
});

