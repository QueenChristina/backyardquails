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
import db, { auth } from '../firebase';
import firebase from "firebase/app";

import TextEditor from "./TextEditor";
import draftToHtml from "draftjs-to-html";

class PostReply extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            editorKey: 0,
            errorMessage: ""
        };
        this.content = {};
        this.contentText = "";
      }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
      }

    setContent = (rawContent, contentPlainText) => {
        this.content = rawContent;
        this.contentText = contentPlainText;
    }

    sendThreadPost = () => {
        if (!auth.currentUser) {
            this.setState({
                errorMessage: "Log in to post."
            })
            return;
        }
        if (this.contentText == "") {
            this.setState({
                errorMessage: "Cannot post nothing."
            })
            return;
        }
        db.collection('threads/' + this.props.id + '/Posts').add({
            username: auth.currentUser.displayName,
            userid: auth.currentUser.uid,
            text: this.state.text,
            rawContent: this.content,
            likes: 0,
            date: firebase.firestore.Timestamp.now()
        })
        this.setState({
            text: "",
            editorKey: this.state.editorKey + 1,
            errorMessage: ""
        });
    }

    sendArticlePost = () => {
        if (!auth.currentUser) {
            this.setState({
                errorMessage: "Log in to post."
            })
            return;
        }
        if (this.contentText == "") {
            this.setState({
                errorMessage: "Cannot post nothing."
            })
            return;
        }
        db.collection('articles/' + this.props.id + '/Comments').add({
            username: auth.currentUser.displayName,
            userid: auth.currentUser.uid,
            rawContent: this.content,
            likes: 0,
            date: firebase.firestore.Timestamp.now()
        })
        this.setState({
            text: "",
            editorKey: this.state.editorKey + 1,
            errorMessage: ""
        });
    }
    
      render() {
          return (
            <div style={{display: "flex", padding: "10px"}}>
                {(auth.currentUser && auth.currentUser.photoURL) ? 
                <img src={auth.currentUser.photoURL}  style={{width: "49px", width: "150px", height: "150px"}}></img> :
                <img src={profile}  style={{width: "49px", width: "150px"}}></img>
                }
                
                <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                        <TextEditor key={this.state.editorKey} onChange={this.setContent}/>
                    <div style={{display: "flex"}}>
                        <div style={{flexGrow: 1}}></div>
                        <Button onClick={() => {
                            if (this.props.isThread) {
                                this.sendThreadPost();
                            } else {
                                this.sendArticlePost();
                            }}} style={{margin: "10px"}} className="baseButton">Post</Button>
                    </div>           
                    {(this.state.errorMessage != "") && <Typography variant="body1" style={{color: "red"}}>{this.state.errorMessage}</Typography>}
                </div>
            </div>
          );
      }
}

export default PostReply;