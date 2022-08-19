import React, { Component } from "react";
import bird from '../assets/bird.svg';

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
                <div style={{display:"inline-block"}}>
                    <img src={bird} style={{width: "52px"}}></img>
                </div>
                <div style={{display:"inline-block"}}>
                    <a href="/threads/post">
                        <Typography variant="h6"> {this.props.title} </Typography>
                    </a>
                    <Typography variant="body1"> {this.props.latestPost}  | {this.props.time} ago </Typography>
                </div>
            </div>
        );
      }
}

class Forums extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
            <div>
                <Typography variant="h3" className="heading">Raising Backyard Quails</Typography>
                <Box  className="outlinedWhiteBox">
                    <Forum title="Incubating and Hatching Eggs" latestPost="Latest Post" time="5 minutes"/>
                    <Forum title="Raising Babies" latestPost="Latest Post" time="5 minutes"/>
                    <Forum title="Aviary and Coop - Design, Construction, Maintenance" latestPost="Latest Post" time="5 minutes"/>
                    <Forum title="Feeding and Watering" latestPost="Latest Post" time="5 minutes"/>
                    <Forum title="Emergencies and Injuries" latestPost="Latest Post" time="5 minutes"/>
                    <Forum title="Predators and Pests" latestPost="Latest Post" time="5 minutes"/>
                    <Forum title="Behaviors and Eggs" latestPost="Latest Post" time="5 minutes"/>
                    <Forum title="Meat Bird" latestPost="Latest Post" time="5 minutes"/>
                    <Forum title="Laws" latestPost="Latest Post" time="5 minutes"/>
                    <Forum title="Pictures and Stories" latestPost="Latest Post" time="5 minutes"/>
                </Box>
            </div>
        );
    }
}

export default Forums;