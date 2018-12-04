import React from "react";
import { Editor } from "draft-js";
import ReactMarkdown from "react-markdown";
import { object, func, string } from "prop-types";
import styles from "./blog.scss";

BlogEditor.propTypes = {
  editorState: object.isRequired,
  onChange: func.isRequired,
  author: string,
  title: string,
  source: string
};
function BlogEditor({ editorState, onChange, author, title, source }) {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Editor editorState={editorState} onChange={onChange} />
      </div>
      <div className={styles.col}>
        <h2>{title}</h2>
        <span>by {author}</span>
        <ReactMarkdown source={source} />
      </div>
    </div>
  );
}

export default BlogEditor;
