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
import {
  Button,
  Icon,
  Popover,
  Tooltip,
  Position,
  H1,
  H2
} from "@blueprintjs/core";

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
          <H1>Blog</H1>
          <CustomButton
            onClick={() => this.handleAdd()}
            contentTooltip={<span>Neuer Blogartikel</span>}
            positionTooltip={Position.RIGHT}
            disabled={this.state.edit}
            icon="add-to-artifact"
            iconSize={24}
          />
          {this.props.blog.byId
            .sort((a, b) => this.sortBlogArticle(a, b))
            .map(articleId => (
              <div key={articleId}>
                {/*Show Blog article*/}
                {!this.props.blog.byHash[articleId].editMode && (
                  <div>
                    <H2>
                      <CustomButton
                        onClick={() => this.handleEdit(articleId)}
                        contentTooltip={<span>Bearbeiten</span>}
                        positionTooltip={Position.RIGHT}
                        disabled={this.state.edit}
                        icon="edit"
                        iconSize={24}
                      />
                      {this.props.blog.byHash[articleId].title}
                    </H2>
                    <span>by {this.props.blog.byHash[articleId].author}</span>

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
                    <CustomButton
                      onClick={() => this.handleSave(articleId)}
                      contentTooltip={<span>Speichern</span>}
                      positionTooltip={Position.RIGHT}
                      icon="tick"
                      iconSize={24}
                    />
                    <CustomButton
                      onClick={() => this.handleCancel(articleId)}
                      contentTooltip={<span>Abbrechen</span>}
                      positionTooltip={Position.RIGHT}
                      icon="cross"
                      iconSize={24}
                    />
                    {!this.props.blog.byHash[articleId].isNew && (
                      <CustomButton
                        onClick={() => this.handleDelete(articleId)}
                        contentTooltip={<span>Löschen</span>}
                        positionTooltip={Position.RIGHT}
                        icon="trash"
                        iconSize={24}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

function CustomButton({
  onClick,
  contentTooltip,
  contentPopover,
  positionPopover,
  positionTooltip,
  disabled = false,
  icon,
  iconSize = 16
}) {
  return (
    <Popover content={contentPopover} position={positionPopover}>
      <Tooltip content={contentTooltip} position={positionTooltip}>
        <Button onClick={onClick} disabled={disabled}>
          <Icon icon={icon} iconSize={iconSize} />
        </Button>
      </Tooltip>
    </Popover>
  );
}
