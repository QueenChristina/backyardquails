import React, { Component } from "react";
import backArrow from '../assets/back-arrow.svg';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import '../styles/App.css';

class Post extends Component {
    constructor() {
        super();
      }
    
      render() {
          return (
              <Box sx={{ p: 2, border: '1px solid grey' }}>
                  <a href="google.com">
                      <img src={backArrow} style={{maxWidth:"12px"}}></img>
                  </a>
                  <Typography variant="h3">Thread</Typography>
                  <div>

                  </div>
              </Box>
          );
      }
}

class Thread extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
            <div>
                <div>
                    <a href="google.com">
                    <img src={backArrow} style={{maxWidth:"12px"}}></img>
                    </a>
                    <Typography variant="h3" className="heading">Thread</Typography>
                </div>
                <Box  className="outlinedWhiteBox">
                    <Post/>
                </Box>
            </div>
        );
    }
}

export default Thread;