import React, { Component } from "react";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import '../styles/App.css';

class Forum extends Component {
    constructor() {
        super();
      }
    
      render() {
        return(
            <div>
            </div>
        );
      }
}

class Articles extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
            <div>
                <Typography variant="h3" className="heading">Articles</Typography>
                <Box  className="outlinedWhiteBox">
                </Box>
            </div>
        );
    }
}

export default Articles;