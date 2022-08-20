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

import {ARTICLECATEGORIES, LINKTOCATEGORY, convertToLink, timestampToString} from '../utils.js';

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
                <a href={"/article/" + convertToLink(this.props.title) + "." + this.props.uid}>
                    <img src={this.props.thumbImg} style={{width: "100%", maxHeight: "100%"}}></img>
                    <Typography variant="h4" className="heading4">{this.props.title}</Typography>
                </a>
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
        category: "",
        articles: [],
      }
    }

    componentDidMount() {
        // Update threads realtime
        if (this.state.category == "") {
            db.collection("articles").orderBy("date", "asc").onSnapshot(snapshot => 
                this.setState({
                    articles: snapshot.docs.slice(0, 18).map(x => {
                        const data = x.data();
                        const id = x.id;
                        return { id, ...data };
                    })
                })
            );
        } else {
            db.collection("articles").where("category", "==", this.state.category).orderBy("date", "asc").onSnapshot(snapshot => 
                this.setState({
                    articles: snapshot.docs.slice(0, 18).map(x => {
                        const data = x.data();
                        const id = x.id;
                        return { id, ...data };
                    })
                })
            );
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
                <div style={{display: "flex", backgroundColor: "#816962"}}>
                    <Typography variant="h3" className="heading">Articles</Typography>
                    <div style={{flexGrow: 1}}></div>
                    <Button className="baseButton" onClick={() => {location.href="/articles/post/"}}>+ Post Article</Button>
                </div>
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
                        {this.state.articles.map((article, index) =>
                            <Grid item xs={12} md={6} lg={4}>
                            <ArticleThumbnail 
                                key={index}
                                title={article.title} 
                                username={article.username}
                                date={timestampToString(article.date)} 
                                description={article.description} 
                                thumbImg={article.thumbnail}
                                uid={article.uid}/>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </div>
        );
    }
}

export default Articles;