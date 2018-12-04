// optional for API requests
import ActionCreators from "./actions";
import _ from "lodash";
import moment from "moment";

const getDataUrl = "https://mirrorpi.ddns.net/cms/blogs";
const updateDataUrl = articleId =>
  `https://mirrorpi.ddns.net/cms/blogs/${articleId}`;

const getBlogArticles = articles => ActionCreators.getBlogArticles(articles);
const createBlogArticle = (articleId, article) => {
  return ActionCreators.createBlogArticle(articleId, article);
};
const deleteBlogArticle = articleId =>
  ActionCreators.deleteBlogArticle(articleId);
const setCurrentArticle = article => ActionCreators.setCurrentArticle(article);
const clearCurrentArticle = () => ActionCreators.clearCurrentArticle();
const editBlogArticle = articleId => ActionCreators.editBlogArticle(articleId);
const finishEditBlogArticle = articleId =>
  ActionCreators.finishEditBlogArticle(articleId);
const updateBlogArticle = (articleId, article) =>
  ActionCreators.updateBlogArticle(articleId, article);

const buildEditorContent = article => {
  return [
    ["title:", article.title + ","].join(" "),
    ["author:", article.author].join(" "),
    "~~~",
    article.text
  ].join("\r\n");
};
const buildArticleObject = plainText => {
  // Search for these regex in plainText to find the respective values
  const keys = [
    { key: "author", regex: /author/ },
    { key: "title", regex: /title/ }
  ];
  // target object should have keys for the article object in BlogComponent
  const result = {};
  const arr = plainText.split("~~~");
  arr[0].split(",").forEach(element => {
    keys.forEach(key => {
      if (key.regex.test(element.split(":")[0])) {
        result[key.key] = element.split(":")[1].trim();
      }
    });
  });
  // Remove \r \n
  result.text = arr[1].substring(1);
  result.isNew = false;
  return result;
};

const maxId = array => {
  return array.length ? Math.max(...array) : 1;
};

const sortBlogArticle = (a, b, articles) => {
  if (
    _.gt(
      moment.utc(articles[a].createdAt).unix(),
      moment.utc(articles[b].createdAt).unix()
    )
  ) {
    return -1;
  }
  if (
    _.lt(
      moment.utc(articles[a].createdAt).unix(),
      moment.utc(articles[b].createdAt).unix()
    )
  ) {
    return 1;
  }
  return 0;
};

export const BlogOperations = {
  getBlogArticles,
  getDataUrl,
  updateDataUrl,
  createBlogArticle,
  deleteBlogArticle,
  setCurrentArticle,
  clearCurrentArticle,
  editBlogArticle,
  finishEditBlogArticle,
  updateBlogArticle,
  buildEditorContent,
  buildArticleObject,
  maxId,
  sortBlogArticle
};
