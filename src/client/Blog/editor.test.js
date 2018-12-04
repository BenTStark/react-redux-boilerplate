import React from "react";
import BlogEditor from "./editor.component";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { EditorState } from "draft-js";

//Snapshot for BlogEditor React Component
describe(">>> BlogEditor - Snapshot", () => {
  it("+++capturing Snapshot of BlogEditor", () => {
    const renderedValue = mount(
      <BlogEditor
        editorState={EditorState.createEmpty()}
        onChange={jest.fn()}
        author={"author"}
        title={"title"}
        source={"text"}
      />
    );
    expect(toJson(renderedValue)).toMatchSnapshot();
  });
});

// Component Test
describe(">>> BlogEditor --- Shallow Render React Components", () => {
  const wrapper = shallow(
    <BlogEditor
      editorState={EditorState.createEmpty()}
      onChange={jest.fn()}
      author={"author"}
      title={"title"}
      source={"text"}
    />
  );

  it("+++ render the COMPONENT", () => {
    expect(wrapper.length).toEqual(1);
  });
});
