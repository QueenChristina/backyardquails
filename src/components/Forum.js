import React, { Component, useEffect } from "react";
import {ReactComponent as BackArrow} from '../assets/back-arrow.svg';
import profile from '../assets/profile3.svg';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";

import {convertToLink} from '../utils.js';

import '../styles/App.css';
import db from '../firebase';
import firebase from "firebase/app";

class ThreadThumbnail extends Component {
    constructor() {
        super();
      }
    
      render() {
        let date = new Date(this.props.date.seconds * 1000);
          return (
            <div style={{display: "flex"}} className="post">
                <img src={profile} style={{width: "49px", margin: "auto"}}></img>
                <div style={{width:"calc(100% - 100px)", display: "flex", flexDirection: "column"}}>
                    <a href={"/threads/" + this.props.id}>
                        <Typography variant="h6">{this.props.title}</Typography>
                    </a>
                    <Typography variant="body1" style={{overflowWrap: "break-word"}}> {this.props.username} | {date.toDateString().replace(/^\S+\s/,'')}</Typography>
                </div>
            </div>
          );
      }
}

class Forum extends Component {
    constructor(props) {
      super(props);

      this.state = {
        threads: [],
    };

    }
  
    componentDidMount() {
        // Update threads realtime
        db.collection("threads").where("category", "==", this.props.category).orderBy("date", "asc").onSnapshot(snapshot => 
            this.setState({
                threads: snapshot.docs.slice(0, 50).map(x => {
                    const data = x.data();
                    const id = x.id;
                    return { id, ...data };
                })
            })
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
                        {this.props.category}
                    </Typography>
                </div>
                <Box className="outlinedWhiteBox columnPosts">
                    {console.log(this.state.threads)}
                    {this.state.threads.map((thread, index) =>
                        <ThreadThumbnail key={index} id={thread.id} username={thread.username} title={thread.title} date={thread.date} likes={thread.likes}/>                      
                    )}
                </Box>
            </div>
        );
    }
}

export default Forum;