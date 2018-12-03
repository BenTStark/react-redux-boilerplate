import types from "./types";

// Actions should not do any change to the value they pass to the store.
// Any value treatment should happen before in operations.js!
// This is an example how an action should look like:
const getBlogArticles = articles => {
  return {
    type: types.GET_BLOG_ARTICLES,
    articles: articles
  };
};

const createBlogArticle = (articleId, article) => {
  return {
    type: types.CREATE_BLOG_ARTICLE,
    articleId: articleId,
    article: article
  };
};

const deleteBlogArticle = articleId => {
  return {
    type: types.DELETE_BLOG_ARTICLE,
    articleId: articleId
  };
};

const setCurrentArticle = article => {
  return {
    type: types.SET_CURRENT_ARTICLE,
    article: article
  };
};

const clearCurrentArticle = () => {
  return {
    type: types.CLEAR_CURRENT_ARTICLE
  };
};

const editBlogArticle = articleId => {
  return {
    type: types.EDIT_BLOG_ARTICLE,
    articleId: articleId
  };
};

const finishEditBlogArticle = articleId => {
  return {
    type: types.FINISH_EDIT_BLOG_ARTICLE,
    articleId: articleId
  };
};

const updateBlogArticle = (articleId, article) => {
  return {
    type: types.UPDATE_BLOG_ARTICLE,
    articleId: articleId,
    article: article
  };
};

const updateEditorState = editorState => {
  return {
    type: types.UPDATE_EDITOR_STATE,
    payload: editorState
  };
};

export default {
  getBlogArticles,
  createBlogArticle,
  deleteBlogArticle,
  setCurrentArticle,
  clearCurrentArticle,
  editBlogArticle,
  finishEditBlogArticle,
  updateBlogArticle,
  updateEditorState
};
