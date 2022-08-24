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
import PostReply from "./PostReply";

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            img: "",
        }
      }

      componentDidMount() {

        db.collection('users').doc(this.props.userid).get().then((snapshot) => {
            if (snapshot.data()) {
                this.setState({
                    img: snapshot.data().photoURL
                }); 
            }
        });

        if (this.state.img == undefined) {
            this.setState({
                img: ""
            }); 
        }
    }

    
      render() {
        
          return (
            <div style={{display: "flex"}} className="post">
                <div style={{display:"flex", flexDirection: "column", width: "150px"}}>
                    {(this.state.img == "") ? 
                        <img src={profile} style={{width: "100px", height: "100px", margin: "10px auto"}}></img>
                        :
                        <img src={this.state.img} style={{width: "100px", height: "100px", margin: "10px auto"}}></img>
                    }
                    <Typography variant="h6" style={{wordWrap:"break-word", textAlign:"center"}}> {this.props.username} </Typography>
                    <Typography variant="body1" style={{textAlign:"center"}}> {timestampToString(this.props.date)} </Typography>
                </div>
                <div style={{width:"calc(100% - 150px)", overflowWrap: "break-word"}}>
                    <Typography variant="body1" style={{overflowWrap: "break-word"}}> {this.props.text} </Typography>
                    {(this.props.rawContent != undefined) && 
                    <div     
                        dangerouslySetInnerHTML={{
                        __html: draftToHtml(this.props.rawContent)}}/>
                    }
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

        this.uid = ""; // url after /thread/
    }
  
    componentDidMount() {
        // uid is the thread index by creation order
        this.uid = this.props.params["*"].split(".")[1];

        db.collection("uidToId").doc("threads").get().then ( (snapshot) => {
            this.setState(
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
                        <a href="/forums" style={{paddingRight: "15px", color: "white"}}>
                            <BackArrow style={{maxWidth:"12px", fill: "white"}} />
                        </a>
                        <a href={"/forums/" + convertToLink(this.state.category)} style={{paddingRight: "15px", color: "white"}}>
                            {this.state.category}
                        </a>
                        / {this.state.title}
                    </Typography>
                </div>
                <Box className="outlinedWhiteBox columnPosts">
                    {console.log(this.state.posts)}
                    {this.state.posts.map((post, index) =>
                        <Post key={index} username={post.username} userid={post.userid} rawContent={post.rawContent} text={post.text} date={post.date} likes={post.likes}/>                      
                    )}
                    <PostReply isThread={true} id={this.state.id}/>
                </Box>
            </div>
        );
    }
}

export default  withParams(Thread);