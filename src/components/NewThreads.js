import React, { Component } from "react";
import profile from '../assets/profile3.svg';
import {convertToLink, timestampToString} from '../utils.js';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import '../styles/App.css';
import db from '../firebase';

class ThreadThumbnail extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (            
                <div style={{display: "flex"}}>
                    <div style={{display:"inline-block", margin: "10px", marginTop: "auto", marginBottom: "auto"}}>
                        <img src={profile} style={{width: "49px"}}></img>
                    </div>
                    <div style={{display:"inline-block"}}>
                        <a href={"/threads/" + convertToLink(this.props.title) + "." + this.props.uid}>
                            <Typography variant="h6" style={{color: "black"}}> {this.props.title} </Typography>
                        </a>
                        <a href={"/forums/" + convertToLink(this.props.category)}>
                            <Typography variant="body1"> {this.props.category} </Typography>
                        </a>
                        <Typography variant="body1"> {this.props.username} | {timestampToString(this.props.date)} </Typography>
                    </div>
                </div>
        );
    }
}

class NewThreads extends Component {
    constructor(props) {
      super(props);

      this.state = {
        threads: [],
        };
    }
  
    componentDidMount() {
        // Update threads realtime
        db.collection("threads").orderBy("date", "desc").onSnapshot(snapshot => 
            this.setState({
                threads: snapshot.docs.slice(0, 5).map(x => {
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
            <Typography variant="h3" className="heading">New Posts</Typography>
                <Box className="colorBox columnPosts">
                {this.state.threads.map((thread, index) =>
                        <ThreadThumbnail key={index} id={thread.id} uid={thread.uid} title={thread.title} date={thread.date} username={thread.username} category={thread.category}/>                      
                    )
                }
                </Box>
            </div>
        );
    }
}

export default NewThreads;