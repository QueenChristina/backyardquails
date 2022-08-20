import React, { Component } from "react";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {convertToLink, timestampToString} from '../utils.js';

import '../styles/App.css';
import db from '../firebase';

class ArticleThumbnail extends Component {
    constructor() {
        super();
      }
    
      render() {
        return(
            <a href={"/article/" + convertToLink(this.props.title) + "." + this.props.uid}>
                <Box sx={{position: "relative", marginBottom: "16px"}}>
                    <Typography variant="body1" className="imgLabel">{this.props.title}</Typography>
                    <img src={this.props.thumbImg} style={{width: "100%", maxHeight: "100%"}}></img>
                </Box>
            </a>
        );
      }
}

class FeaturedContent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        topArticles : [],
      }
    }

    componentDidMount() {
        db.collection("articles").orderBy("date", "asc").onSnapshot(snapshot => 
            this.setState({
                topArticles: snapshot.docs.slice(0, 4).map(x => {
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
            <Typography variant="h3" className="heading">Featured Content</Typography>
            <Box className="colorBox">    
                <Grid container spacing={2}>
                    {this.state.topArticles.map((article, index) =>
                            <Grid item xs={12} md={6}>
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

export default FeaturedContent;