import React, { Component } from "react";
import bird from '../assets/bird.svg';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {convertToLink, timestampToString, FORUMCATEGORIES} from '../utils.js';

import '../styles/App.css';
import db from '../firebase';

class ForumThumbnail extends Component {
    constructor(props) {
        super(props);

        this.state = {latestThread : {
            title: "Thread title",
            date: {seconds: 1660806000, nanoseconds: 575000000}
        }};
      }

    componentDidMount() {
        this.getLatestThreadFrom(this.props.category);
    }

    getLatestThreadFrom = (category) => {
        db.collection("threads").where("category", "==", category).orderBy("date", "asc").get().then(snapshot => {
            this.setState({latestThread: snapshot.docs[snapshot.docs.length - 1].data()});
        }
        );
    }
    
      render() {
        return(
            <div className="post">
                <div style={{display:"inline-block"}}>
                    <img src={this.props.icon} style={{width: "52px"}}></img>
                </div>
                <div style={{display:"inline-block"}}>
                    <a href={"/forums/" + convertToLink(this.props.category)}>
                        <Typography variant="h6"> {this.props.category} </Typography>
                    </a>
                    <Typography variant="body1"> {this.state.latestThread.title}  | {timestampToString(this.state.latestThread.date)} </Typography>
                </div>
            </div>
        );
      }
}

class Forums extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
        return (
            <div>
                <Typography variant="h3" className="heading">Raising Backyard Quails</Typography>
                <Box className="outlinedWhiteBox">
                    {FORUMCATEGORIES.map((category) => 
                        <ForumThumbnail key={category} category={category} icon={bird}/>
                    )}
                </Box>
            </div>
        );
    }
}

export default Forums;