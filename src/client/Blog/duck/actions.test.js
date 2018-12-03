import ActionCreators from "./actions";
import types from "./types";

describe(">>> Blog - Action Test", () => {
  // This is an example how a simple action test should look like:
  it("+++ getBlogArticles", () => {
    const articles = [
      { id: 1, content: "content" },
      { id: 2, content: "content" }
    ];
    expect(ActionCreators.getBlogArticles(articles)).toEqual({
      type: types.GET_BLOG_ARTICLES,
      articles: articles
    });
  });

  it("+++ createBlogArticle", () => {
    const article = { id: 1, content: "content" };
    expect(
      ActionCreators.createBlogArticle(article.id, article.content)
    ).toEqual({
      type: types.CREATE_BLOG_ARTICLE,
      articleId: article.id,
      article: article.content
    });
  });

  it("+++ deleteBlogArticle", () => {
    const articleId = 1;
    expect(ActionCreators.deleteBlogArticle(articleId)).toEqual({
      type: types.DELETE_BLOG_ARTICLE,
      articleId: articleId
    });
  });

  it("+++ setCurrentArticle", () => {
    const article = { id: 1, content: "content" };
    expect(ActionCreators.setCurrentArticle(article)).toEqual({
      type: types.SET_CURRENT_ARTICLE,
      article: article
    });
  });

  it("+++ clearCurrentArticle", () => {
    const articleId = 1;
    expect(ActionCreators.clearCurrentArticle()).toEqual({
      type: types.CLEAR_CURRENT_ARTICLE
    });
  });

  it("+++ editBlogArticle", () => {
    const articleId = 1;
    expect(ActionCreators.editBlogArticle(articleId)).toEqual({
      type: types.EDIT_BLOG_ARTICLE,
      articleId: articleId
    });
  });

  it("+++ finishEditBlogArticle", () => {
    const articleId = 1;
    expect(ActionCreators.finishEditBlogArticle(articleId)).toEqual({
      type: types.FINISH_EDIT_BLOG_ARTICLE,
      articleId: articleId
    });
  });

  it("+++ updateBlogArticle", () => {
    const article = { id: 1, content: "content" };
    expect(
      ActionCreators.updateBlogArticle(article.id, article.content)
    ).toEqual({
      type: types.UPDATE_BLOG_ARTICLE,
      articleId: article.id,
      article: article.content
    });
  });

  it("+++ updateEditorState", () => {
    const editorState = "editorState";
    expect(ActionCreators.updateEditorState(editorState)).toEqual({
      type: types.UPDATE_EDITOR_STATE,
      payload: editorState
    });
  });
});
