import React, { Component } from 'react';
    import { EditorState } from 'draft-js';
    import { Editor } from 'react-draft-wysiwyg';
    import DOMPurify from 'dompurify';
    import { convertToHTML } from 'draft-convert';

    

    class Editorcomponent1 extends Component {
    
      constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
          uploadedImages: [],
          markethtml:null ,
          htmlpur:null ,
        };
        this._uploadImageCallBack = this._uploadImageCallBack.bind(this);
      }
    
      onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
        console.log(editorState.getCurrentContent())
        let currentContentAsHTML = convertToHTML({
            styleToHTML: (style) => {
              if (style === 'BOLD') {
                return <span style={{color: 'blue'}} />;
              }
            },
            blockToHTML: (block) => {
              const type = block.type
             
              if (type === 'atomic') {
          ///      console.log(block.data)
                let url = block.data.src
               /// console.log(this.state.uploadedImages[0]);
                return { start: "<img src='" + (this.state.uploadedImages[0].localSrc) + "'>", end: "</img>" }
              }
              if (type === 'unstyled') {
                return <p />
              }
            },
            entityToHTML: (entity, originalText) => {
              if (entity.type === 'LINK') {
                return <a href={entity.data.url}>{originalText}</a>;
              }
              return originalText;
            }
          })(editorState.getCurrentContent());
      //// console.log(currentContentAsHTML)
        this.setState({markethtml:currentContentAsHTML})
      };
    
    
      _uploadImageCallBack(file) {
        // long story short, every time we upload an image, we
        // need to save it to the state so we can get it's data
        // later when we decide what to do with it.
    
        // Make sure you have a uploadImages: [] as your default state
        let uploadedImages = this.state.uploadedImages;
    
        const imageObject = {
          file: file,
          localSrc: URL.createObjectURL(file),
        }
    
        uploadedImages.push(imageObject);
    
        this.setState({ uploadedImages: uploadedImages })
       
        // We need to return a promise with the image src
        // the img src we will use here will be what's needed
        // to preview it in the browser. This will be different than what
        // we will see in the index.md file we generate.
        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
          }
        );
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
                  inputAccept: 'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
                }}
              />
         
        );
 
          
      }
    }

    
    
    export default Editorcomponent1;