import React, { Component } from "react";
import profile from '../assets/profile3.svg';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import '../styles/App.css';

class PostThumbnail extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
            <a href="/threads/post">
                <div>
                    <div style={{display:"inline-block"}}>
                        <img src={profile} style={{width: "49px"}}></img>
                    </div>
                    <div style={{display:"inline-block"}}>
                        <Typography variant="h6"> {this.props.title} </Typography>
                        <Typography variant="body1"> {this.props.category} </Typography>
                        <Typography variant="body1"> {this.props.author} | {this.props.time} ago </Typography>
                    </div>
                </div>
            </a>
        );
    }
}

class NewPosts extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
            <div>
            <Typography variant="h3" className="heading">New Posts</Typography>
                <Box className="colorBox columnPosts">
                    <PostThumbnail title="Post Title" category="Category" author="Author" time="5 minutes"/>
                    <PostThumbnail title="Post Title" category="Category" author="Author" time="15 minutes"/>
                    <PostThumbnail title="Post Title" category="Category" author="Author" time="5 minutes"/>
                    <PostThumbnail title="Post Title" category="Category" author="Author" time="5 minutes"/>
                </Box>
            </div>
        );
    }
}

export default NewPosts;