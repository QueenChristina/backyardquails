import React, { Component } from "react";
import bird from '../assets/bird.svg';
import search from '../assets/search.svg';
import profile from '../assets/profile3.svg';
import paper from '../assets/paper.svg';
import textBubble from '../assets/text-bubble-round.svg';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class NavBar extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
        <header style={{display: "flex"}}>
            <img src={bird} style={{maxWidth: "50px"}}></img>
            <Typography variant="h2">BackyardQuails</Typography>
            <div style={{ flex: 1 }}></div>
            <Button>
                <img src={textBubble} style={{maxWidth: "24px"}}></img>
                Forums
            </Button>
            <Button>
                <img src={paper} style={{maxWidth: "24px"}}></img>
                Articles
            </Button>
            <Button>
                <img src={profile} style={{maxWidth: "24px"}}></img>
                Log In
            </Button>
            <Button>
                <img src={search} style={{maxWidth: "24px"}}></img>
                Search
            </Button>
        </header>
        );
    }
}

export default NavBar;