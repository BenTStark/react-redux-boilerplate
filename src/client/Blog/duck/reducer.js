import { EditorState } from "draft-js";
import types from "./types";
import _ from "lodash";
import moment from "moment";

const initialState = {
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

function getBlogArticles(state, articles) {
  const ids = articles.map(article => {
    return article.id;
  });
  const newArticles = {};
  articles.forEach(article => {
    newArticles[article.id] = {
      title: article.title,
      createdAt: article.createdAt,
      modifiedAt: article.modifiedAt,
      author: article.author,
      text: article.text,
      editMode: false,
      isNew: false
    };
  });
  return {
    ...state,
    byId: state.byId.concat(ids.filter(id => !state.byId.includes(id))),
    byHash: {
      ...state.byHash,
      ...newArticles
    }
  };
}

function createBlogArticle(state, articleId, article) {
  return {
    ...state,
    byId: [...state.byId, articleId],
    byHash: {
      ...state.byHash,
      [articleId]: { ...article, isNew: true }
    }
  };
}

function deleteBlogArticle(state, id) {
  return {
    ...state,
    byId: state.byId.filter(existingId => existingId !== id),
    byHash: _.omit(state.byHash, [id])
  };
}

function setCurrentArticle(state, article) {
  return {
    ...state,
    currentArticle: article
  };
}

function clearCurrentArticle(state) {
  return {
    ...state,
    currentArticle: state.currentArticle
  };
}

function editBlogArticle(state, id) {
  return {
    ...state,
    byHash: {
      ...state.byHash,
      [id]: {
        ...state.byHash[id],
        editMode: true
      }
    }
  };
}

function finishEditBlogArticle(state, id) {
  return {
    ...state,
    byHash: {
      ...state.byHash,
      [id]: {
        ...state.byHash[id],
        editMode: false
      }
    }
  };
}

function updateBlogArticle(state, articleId, article) {
  return {
    ...state,
    byHash: {
      ...state.byHash,
      [articleId]: article
    }
  };
}

function updateEditorState(state, payload) {
  return {
    ...state,
    editorState: payload
  };
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BLOG_ARTICLES:
      return getBlogArticles(state, action.articles);
    case types.CREATE_BLOG_ARTICLE:
      return createBlogArticle(state, action.articleId, action.article);
    case types.DELETE_BLOG_ARTICLE:
      return deleteBlogArticle(state, action.articleId);
    case types.SET_CURRENT_ARTICLE:
      return setCurrentArticle(state, action.article);
    case types.CLEAR_CURRENT_ARTICLE:
      return clearCurrentArticle(state);
    case types.EDIT_BLOG_ARTICLE:
      return editBlogArticle(state, action.articleId);
    case types.FINISH_EDIT_BLOG_ARTICLE:
      return finishEditBlogArticle(state, action.articleId);
    case types.UPDATE_BLOG_ARTICLE:
      return updateBlogArticle(state, action.articleId, action.article);
    case types.UPDATE_EDITOR_STATE:
      return updateEditorState(state, action.payload);
    default:
      return state;
  }
};

export default blogReducer;
