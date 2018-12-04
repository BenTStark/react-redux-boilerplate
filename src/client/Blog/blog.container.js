import { connect } from "react-redux";
import BlogComponent from "./blog.component";
import { BlogOperations } from "./duck/operations";
import axios from "axios";
import _ from "lodash";
import moment from "moment";

const mapStateToProps = state => {
  return { blog: state.blogReducer };
};

const mapDispatchToProps = dispatch => {
  /* --------------------------------------------------------------------
  -- Dispatches
  -------------------------------------------------------------------- */
  const getBlogArticles = () =>
    axios.get(BlogOperations.getDataUrl).then(response => {
      dispatch(BlogOperations.getBlogArticles(response.data));
    });

  const createBlogArticle = () => {
    const now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const article = {
      title: "your title here",
      createdAt: now,
      modifiedAt: now,
      author: "your name here",
      text: "your text here",
      editMode: false,
      isNew: true
    };
    axios
      .post(BlogOperations.getDataUrl, { createdAt: now })
      .then(response => {
        const articleId = response.data.id;
        dispatch(BlogOperations.createBlogArticle(articleId, article));
        dispatch(BlogOperations.editBlogArticle(articleId));
        dispatch(BlogOperations.setCurrentArticle(article));
      })
      .catch(error => console.log("An error occurred:", error));
    return article;
  };

  const deleteBlogArticle = articleId => {
    axios
      .delete(BlogOperations.updateDataUrl(articleId))
      .then(response => {
        dispatch(BlogOperations.deleteBlogArticle(articleId));
        dispatch(BlogOperations.finishEditBlogArticle(articleId));
        dispatch(BlogOperations.clearCurrentArticle());
      })
      .catch(error => console.log("An error occurred:", error));
  };

  const setCurrentArticle = article =>
    dispatch(BlogOperations.setCurrentArticle(article));

  const editBlogArticle = id => dispatch(BlogOperations.editBlogArticle(id));

  const finishEditBlogArticle = articleId => {
    dispatch(BlogOperations.finishEditBlogArticle(articleId));
    dispatch(BlogOperations.clearCurrentArticle());
  };

  const updateBlogArticle = (articleId, article) => {
    axios
      .put(
        BlogOperations.updateDataUrl(articleId),
        _.omit(article, ["editMode", "isNew", "createdAt"])
      )
      .catch(error => console.log("An error occurred:", error));
    dispatch(BlogOperations.updateBlogArticle(articleId, article));
    dispatch(BlogOperations.finishEditBlogArticle(articleId));
    dispatch(BlogOperations.clearCurrentArticle());
  };

  // End Dispatches
  // --------------------------------------------------------------------

  return {
    getBlogArticles,
    createBlogArticle,
    deleteBlogArticle,
    setCurrentArticle,
    editBlogArticle,
    finishEditBlogArticle,
    updateBlogArticle
  };
};

const BlogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogComponent);

export default BlogContainer;
