import React, { Component } from "react";
import bird from '../assets/bird.svg';
import search from '../assets/search.svg';
import profile from '../assets/profile3.svg';
import paper from '../assets/paper.svg';
import textBubble from '../assets/text-bubble-round.svg';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../styles/App.css';

class NavBar extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
        <header className="navBar">
            <img src={bird} style={{maxWidth: "72px", fill: "white"}}></img>
            <Typography variant="h2">BackyardQuails</Typography>
            
            <Button className="baseButton">
                <img src={textBubble} className="icon"></img>
                Forums
            </Button>
            <Button className="baseButton">
                <img src={paper} className="icon"></img>
                Articles
            </Button>
            <div style={{ flex: 1 }}></div>
            <Button className="baseButton">
                <img src={profile} className="icon"></img>
                Log In
            </Button>
            <Button className="baseButton">
                <img src={search} className="icon"></img>
                Search
            </Button>
        </header>
        );
    }
}

export default NavBar;