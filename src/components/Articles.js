import React, { Component, useEffect } from "react";
import {ReactComponent as BackArrow} from '../assets/back-arrow.svg';
import profile from '../assets/profile3.svg';
import { useParams } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';

import {ARTICLECATEGORIES, LINKTOCATEGORY, convertToLink} from '../utils.js';

import '../styles/App.css';
import db from '../firebase';
import firebase from "firebase/app";

class ArticleThumbnail extends Component {
    constructor() {
        super();
      }
    
      render() {
        return(
            <div style={{display: "columnPosts"}}>
                <a href="/articles/article-sample">
                    <img src={this.props.thumbImg} style={{width: "100%", maxHeight: "100%"}}></img>
                </a>
                <Typography variant="h4" className="heading4">{this.props.title}</Typography>
                <Typography variant="body1">{this.props.username} | {this.props.date} </Typography>
                <Typography variant="body1" style={{color: "#888888"}}>{this.props.description} </Typography>
            </div>
        );
      }
}

class Articles extends Component {
    constructor(props) {
      super(props);

      this.state = {
        category: ""
      }
    }

    handleChangeCategory = (event) => {
        this.setState({
            category: event.target.value
        });
    }
  
    render() {
        return (
            <div>
                <Typography variant="h3" className="heading">Articles</Typography>
                <Box  className="outlinedWhiteBox" style={{padding: "10px"}}>
                    <TextField
                        id="outlined-basic"
                        select
                        label="Category"
                        value={this.state.category}
                        onChange={this.handleChangeCategory}
                        className="select"
                        variant="outlined"
                        style={{width: "100%"}} 
                        >
                        {ARTICLECATEGORIES.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>

                    <Grid container spacing={2} style={{marginTop:"12px"}}>
                        <Grid item xs={12} md={6} lg={4}>
                            <ArticleThumbnail 
                                title="Article Title" 
                                username="TempUser" 
                                date="Feb 13 2022" 
                                description="Description text blah" 
                                thumbImg="https://www.backyardchickens.com/images/fc/hp-01/2022-08-13_08-30-38.jpg"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <ArticleThumbnail 
                                title="Article Title" 
                                username="TempUser" 
                                date="Feb 13 2022" 
                                description="Description text blah" 
                                thumbImg="https://www.backyardchickens.com/images/fc/hp-01/2022-08-13_08-30-38.jpg"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <ArticleThumbnail 
                                title="Article Title" 
                                username="TempUser" 
                                date="Feb 13 2022" 
                                description="Description text blah" 
                                thumbImg="https://www.backyardchickens.com/images/fc/hp-01/2022-08-13_08-30-38.jpg"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <ArticleThumbnail 
                                title="Article Title" 
                                username="TempUser" 
                                date="Feb 13 2022" 
                                description="Description text blah" 
                                thumbImg="https://www.backyardchickens.com/images/fc/hp-01/2022-08-13_08-30-38.jpg"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <ArticleThumbnail 
                                title="Article Title" 
                                username="TempUser" 
                                date="Feb 13 2022" 
                                description="Description text blah" 
                                thumbImg="https://www.backyardchickens.com/images/fc/hp-01/2022-08-13_08-30-38.jpg"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <ArticleThumbnail 
                                title="Article Title" 
                                username="TempUser" 
                                date="Feb 13 2022" 
                                description="Description text blah" 
                                thumbImg="https://www.backyardchickens.com/images/fc/hp-01/2022-08-13_08-30-38.jpg"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <ArticleThumbnail 
                                title="Article Title" 
                                username="TempUser" 
                                date="Feb 13 2022" 
                                description="Description text blah" 
                                thumbImg="https://www.backyardchickens.com/images/fc/hp-01/2022-08-13_08-30-38.jpg"/>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        );
    }
}

export default Articles;