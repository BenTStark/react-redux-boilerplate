import { connect } from "react-redux";
import BlogComponent from "./blog.component";
import { BlogOperations } from "./duck/operations";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { EditorState, ContentState } from "draft-js";

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
    axios
      .post(BlogOperations.getDataUrl, { createdAt: now })
      .then(response => {
        console.log(
          "Well done, your post has been successfully created: ",
          response.data
        );
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });

    axios
      .get(BlogOperations.getDataUrl)
      .then(response => {
        const articleId = BlogOperations.maxId(
          response.data.map(element => element.id)
        );
        dispatch(
          BlogOperations.createBlogArticle(articleId, {
            title: "your title here",
            createdAt: now,
            modifiedAt: now,
            author: "your name here",
            text: "your text here",
            editMode: false,
            isNew: true
          })
        );
        dispatch(BlogOperations.editBlogArticle(articleId));
        dispatch(
          BlogOperations.setCurrentArticle({
            title: "your title here",
            createdAt: now,
            modifiedAt: now,
            author: "your name here",
            text: "your text here",
            editMode: false,
            isNew: true
          })
        );
        dispatch(
          BlogOperations.updateEditorState(
            EditorState.createWithContent(
              ContentState.createFromText(
                BlogOperations.buildEditorContent({
                  title: "your title here",
                  createdAt: now,
                  modifiedAt: now,
                  author: "your name here",
                  text: "your text here",
                  editMode: false,
                  isNew: true
                })
              )
            )
          )
        );
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
  };

  const deleteBlogArticle = articleId => {
    axios
      .delete(BlogOperations.updateDataUrl(articleId))
      .then(response => {
        console.log(
          "Well done, your post has been successfully deleted: ",
          response.data
        );
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
    dispatch(BlogOperations.deleteBlogArticle(articleId));
  };

  const setCurrentArticle = article =>
    dispatch(BlogOperations.setCurrentArticle(article));

  const clearCurrentArticle = () =>
    dispatch(BlogOperations.clearCurrentArticle());

  const editBlogArticle = id => dispatch(BlogOperations.editBlogArticle(id));

  const finishEditBlogArticle = articleId =>
    dispatch(BlogOperations.finishEditBlogArticle(articleId));

  const updateBlogArticle = (articleId, article) => {
    axios
      .put(
        BlogOperations.updateDataUrl(articleId),
        _.omit(article, ["editMode", "isNew", "createdAt"])
      )
      .then(response => {
        console.log(
          "Well done, your post has been successfully updated: ",
          response.data
        );
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
    dispatch(BlogOperations.updateBlogArticle(articleId, article));
  };

  const updateEditorState = editorState =>
    dispatch(BlogOperations.updateEditorState(editorState));
  // End Dispatches
  // --------------------------------------------------------------------

  return {
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
};

const BlogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogComponent);

export default BlogContainer;
