import React, { Component } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
class Editorcomponent1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      uploadedImages: [],
      markethtml: null,
      htmlpur: null,
    };
    this._uploadImageCallBack = this._uploadImageCallBack.bind(this);
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log(editorState.getCurrentContent());
    let currentContentAsHTML = convertToHTML({
      styleToHTML: (style) => {
        if (style === "BOLD") {
          return <span style={{ color: "blue" }} />;
        }
      },
      blockToHTML: (block) => {
        const type = block.type;
        if (type === "atomic") {
          return {
            start: "<img src='" + this.state.uploadedImages[0].localSrc + "'>",
            end: "</img>",
          };
        }
        if (type === "unstyled") {
          return <p />;
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === "LINK") {
          return <a href={entity.data.url}>{originalText}</a>;
        }
        return originalText;
      },
    })(editorState.getCurrentContent());
    this.setState({ markethtml: currentContentAsHTML });
  };
  _uploadImageCallBack(file) {
    let uploadedImages = this.state.uploadedImages;
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };
    uploadedImages.push(imageObject);
    this.setState({ uploadedImages: uploadedImages });
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  }
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarclass"
        wrapperClassName="wrapperclass"
        editorClassName="editorclass"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { uploadCallback: this._uploadImageCallBack },
          inputAccept:
            "application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel",
        }}
      />
    );
  }
}
export default Editorcomponent1;
