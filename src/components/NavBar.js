import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Bird } from '../assets/bird.svg';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as ProfileIcon } from '../assets/profile3.svg';
import { ReactComponent as PaperIcon } from '../assets/paper.svg';
import { ReactComponent as TextBubbleIcon } from '../assets/text-bubble-round.svg';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../styles/App.css';

class NavBar extends Component {
    constructor() {
      super();
    }

    goTo = (link) => {
        location.href=link;
    }
  
    render() {
        return (
        <header className="navBar">
            <Bird style={{maxWidth: "52px", maxHeight: "52px", fill: "white"}}/>
            <Typography variant="h2" style={{fontSize: "2rem", padding: "0px 10px"}}  onClick={() => { this.goTo("/");}}>BackyardQuails</Typography>
            
            <Button className="baseButton" onClick={() => { this.goTo("/forums");}}>
                <TextBubbleIcon className="icon"/>
                Forums
            </Button>
            <Button className="baseButton" onClick={() => { this.goTo("/articles");}}>
                <PaperIcon className="icon"/>
                Articles
            </Button>
            <div style={{ flex: 1 }}></div>
            <Button className="baseButton" onClick={() => { console.log("TODO: login");}}>
                <ProfileIcon className="icon"/>
                Log In
            </Button>
            <Button className="baseButton" onClick={() => { console.log("TODO: search");}}>
                <SearchIcon  className="icon"/>
                Search
            </Button>
        </header>
        );
    }
}

export default NavBar;