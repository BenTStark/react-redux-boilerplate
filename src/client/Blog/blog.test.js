import BlogComponent from "./blog.component";
// To Do: bei App Template wird das nicht genutzt (weils aber auch nur ein Component ist)
import BlogContainer from "./blog.container";
import { BlogOperations } from "./duck/operations";

import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import toJson from "enzyme-to-json";
import MockAdapter from "axios-mock-adapter";

const blogProps = {
  byId: [1],
  byHash: {
    "1": {
      title: "title",
      createdAt: "1970.01.01",
      modifiedAt: "1970.01.01",
      author: "author",
      text: "text",
      editMode: false
    }
  }
};
const mockGetBlogArticlesfn = jest.fn(() => {
  return [
    {
      id: 2,
      title: "title",
      createdAt: "1970-01-01",
      modifiedAt: "1970-01-01",
      author: "author",
      text: "text"
    }
  ];
});

//Snapshot for Blog React Component
describe(">>> BlogComponent - Snapshot", () => {
  it("+++capturing Snapshot of BlogComponent", () => {
    // To Do: bei App Template wird das nicht genutzt wird hier shallow genutzt!
    const renderedValue = mount(
      <BlogComponent blog={blogProps} getBlogArticles={mockGetBlogArticlesfn} />
    );
    expect(toJson(renderedValue)).toMatchSnapshot();
  });
});

// Component Test
describe(">>> BlogComponent --- Shallow Render React Components", () => {
  const wrapper = shallow(
    <BlogComponent blog={blogProps} getBlogArticles={mockGetBlogArticlesfn} />
  );

  it("+++ render the COMPONENT", () => {
    expect(wrapper.length).toEqual(1);
  });
  it("+++ getBlogArticles Function working", () => {
    expect(mockGetBlogArticlesfn.mock.calls.length).toBeGreaterThan(1);
  });
});

// Container Test
describe(">>> BlogContainer --- REACT-REDUX (Shallow + passing the {store} directly)", () => {
  const initialState = {
    blogReducer: blogProps
  };
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(
      <BlogContainer store={store} getBlogArticles={mockGetBlogArticlesfn} />
    );
  });

  it("+++ check Prop matches with initialState", () => {
    expect(container.prop("blog")).toEqual(initialState.blogReducer);
  });
});
