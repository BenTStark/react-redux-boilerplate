import React, { Component } from "react";
import { object } from "prop-types";
import { EditorState, ContentState } from "draft-js";
import styles from "./blog.scss";
import { BlogOperations } from "./duck/operations";
import _ from "lodash";
import moment from "moment";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import BlogEditor from "./editor.component";

export default class BlogComponent extends Component {
  constructor(props) {
    super();
    this.state = { edit: false, editorState: EditorState.createEmpty() };
  }

  componentWillMount() {
    this.props.getBlogArticles();
  }

  sortBlogArticle = (a, b) => {
    return BlogOperations.sortBlogArticle(a, b, this.props.blog.byHash);
  };

  handleEdit = articleId => {
    // Set State
    this.setState({ edit: true });
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromText(
          BlogOperations.buildEditorContent(this.props.blog.byHash[articleId])
        )
      )
    });
    // update Store
    this.props.setCurrentArticle(this.props.blog.byHash[articleId]);
    this.props.editBlogArticle(articleId);
  };

  handleAdd = () => {
    // update Store
    let article = this.props.createBlogArticle();
    // set state from updated Store!!!
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromText(BlogOperations.buildEditorContent(article))
      )
    });
  };

  handleSave = articleId => {
    // article already exists and will be updated
    const article = this.props.blog.byHash[articleId];
    _.merge(
      article,
      BlogOperations.buildArticleObject(
        this.state.editorState.getCurrentContent().getPlainText()
      )
    );
    // strapi CMS (with mySQL implementation) needs this format
    article.modifiedAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    // Set State
    this.setState({ edit: false });
    this.setState({
      editorState: EditorState.createEmpty()
    });
    // update Store
    this.props.updateBlogArticle(articleId, article);
  };

  handleDelete = articleId => {
    // Set State
    this.setState({ edit: false });

    this.props.deleteBlogArticle(articleId);
  };

  handleCancel = articleId => {
    // Set State
    this.setState({ edit: false });
    this.setState({
      editorState: EditorState.createEmpty()
    });

    if (this.props.blog.byHash[articleId].isNew) {
      this.props.deleteBlogArticle(articleId);
    } else {
      this.props.finishEditBlogArticle(articleId);
    }
  };

  handleOnChange = editorState => {
    // Set State
    this.setState({
      editorState: editorState
    });
    // prepare parameter
    const article = this.props.blog.currentArticle;
    _.merge(
      article,
      BlogOperations.buildArticleObject(
        editorState.getCurrentContent().getPlainText()
      )
    );
    article.modifiedAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    // update Store
    this.props.setCurrentArticle(article);
  };

  render() {
    return (
      <div className={styles.blog}>
        <div>
          <h1>Blog</h1>
          <button
            type="button"
            onClick={() => this.handleAdd()}
            disabled={this.state.edit}
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => this.handleTest()}
            disabled={this.state.edit}
          >
            Test
          </button>
          {this.props.blog.byId
            .sort((a, b) => this.sortBlogArticle(a, b))
            .map(articleId => (
              <div key={articleId}>
                {/*Show Blog article*/}
                {!this.props.blog.byHash[articleId].editMode && (
                  <div>
                    <h2>{this.props.blog.byHash[articleId].title}</h2>
                    <span>by {this.props.blog.byHash[articleId].author}</span>
                    <button
                      type="button"
                      onClick={() => this.handleEdit(articleId)}
                      disabled={this.state.edit}
                    >
                      Edit
                    </button>
                    <ReactMarkdown
                      source={this.props.blog.byHash[articleId].text}
                    />
                  </div>
                )}
                {/*Show Editor*/}
                {this.props.blog.byHash[articleId].editMode && (
                  <div>
                    <BlogEditor
                      editorState={this.state.editorState}
                      onChange={this.handleOnChange}
                      author={this.props.blog.currentArticle.author}
                      title={this.props.blog.currentArticle.title}
                      source={this.props.blog.currentArticle.text}
                    />
                    <button
                      type="button"
                      onClick={() => this.handleSave(articleId)}
                    >
                      Save
                    </button>
                    {!this.props.blog.byHash[articleId].isNew && (
                      <button
                        type="button"
                        onClick={() => this.handleDelete(articleId)}
                      >
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => this.handleCancel(articleId)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

/*
<div className={styles.row}>
  <div className={styles.col}>
    <Editor
      editorState={this.props.blog.editorState}
      onChange={this.handleOnChange}
    />
  </div>
  <div className={styles.col}>
    <h2>{this.props.blog.currentArticle.title}</h2>
    <span>by {this.props.blog.currentArticle.author}</span>
    <ReactMarkdown
      source={this.props.blog.currentArticle.text}
    />
  </div>
</div>
*/
