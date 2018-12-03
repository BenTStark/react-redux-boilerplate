import { BlogOperations } from "./operations";
import types from "./types";

describe(">>> Blog - Operations Test", () => {
  // This is an example how a simple action test should look like:
  it("+++ buildEditorContent", () => {
    const article = { title: "title", author: "author", text: "text" };
    expect(BlogOperations.buildEditorContent(article)).toEqual(
      ["title: title,", "author: author", "~~~", "text"].join("\r\n")
    );
  });

  it("+++ buildArticleObject", () => {
    const plainText = ["title: title,", "author: author", "~~~", "text"].join(
      "\n"
    );
    const article = {
      title: "title",
      author: "author",
      text: "text",
      isNew: false
    };
    expect(BlogOperations.buildArticleObject(plainText)).toEqual(article);
  });

  it("+++ maxId", () => {
    let array = [1, 2, 4];
    expect(BlogOperations.maxId(array)).toEqual(4);
    array = [];
    expect(BlogOperations.maxId(array)).toEqual(1);
  });

  it("+++ sortBlogArticle", () => {
    let obj = {
      "1": { createdAt: "2018-02-01 18:12:38" },
      "2": { createdAt: "2018-02-02 15:11:00" }
    };
    expect(BlogOperations.sortBlogArticle(1, 2, obj)).toEqual(1);
  });
});
