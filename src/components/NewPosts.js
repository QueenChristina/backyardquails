import React, { Component } from "react";
import profile from '../assets/profile3.svg';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class PostThumbnail extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
            <a href="google.com">
                <div>
                    <div style={{display:"inline-block"}}>
                        <img src={profile} style={{width: "72px"}}></img>
                    </div>
                    <div style={{display:"inline-block"}}>
                        <Typography variant="body1"> {this.props.title} </Typography>
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
            <Box sx={{ p: 2, border: '1px solid grey' }}>
            <Typography variant="h3">New Posts</Typography>
                <PostThumbnail title="Post Title" category="Category" author="Author" time="5 minutes"/>
                <PostThumbnail title="Post Title" category="Category" author="Author" time="15 minutes"/>
                <PostThumbnail title="Post Title" category="Category" author="Author" time="5 minutes"/>
                <PostThumbnail title="Post Title" category="Category" author="Author" time="5 minutes"/>
            </Box>
        );
    }
}

export default NewPosts;