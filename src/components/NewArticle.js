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

import {ARTICLECATEGORIES, LINKTOCATEGORY, convertToLink} from '../utils.js';

import '../styles/App.css';
import db from '../firebase';
import firebase from "firebase/app";
import { auth } from "../firebase";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class NewArticle extends Component {
    constructor(props) {
      super(props);

      this.state = {
        title: "",
        description: "",
        category: "",
        username: "",
        errorMessage: ""
    };

        this.uid = ""; // url after /articles/post/
        this.content = {};
        this.contentText = "";
    }
  
    componentDidMount() {
        if (this.props.params["*"] != "" && this.props.params["*"] != undefined) {
            this.setState( {
                category: LINKTOCATEGORY[this.props.params["*"]]
            })
    
            console.log(this.category);
        }

    }

    sendArticle = () => {
        if (!auth.currentUser) {
            this.setState({
                errorMessage: "Log in to post."
            })
            return;
        }
        if (this.state.title != "" && this.state.category != "" && this.contentText != "") {
            let newArtIndex = 0;
            db.collection('values').doc('global').get().then( (snapshot) => {
                newArtIndex = snapshot.data().lastArticleIndex + 1;

                db.collection('articles').add({
                    username: auth.currentUser.displayName,
                    userid: auth.currentUser.uid,
                    category: this.state.category,
                    title: this.state.title,
                    description: this.state.description,
                    rawContent: this.content,
                    likes: 0,
                    thumbnail: "https://www.backyardchickens.com/images/fc/hp-01/2022-08-13_08-30-38.jpg",
                    date: firebase.firestore.Timestamp.now(),
                    uid: newArtIndex,
                }).then((newDocRef) => {
                    let newId = {};
                    newId[newArtIndex] = newDocRef.id;
    
                    db.collection('uidToId').doc('articles').set(newId, { merge: true });
    
                    location.href = "/article/" + convertToLink(this.state.title) + "." + newArtIndex;

                })
            
                db.collection('values').doc('global').update({
                    lastArticleIndex: snapshot.data().lastArticleIndex + 1
                });
            });

        } else {
            this.setState({
                errorMessage: "* Title, content, and category is required to post."
            });
        }
    }

    handleChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        });
      }

    handleChangeDescription = (event) => {
    this.setState({
        description: event.target.value
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
                        <a href="/articles" style={{paddingRight: "15px", color: "white"}}>
                            <BackArrow style={{maxWidth:"12px", fill: "white"}} />
                        </a>
                        Post Article
                    </Typography>
                </div>
                <Box className="outlinedWhiteBox columnPosts" style={{padding: "12px"}}>
                    <TextField
                        id="filled-basic"
                        label="Article Title"
                        onChange={this.handleChangeTitle}
                        value={this.state.title}
                        variant="filled"
                        inputProps={{ maxLength: 120 }}
                    />

                    {(this.state.errorMessage != "") &&
                        <Typography variant="h6" style={{color: "red"}}>{this.state.errorMessage} </Typography>
                    }

                    <TextField
                        id="outlined-basic"
                        select
                        label="Category"
                        value={this.state.category}
                        onChange={this.handleChangeCategory}
                        helperText="Please select which category to post to."
                        className="select"
                        variant="outlined" 
                        >
                        {ARTICLECATEGORIES.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>

                    <TextField
                        id="filled-multiline-flexible"
                        label="Description (Optional)"
                        multiline
                        rows={4}
                        onChange={this.handleChangeDescription}
                        value={this.state.description}
                        variant="filled"
                        />

                    <TextEditor onChange={this.setContent}/>
                    
        
                    <div style={{display: "flex"}}>
                        <div style={{flexGrow: 1}}></div>
                        <Button onClick={this.sendArticle} style={{margin: "10px", minHeight: "35px"}} className="baseButton">Post</Button>
                    </div>  
                </Box>
            </div>
        );
    }
}

export default  withParams(NewArticle);