import ContactFormComponent from "./contact.component";
// To Do: bei App Template wird das nicht genutzt (weils aber auch nur ein Component ist)
import ContactFormContainer from "./contact.container";
import { ContactFormOperations } from "./duck/operations";


import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import toJson from "enzyme-to-json";
import MockAdapter from "axios-mock-adapter";


// Snapshot for ContactForm React Component
describe(">>> ContactFormComponent - Snapshot", () => {
  it("+++capturing Snapshot of ContactFormComponent", () => {
    // To Do: bei App Template wird das nicht genutzt wird hier shallow genutzt!
    const renderedValue = mount(
      <ContactFormComponent  />
    );
    expect(toJson(renderedValue)).toMatchSnapshot();
  });
});

// // Component Test
// describe(">>> ContactFormComponent --- Shallow Render React Components", () => {
//   const wrapper = shallow(<ContactFormComponent auth={{}} home={{}} />);
//
//   it("+++ render the COMPONENT", () => {
//     expect(wrapper.length).toEqual(1);
//   });
// });
