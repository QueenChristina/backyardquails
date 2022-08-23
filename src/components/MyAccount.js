import React, { Component, useEffect } from "react";
import {ReactComponent as BackArrow} from '../assets/back-arrow.svg';
import profile from '../assets/profile3.svg';
import { useParams } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";

import {convertToLink, timestampToString} from '../utils.js';

import '../styles/App.css';
import db, { auth } from '../firebase';
import firebase from "firebase/app";

import TextEditor from "./TextEditor";
import draftToHtml from "draftjs-to-html";
import PostReply from "./PostReply";



class MyAccount extends Component {
    constructor(props) {
      super(props);

      this.state = {
        description: "",
        username: "",
        email: "",
        img: "",
        fbIsInitialized: false
    };
    }

    componentDidMount() {
        this.authIsInitialized().then(val => {
            this.setState({
                fbIsInitialized: val,
                isLoggedIn: Boolean(auth.currentUser),
                username: auth.currentUser.displayName,
                email: auth.currentUser.email,
                img: auth.currentUser.photoURL,
            });

        })
    }

    authIsInitialized = () => {
        return new Promise(resolve => {
            auth.onAuthStateChanged(resolve)
        })
    }

    handleChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
        }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
        }

    handleChangePhoto = (event) => {
        this.setState({
            photo: event.target.value
        });
    }

    handleChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        });
        }

    onSubmit = () => {
        console.log("TODO");
        auth.currentUser.updateProfile({
            displayName: this.state.username,
            photoURL: this.state.img,
            email: this.state.email,
        });
        // TODO: Fix this. add user profile
        db.doc('users/' + auth.currentUser.uid).update({
            description: this.state.description
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Typography variant="h3" className="heading">
                        My Account
                    </Typography>
                </div>
                <Box className="outlinedWhiteBox columnPosts" style={{padding: "16px"}}>
                    <div style={{display: "flex"}}>
                        <Typography variant="body1" style={{width: "150px"}}>Username</Typography>
                        <TextField
                            id="filled-basic"
                            label="Username"
                            onChange={this.handleChangeUsername}
                            value={this.state.username}
                            variant="filled"
                            inputProps={{ maxLength: 120 }}
                            style={{flexGrow: 1}}
                            />
                    </div>
                    <div style={{display: "flex"}}>
                        <Typography variant="body1" style={{width: "150px"}}>Email</Typography>
                        <TextField
                            id="filled-basic"
                            label="Email"
                            onChange={this.handleChangeEmail}
                            value={this.state.email}
                            variant="filled"
                            inputProps={{ maxLength: 120 }}
                            style={{flexGrow: 1}}
                            />
                    </div>

                    <div style={{display: "flex"}}>
                        <Typography variant="body1" style={{width: "150px"}}>Image</Typography>
                        <img src={this.state.img}></img>
                        <TextField
                            id="filled-basic"
                            label="Image URL"
                            onChange={this.handleChangePhoto}
                            value={this.state.img}
                            variant="filled"
                            style={{flexGrow: 1}}
                            />
                    </div>

                    <div style={{display: "flex"}}>
                        <Typography variant="body1" style={{width: "150px"}}>About You</Typography>
                        <TextField
                            id="filled-multiline-flexible"
                            label="About You"
                            multiline
                            rows={2}
                            onChange={this.handleChangeDescription}
                            value={this.state.description}
                            variant="filled"
                            maxLength={160}
                            style={{flexGrow: 1}}
                            />
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{flexGrow: 1}}></div>
                        <Button className="baseButton" onClick={this.onSubmit}>Save</Button>
                    </div>

                </Box>
            </div>
        );
    }
}

export default MyAccount;