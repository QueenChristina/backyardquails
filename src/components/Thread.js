import React, { Component, useEffect } from "react";
import {ReactComponent as BackArrow} from '../assets/back-arrow.svg';
import profile from '../assets/profile3.svg';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";

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
            <div style={{display: "flex"}}>
                <div style={{display:"flex", flexDirection: "column"}}>
                    <img src={profile} style={{width: "49px", margin: "auto"}}></img>
                    <Typography variant="h6"> {this.props.username} </Typography>
                    <Typography variant="body1"> {date.toDateString()} </Typography>
                </div>
                <div>
                    <Typography variant="body1"> {this.props.text} </Typography>
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

class Thread extends Component {
    constructor(props) {
      super(props);

      this.state = {posts: []};
    }

    // getPosts = () => {
    //     let id = 'ry8j2gwkkq4JK0YtBJ4J';
    //     db.collection('threads/' + id + '/Posts').get().then(snapshot => {
    //         this.setState( {
    //             posts: snapshot.docs.map(x => x.data())
    //         })
    //     }
    //     );
    // }
  
    componentDidMount() {
        // this.getPosts();

        let id = 'ry8j2gwkkq4JK0YtBJ4J';
        db.collection('threads/' + id + '/Posts').orderBy("date", "asc").onSnapshot(snapshot => 
            this.setState({
                posts: snapshot.docs.map(x => x.data())
            })
        );
        // useEffect(() => {
        //     db.collection('threads/' + id + '/Posts').onSnapshot(snapshot => 
        //         this.setState({
        //             posts: snapshot.docs.map(x => x.data())
        //         })
        //     )
        //     }, []);
        console.log(this.state.posts);
    }

    render() {
        return (
            <div>
                <div>
                    <Typography variant="h3" className="heading">
                        <a href="/forums" style={{paddingRight: "15px"}}>
                        <BackArrow style={{maxWidth:"12px", fill: "white"}} />
                        </a>
                        Thread
                    </Typography>
                </div>
                <Box className="outlinedWhiteBox columnPosts">
                    {console.log(this.state.posts)}
                    {this.state.posts.map((post, index) =>
                        <Post key={index} username={post.username} text={post.text} date={post.date} likes={post.likes}/>                      
                    )}
                    <PostForm threadId='ry8j2gwkkq4JK0YtBJ4J'/>
                </Box>
            </div>
        );
    }
}

export default Thread;