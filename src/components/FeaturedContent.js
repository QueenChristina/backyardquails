import React, { Component } from "react";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import '../styles/App.css';

class ArticleThumbnail extends Component {
    constructor() {
        super();
      }
    
      render() {
        return(
            <a href="google.com">
                <Box sx={{position: "relative"}}>
                    <Typography variant="body1" className="imgLabel">Post Title</Typography>
                    <img src="https://www.backyardchickens.com/images/fc/hp-01/2022-08-13_08-30-38.jpg" style={{width: "100%", maxHeight: "100%"}}></img>
                </Box>
            </a>
        );
      }
}

class FeaturedContent extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
        <Box sx={{ p: 2, border: '1px solid grey' }}>
            <Typography variant="h3" className="heading">Featured Content</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <ArticleThumbnail/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ArticleThumbnail/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ArticleThumbnail/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ArticleThumbnail/>
                </Grid>
            </Grid>
        </Box>

        );
    }
}

export default FeaturedContent;