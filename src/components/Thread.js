import React, { Component, useEffect } from "react";
import {ReactComponent as BackArrow} from '../assets/back-arrow.svg';
import profile from '../assets/profile3.svg';
import { useParams } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";

import {convertToLink} from '../utils.js';

import '../styles/App.css';
import db from '../firebase';
import firebase from "firebase/app";

class Post extends Component {
    constructor() {
        super();
      }
    
      render() {
        let date = new Date(this.props.date.seconds * 1000);
          return (
            <div style={{display: "flex"}} className="post">
                <div style={{display:"flex", flexDirection: "column", width: "150px"}}>
                    <img src={profile} style={{width: "49px", margin: "auto"}}></img>
                    <Typography variant="h6" style={{wordWrap:"break-word", textAlign:"center"}}> {this.props.username} </Typography>
                    <Typography variant="body1" style={{textAlign:"center"}}> {date.toDateString().replace(/^\S+\s/,'')} </Typography>
                </div>
                <div style={{width:"calc(100% - 150px)"}}>
                    <Typography variant="body1" style={{overflowWrap: "break-word"}}> {this.props.text} </Typography>
                </div>
            </div>
          );
      }
}

class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {text: ""};
      }

    handleChange = (event) => {
        console.log("changed to" + event.target.value);
        this.setState({
            text: event.target.value
        });
      }

    sendPost = () => {
        db.collection('threads/' + this.props.threadId + '/Posts').add({
            username: "TEMPuserTODO",
            text: this.state.text,
            likes: 0,
            date: firebase.firestore.Timestamp.now()
        })
        this.setState({
            text: ""
        });
    }
    
      render() {
          return (
            <div style={{display: "flex"}}>
                <img src={profile}  style={{width: "49px"}}></img>
                <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                    <TextField
                        id="filled-multiline-flexible"
                        label="Post your reply"
                        multiline
                        maxRows={4}
                        onChange={this.handleChange}
                        value={this.state.text}
                        variant="filled"
                        />
                    <Button onClick={this.sendPost}>Post</Button>
                </div>
            </div>
          );
      }
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class Thread extends Component {
    constructor(props) {
      super(props);

      this.state = {
        title: "", 
        posts: [],
        category: "",
        id : "" // document id cooresponding to thread
    };

        this.uid = ""; // url id, also the thread #
    }
  
    componentDidMount() {
        // uid is the thread index by creation order
        this.uid = this.props.params["*"].split("/")[1];

        db.collection("uidToId").doc("threads").get().then ( (snapshot) => {
            this.setState(
                // thread # uid to document id is stored in uidToId/threads
                {id: snapshot.data()[this.uid]}
            );

            // Update posts realtime
            db.collection('threads/' + this.state.id + '/Posts').orderBy("date", "asc").onSnapshot(snapshot => 
                this.setState({
                    posts: snapshot.docs.map(x => x.data())
                })
            );
    
            db.collection('threads').doc(this.state.id).get().then ( (snapshot) =>
                this.setState({
                    title: snapshot.data().title,
                    category: snapshot.data().category
                })
            );
        }
        );
    }

    render() {
        return (
            <div>
                <div>
                    <Typography variant="h3" className="heading">
                        <a href="/forums" style={{paddingRight: "15px"}}>
                            <BackArrow style={{maxWidth:"12px", fill: "white"}} />
                        </a>
                        <a href={"/forums/" + convertToLink(this.props.title)} style={{paddingRight: "15px"}}>
                            {this.state.category}
                        </a>
                        / {this.state.title}
                    </Typography>
                </div>
                <Box className="outlinedWhiteBox columnPosts">
                    {console.log(this.state.posts)}
                    {this.state.posts.map((post, index) =>
                        <Post key={index} username={post.username} text={post.text} date={post.date} likes={post.likes}/>                      
                    )}
                    <PostForm threadId={this.state.id}/>
                </Box>
            </div>
        );
    }
}

export default  withParams(Thread);