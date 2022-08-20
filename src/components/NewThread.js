import React, { Component, useEffect } from "react";
import {ReactComponent as BackArrow} from '../assets/back-arrow.svg';
import profile from '../assets/profile3.svg';
import { useParams } from "react-router-dom";
import TextEditor from "./TextEditor";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';

import {FORUMCATEGORIES, LINKTOCATEGORY, convertToLink} from '../utils.js';

import '../styles/App.css';
import db from '../firebase';
import firebase from "firebase/app";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class Thread extends Component {
    constructor(props) {
      super(props);

      this.state = {
        title: "",
        text: "", 
        category: "",
        username: "",
        missingTitleError: false
    };

        this.uid = ""; // url after /forums/
        this.content = {};
        this.contentText = "";
    }
  
    componentDidMount() {
        console.log(this.props.params["*"]);
        if (this.props.params["*"] != "") {
            this.setState( {
                category: LINKTOCATEGORY[this.props.params["*"]]
            })
    
            console.log(this.category);
        }

    }

    sendPost = () => {
        if (this.state.title != "" && this.state.category != "") {
            let newThreadIndex = 0;
            db.collection('values').doc('global').get().then( (snapshot) => {
                newThreadIndex = snapshot.data().lastThreadIndex + 1;

                db.collection('threads').add({
                    username: "TempUser",
                    category: this.state.category,
                    title: this.state.title,
                    likes: 0,
                    date: firebase.firestore.Timestamp.now(),
                    uid: snapshot.data().lastThreadIndex + 1,
                }).then((newDocRef) => {
                    let newId = {};
                    newId[newThreadIndex] = newDocRef.id;
    
                    db.collection('uidToId').doc('threads').set(newId, { merge: true });
    
                    if (this.contentText == "" && this.state.text == "") {
                        location.href = "/threads/" + convertToLink(this.state.title) + "." + newThreadIndex;
                    } else {
                        db.collection('threads/' + newDocRef.id + '/Posts').add({
                            username: "TempUser",
                            text: this.state.text,
                            rawContent: this.content,
                            likes: 0,
                            date: firebase.firestore.Timestamp.now(),
                        }).then((docRef)=>{
                            location.href = "/threads/" + convertToLink(this.state.title) + "." + newThreadIndex;
                        });
                    }

                })
            
                db.collection('values').doc('global').update({
                    lastThreadIndex: snapshot.data().lastThreadIndex + 1
                });
            });

        } else {
            this.setState({missingTitleError: true});
        }
    }

    handleChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        });
      }

    handleChangeText = (event) => {
    this.setState({
        text: event.target.value
    });
    }

    handleChangeCategory = (event) => {
        this.setState({
            category: event.target.value
        });
    }

    setContent = (rawContent, contentPlainText) => {
        this.content = rawContent;
        this.contentText = contentPlainText;
    }
    

    render() {
        return (
            <div>
                <div>
                    <Typography variant="h3" className="heading">
                        <a href="/forums" style={{paddingRight: "15px", color: "white"}}>
                            <BackArrow style={{maxWidth:"12px", fill: "white"}} />
                        </a>
                        Post Thread
                    </Typography>
                </div>
                <Box className="outlinedWhiteBox columnPosts" style={{padding: "12px"}}>
                    <TextField
                        id="filled-basic"
                        label="Thread Title"
                        onChange={this.handleChangeTitle}
                        value={this.state.title}
                        variant="filled"
                        inputProps={{ maxLength: 120 }}
                    />

                    {this.state.missingTitleError &&
                        <Typography variant="h6" style={{color: "red"}}>* Thread title and category is required to post. </Typography>
                    }

                    <TextField
                        id="outlined-basic"
                        select
                        label="Category"
                        value={this.state.category}
                        onChange={this.handleChangeCategory}
                        helperText="Please select which forum to post to."
                        className="select"
                        variant="outlined" 
                        >
                        {FORUMCATEGORIES.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>

                    {/* <TextField
                        id="filled-multiline-flexible"
                        label="Description"
                        multiline
                        rows={20}
                        onChange={this.handleChangeText}
                        value={this.state.text}
                        variant="filled"
                        style={{minHeight: "300px"}}
                        /> */}
                    <TextEditor onChange={this.setContent}/>
                    
        
                    <div style={{display: "flex"}}>
                        <div style={{flexGrow: 1}}></div>
                        <Button onClick={this.sendPost} style={{margin: "10px", minHeight: "35px"}} className="baseButton">Post</Button>
                    </div>  
                </Box>
            </div>
        );
    }
}

export default  withParams(Thread);