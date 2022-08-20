import React, { Component, useEffect } from "react";
import {ReactComponent as BackArrow} from '../assets/back-arrow.svg';
import profile from '../assets/profile3.svg';
import { useParams } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";

import {convertToLink, timestampToString} from '../utils.js';

import '../styles/App.css';
import db from '../firebase';
import firebase from "firebase/app";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {EditorState, convertToRaw} from "draft-js";
import draftToHtml from 'draftjs-to-html';

// const HANDLED = 'handled';

class TextEditor extends Component {
    // TODO: https://docs.slatejs.org/walkthroughs/06-saving-to-a-database use Slate for rich text editor + images
    // OR TRY Draft.js https://morioh.com/p/ea7a922e2b7a https://draftjs.org/docs/api-reference-data-conversion
    // USE THIS:::: https://github.com/jpuri/react-draft-wysiwyg
    // Use for thread post reply AND Article -- set height via prop.
    // Save to database + RENDER.
    constructor(props){
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
        };
      }

    componentDidCatch() {
        // workaround for issue https://github.com/facebook/draft-js/issues/1320
        this.forceUpdate();
    }

    // handleBeforeInput = (chars, editorState) => {
    //     const currentContentState = editorState.getCurrentContent();
    //     const selectionState = editorState.getSelection();

    //     this.handleOnChange(EditorState.push(
    //         editorState,
    //         Modifier.replaceText(
    //             currentContentState,
    //             selectionState,
    //             chars
    //         )
    //     ));

    //     return HANDLED;
    // };
     
    onEditorStateChange = (editorState) => {
        // console.log(editorState)
        this.setState({
          editorState,
        });

        this.props.onChange(this.getRawContent(), this.state.editorState.getCurrentContent().getPlainText());
      };

    uploadImageCallBack = (file) => {
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            // Uploads image to imgur
            // TODO: try uploading to firebase instead...?
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID ' + process.env.IMGUR_CLIENT_ID);
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              console.log(response)
              resolve(response);
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              console.log(error)
              reject(error);
            });
          }
        );
      }

    getRawContent = () => {
        return convertToRaw(this.state.editorState.getCurrentContent()); // .getPlainText()
    }

    // sendPost = () => {
    //     db.collection('threads/' + this.props.threadId + '/Posts').add({
    //         username: "TempUser",
    //         text: this.state.text,
    //         likes: 0,
    //         date: firebase.firestore.Timestamp.now()
    //     })
    //     this.setState({
    //         text: ""
    //     });
    // }
    
    // myBlockStyleFn = (contentBlock) => {
    //     // define css class styles
    //     const type = contentBlock.getType();
    //     return 'editorStyle';
    // }

      render() {
          return (
                <Editor
                    editorState={this.state.editorState}
                    // handleBeforeInput={this.handleBeforeInput}
                    onEditorStateChange={this.onEditorStateChange} 
                    editorStyle={{ border: "#F1F1F1 1px solid", backgroundColor: "white", borderRadius: "5px", padding: "10px", fontFamily: "sans-serif"}}   
                    toolbarStyle={{fontFamily: "sans-serif"}}
                    // blockStyleFn={this.myBlockStyleFn}
                    toolbar={{
                    inline: { inDropdown: false },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: false },
                    image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: false } },
                    }}
                />
          );
      }
}

export default TextEditor;