import React, { Component } from "react";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class ArticleThumbnail extends Component {
    constructor() {
        super();
      }
    
      render() {
        return(
        <Box sx={{maxHeight: 300, maxWidth: "100%", backgroundColor: 'primary.dark',}}>
        <a href="google.com">
            <Typography variant="body1">Post Title</Typography>
            <img src="https://www.backyardchickens.com/images/fc/hp-01/2022-08-13_08-30-38.jpg"></img>
        </a>
        </Box>
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
            <Typography variant="h3">Featured Content</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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