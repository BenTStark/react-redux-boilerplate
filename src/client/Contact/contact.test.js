import ContactComponent from "./contact.component";
// To Do: bei App Template wird das nicht genutzt (weils aber auch nur ein Component ist)
import ContactContainer from "./contact.container";
import { ContactOperations } from "./duck/operations";


import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import toJson from "enzyme-to-json";
import MockAdapter from "axios-mock-adapter";


// Snapshot for Contact React Component
describe(">>> ContactComponent - Snapshot", () => {
  it("+++capturing Snapshot of ContactComponent", () => {
    // To Do: bei App Template wird das nicht genutzt wird hier shallow genutzt!
    const renderedValue = mount(
      <ContactComponent  />
    );
    expect(toJson(renderedValue)).toMatchSnapshot();
  });
});

// // Component Test
// describe(">>> ContactComponent --- Shallow Render React Components", () => {
//   const wrapper = shallow(<ContactComponent auth={{}} home={{}} />);
//
//   it("+++ render the COMPONENT", () => {
//     expect(wrapper.length).toEqual(1);
//   });
// });
