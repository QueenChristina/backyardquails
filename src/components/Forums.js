import React, { Component } from "react";
import bird from '../assets/bird.svg';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {convertToLink, timestampToString, FORUMCATEGORIES} from '../utils.js';

import '../styles/App.css';
import db from '../firebase';

import incubating from '../assets/hatch.png';
import raising from '../assets/chick.png';
import aviary from "../assets/hutch.png";
import feeding from "../assets/feedwater.png";
import disease from "../assets/health.png";
import pred from "../assets/predator.png";
import beh from "../assets/egglaying.png";
import meat from "../assets/meat.png";
import laws from "../assets/law.png";
import pics from "../assets/pic.png";

const FORUMTOPIC = 
        {"Incubating and Hatching Eggs" : incubating,
        "Raising Babies" : raising,
        "Aviary and Hutches" : aviary,
        "Feeding and Watering" : feeding,
        "Emergencies, Diseases, and Injuries" : disease,
        "Predators and Pests" : pred,
        "Behaviors and EggLaying" : beh,
        "Meat Bird" : meat,
        "Laws" : laws,
        "Pictures and Stories" : pics};

class ForumThumbnail extends Component {
    constructor(props) {
        super(props);

        this.state = {latestThread : {
            title: "Thread title",
            date: {seconds: 1660806000, nanoseconds: 575000000},
            uid: "",
            id: ""
        }};
      }

    componentDidMount() {
        this.getLatestThreadFrom(this.props.category);
    }

    getLatestThreadFrom = (category) => {
        db.collection("threads").where("category", "==", category).orderBy("date", "asc").get().then(snapshot => {
            let threadData = snapshot.docs[snapshot.docs.length - 1].data();
            threadData["id"] = snapshot.docs[snapshot.docs.length - 1].id;
            this.setState({latestThread: threadData});
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
                    <a href={"/threads/" + convertToLink(this.state.latestThread.title) + "." + this.state.latestThread.uid} style={{color: "black"}}>
                        <Typography variant="body1"> {this.state.latestThread.title}  | {timestampToString(this.state.latestThread.date)} </Typography>
                    </a>
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
                <div style={{display: "flex", backgroundColor: "#816962"}}>
                    <Typography variant="h3" className="heading">Raising Backyard Quails</Typography>
                    <div style={{flexGrow: 1}}></div>
                    <Button className="baseButton" onClick={() => {location.href="/forums/post-thread/";}}>+ Post Thread</Button>
                </div>
                <Box className="outlinedWhiteBox">
                    {FORUMCATEGORIES.map((category) => 
                        <ForumThumbnail key={category} category={category} icon={FORUMTOPIC[category]}/>
                    )}
                </Box>
            </div>
        );
    }
}

export default Forums;