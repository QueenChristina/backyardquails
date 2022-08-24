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

import TextEditor from "./TextEditor";
import draftToHtml from "draftjs-to-html";
import PostReply from "./PostReply";

class Comment extends Component {
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

// class PostForm extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             editorKey: 0
//         };
//         this.content = {};
//       }

//     setContent = (value) => {
//         this.content = value;
//     }

//     sendPost = () => {
//         db.collection('articles/' + this.props.articleId + '/Comments').add({
//             username: "TempUser",
//             rawContent: this.content,
//             likes: 0,
//             date: firebase.firestore.Timestamp.now()
//         })
//         this.setState({
//             text: "",
//             editorKey: this.state.editorKey + 1
//         });
//     }
    
//       render() {
//           return (
//             <div style={{display: "flex", padding: "10px"}}>
//                 <img src={profile}  style={{width: "49px", width: "150px"}}></img>
//                 <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
//                         <TextEditor key={this.state.editorKey} onChange={this.setContent}/>
//                     <div style={{display: "flex"}}>
//                         <div style={{flexGrow: 1}}></div>
//                         <Button onClick={this.sendPost} style={{margin: "10px"}}>Post</Button>
//                     </div>                
//                 </div>
//             </div>
//           );
//       }
// }

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class Article extends Component {
    constructor(props) {
      super(props);

      this.state = {
        title: "", 
        username: "",
        date: {},
        comments: [],
        category: "",
        id : "", // document id cooresponding to thread
        rawContent: {}
    };

        this.uid = ""; // url after /articles/
    }
  
    componentDidMount() {
        // uid is the thread index by creation order
        this.uid = this.props.params["*"].split(".")[1];

        db.collection("uidToId").doc("articles").get().then ( (snapshot) => {
            this.setState(
                {id: snapshot.data()[this.uid]}
            );

            // Update posts realtime
            db.collection('articles/' + this.state.id + '/Comments').orderBy("date", "asc").onSnapshot(snapshot => 
                this.setState({
                    comments: snapshot.docs.map(x => x.data())
                })
            );
    
            db.collection('articles').doc(this.state.id).get().then ( (snapshot) =>
                this.setState({
                    title: snapshot.data().title,
                    username: snapshot.data().username,
                    date: snapshot.data().date,
                    category: snapshot.data().category,
                    rawContent: snapshot.data().rawContent,
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
                        {this.state.title}
                    </Typography>
                </div>          
                <Box className="outlinedWhiteBox columnPosts">
                    <div style={{padding: "10px"}}>
                        <Typography variant="body1" style={{backgroundColor: "#D9D9D9", padding: "5px 10px", borderRadius: "10px"}}>{this.state.category} | {this.state.username} | {timestampToString(this.state.date)}</Typography>
                    </div>  
                    {(this.state.rawContent != undefined) && 
                    <div style={{padding: "10px"}}>
                        <div     
                            dangerouslySetInnerHTML={{
                            __html: draftToHtml(this.state.rawContent)}}/>
                    </div>
                    }
                </Box>

                <div style={{marginTop: "15px"}}>
                    <Typography variant="h3" className="heading">
                        Comments
                    </Typography>
                </div> 
                <Box className="outlinedWhiteBox columnPosts">
                    {this.state.comments.map((comment, index) =>
                        <Comment key={index} username={comment.username} userid={comment.userid} rawContent={comment.rawContent} date={comment.date} likes={comment.likes}/>                      
                    )}
                    <PostReply isThread={false} id={this.state.id}/>
                </Box>
            </div>
        );
    }
}

export default  withParams(Article);