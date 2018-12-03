import blogReducer from "./reducer";
import types from "./types";
import { EditorState } from "draft-js";
import moment from "moment";
import _ from "lodash";

const now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
let article = {
  id: 99,
  title: "your title here",
  createdAt: now,
  modifiedAt: now,
  author: "your name here",
  text: "your text here",
  editMode: false,
  isNew: false
};

let initialStateBase = {
  byId: [],
  byHash: {},
  editorState: EditorState.createEmpty(),
  currentArticle: {
    title: null,
    createdAt: null,
    modifiedAt: null,
    author: null,
    text: null,
    editMode: false,
    isNew: false
  }
};

let expectedStateBase = {
  ...initialStateBase,
  byId: [article.id],
  byHash: {
    [article.id]: {
      ..._.omit(article, ["id"]),
      editMode: false,
      isNew: false
    }
  }
};

let state = {};

describe(">>>>>> Blog - Reducer Test", () => {
  it("+++ reducer for GET_BLOG_ARTICLES", () => {
    // This must be as close as possible to reducer function due to the timestmap
    const now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    article.createdAt = now;
    article.modifiedAt = now;
    let state = blogReducer(initialStateBase, {
      type: types.GET_BLOG_ARTICLES,
      articles: [article]
    });
    expect(state).toEqual(expectedStateBase);
  });

  it("+++ reducer for CREATE_BLOG_ARTICLE", () => {
    // This must be as close as possible to reducer function due to the timestmap
    const now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    article.createdAt = now;
    article.modifiedAt = now;
    let expectedState = {
      ...expectedStateBase,
      byHash: {
        [article.id]: {
          ...expectedStateBase.byHash[article.id],
          isNew: true
        }
      }
    };
    let state = blogReducer(initialStateBase, {
      type: types.CREATE_BLOG_ARTICLE,
      articleId: article.id,
      article: _.omit(article, ["id"])
    });
    expect(state).toEqual(expectedState);
  });

  it("+++ reducer for DELETE_BLOG_ARTICLE", () => {
    // This must be as close as possible to reducer function due to the timestmap
    const now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    article.createdAt = now;
    article.modifiedAt = now;
    let state = blogReducer(expectedStateBase, {
      type: types.DELETE_BLOG_ARTICLE,
      articleId: article.id
    });
    expect(state).toEqual(initialStateBase);
  });

  it("+++ reducer for SET_CURRENT_ARTICLE", () => {
    // This must be as close as possible to reducer function due to the timestmap
    const now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    article.createdAt = now;
    article.modifiedAt = now;
    let expectedState = {
      ...expectedStateBase,
      currentArticle: {
        ..._.omit(article, ["id"])
      }
    };
    let state = blogReducer(expectedStateBase, {
      type: types.SET_CURRENT_ARTICLE,
      article: _.omit(article, ["id"])
    });
    expect(state).toEqual(expectedState);
  });

  it("+++ reducer for EDIT_BLOG_ARTICLE", () => {
    const now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    article.createdAt = now;
    article.modifiedAt = now;
    let initalState = expectedStateBase;
    let expectedState = {
      ...expectedStateBase,
      byHash: {
        [article.id]: {
          ...expectedStateBase.byHash[article.id],
          editMode: true
        }
      }
    };
    let state = blogReducer(initalState, {
      type: types.EDIT_BLOG_ARTICLE,
      articleId: article.id
    });
    expect(state).toEqual(expectedState);
  });

  it("+++ reducer for FINISH_EDIT_BLOG_ARTICLE", () => {
    let initalState = {
      ...expectedStateBase,
      byHash: {
        [article.id]: {
          ...expectedStateBase.byHash[article.id],
          editMode: true
        }
      }
    };
    let expectedState = expectedStateBase;
    let state = blogReducer(initalState, {
      type: types.FINISH_EDIT_BLOG_ARTICLE,
      articleId: article.id
    });
    expect(state).toEqual(expectedState);
  });

  it("+++ reducer for UPDATE_BLOG_ARTICLE", () => {
    article.text = "new";
    let initalState = expectedStateBase;
    let expectedState = {
      ...expectedStateBase,
      byHash: {
        [article.id]: {
          ...expectedStateBase.byHash[article.id],
          text: article.text
        }
      }
    };
    let state = blogReducer(initalState, {
      type: types.UPDATE_BLOG_ARTICLE,
      articleId: article.id,
      article: _.omit(article, ["id"])
    });
    expect(state).toEqual(expectedState);
  });

  it("+++ reducer for UPDATE_EDITOR_STATE", () => {
    let payload = EditorState.createEmpty();
    let initalState = expectedStateBase;
    let expectedState = { ...expectedStateBase, editorState: payload };
    let state = blogReducer(initalState, {
      type: types.UPDATE_EDITOR_STATE,
      payload: payload
    });
    expect(state).toEqual(expectedState);
  });
});
