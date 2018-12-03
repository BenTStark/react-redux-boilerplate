import React, { Component } from "react";
import { object } from "prop-types";
import { Editor, EditorState, ContentState } from "draft-js";
import styles from "./blog.scss";
import { BlogOperations } from "./duck/operations";
import _ from "lodash";
import moment from "moment";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

export default class BlogComponent extends Component {
  constructor(props) {
    super();
    this.state = { edit: false };
  }

  componentWillMount() {
    this.props.getBlogArticles();
  }

  sortBlogArticle = (a, b) => {
    return BlogOperations.sortBlogArticle(a, b, this.props.blog.byHash);
  };

  handleEdit = articleId => {
    this.setState({ edit: true });
    this.props.editBlogArticle(articleId);
    // in container start
    this.props.setCurrentArticle(this.props.blog.byHash[articleId]);
    this.props.updateEditorState(
      EditorState.createWithContent(
        ContentState.createFromText(
          BlogOperations.buildEditorContent(this.props.blog.byHash[articleId])
        )
      )
    );
    //in container ende
  };

  handleAdd = () => {
    this.props.createBlogArticle();
  };

  handleSave = articleId => {
    // article already exists and will be updated
    const article = this.props.blog.byHash[articleId];
    _.merge(
      article,
      BlogOperations.buildArticleObject(
        this.props.blog.editorState.getCurrentContent().getPlainText()
      )
    );
    // strapi CMS (with mySQL implementation) needs this format
    article.modifiedAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    this.props.updateBlogArticle(articleId, article);
    // Close Edit Mode
    this.setState({ edit: false });
    // in container start
    this.props.finishEditBlogArticle(articleId);
    this.props.clearCurrentArticle();
    this.props.updateEditorState(EditorState.createEmpty());
    //in container ende
  };

  handleDelete = articleId => {
    this.setState({ edit: false });
    // in container start
    this.props.finishEditBlogArticle(articleId);
    this.props.clearCurrentArticle();
    this.props.updateEditorState(EditorState.createEmpty());
    // in container ende
    this.props.deleteBlogArticle(articleId);
  };

  handleCancel = articleId => {
    this.setState({ edit: false });
    //in container start
    this.props.finishEditBlogArticle(articleId);
    this.props.clearCurrentArticle();
    // in container ende
    if (this.props.blog.byHash[articleId].isNew) {
      this.props.deleteBlogArticle(articleId);
    }
    this.props.updateEditorState(EditorState.createEmpty());
  };

  handleOnChange = editorState => {
    this.props.updateEditorState(editorState);
    const article = this.props.blog.currentArticle;
    _.merge(
      article,
      BlogOperations.buildArticleObject(
        this.props.blog.editorState.getCurrentContent().getPlainText()
      )
    );
    article.modifiedAt = Date.now();
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
                    <button
                      type="button"
                      onClick={() => this.handleSave(articleId)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => this.handleDelete(articleId)}
                    >
                      Delete
                    </button>
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
