import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Bird } from '../assets/bird.svg';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as ProfileIcon } from '../assets/profile3.svg';
import { ReactComponent as PaperIcon } from '../assets/paper.svg';
import { ReactComponent as TextBubbleIcon } from '../assets/text-bubble-round.svg';
import Login from "./Login";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import '../styles/App.css';
import { auth } from "../firebase";

class NavBar extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        isLoggedIn: false,
        loginButtonKey: 0,
        menuAnchor: null,
        fbIsInitialized: false
      }

      console.log(auth.currentUser);
    }

    componentDidMount() {
        this.authIsInitialized().then(val => {
            this.setState({
                fbIsInitialized: val,
                isLoggedIn: Boolean(auth.currentUser)
            });

            console.log("Fb is initialized");
            console.log(auth.currentUser);
        })
    }

    authIsInitialized = () => {
        return new Promise(resolve => {
            auth.onAuthStateChanged(resolve)
        })
    }

    openAccountMenu = (event) => {
        this.setState( {
            menuAnchor: event.currentTarget
        });
    }

    closeAccountMenu = () => {
        this.setState({
            menuAnchor: null,
            loginButtonKey: this.state.loginButtonKey + 1
        });
    }

    logOut = async () => {
        this.setState({
            isLoggedIn: false,
        })
        this.closeAccountMenu();
        this.props.refresh();
        return auth.signOut();
    }

    goTo = (link) => {
        location.href=link;
    }
  
    render() {
        return (
        <header className="navBar">
            <Bird style={{maxWidth: "52px", maxHeight: "52px", fill: "white"}}/>
            <Typography variant="h2" style={{fontSize: "2rem", padding: "0px 10px", margin: "auto"}}  onClick={() => { this.goTo("/");}}>BackyardQuails</Typography>
            
            <Button className="baseButton" onClick={() => { this.goTo("/forums");}}>
                <TextBubbleIcon className="icon"/>
                Forums
            </Button>
            <Button className="baseButton" onClick={() => { this.goTo("/articles");}}>
                <PaperIcon className="icon"/>
                Articles
            </Button>
            <div style={{ flex: 1 }}></div>

            <div className="baseButton" key={this.state.fbIsInitialized}>
            <div key={this.state.loginButtonKey}>
            {(auth.currentUser) ? 
                (
                <div>
                    <Button onClick={this.openAccountMenu}>
                        <ProfileIcon className="icon"/>
                        {auth.currentUser.displayName}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={this.state.menuAnchor}
                        open={Boolean(this.state.menuAnchor)}
                        onClose={this.closeAccountMenu}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={this.closeAccountMenu}>My account</MenuItem>
                        <MenuItem onClick={this.logOut}>Logout</MenuItem>
                    </Menu>
                
                </div>
                )
                : 
                <Button onClick={() => {
                    this.props.handleOpenLogin();
                    }}>
                    <ProfileIcon className="icon"/>
                    Log In
                </Button>
            }
            </div>
        </div>
            <Button className="baseButton" onClick={() => { console.log("TODO: search");}}>
                <SearchIcon  className="icon"/>
                Search
            </Button>
        </header>
        );
    }
}

export default NavBar;