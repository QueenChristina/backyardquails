import React, { Component, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from "@material-ui/core";

// import {useAuth } from '../contexts/AuthContext.js';
import { auth } from "../firebase";
import db from "../firebase";
import AuthProvider from "../contexts/AuthContext.js";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // open : false,
            isSignUp: this.props.isSignUp,
            email : "",
            password: "",
            loading: false,
            errorMessage: ""
        }

        // const {signup, currentUser} = useAuth();
      }

    //   handleClickOpen = () => {
    //     this.setState({
    //         open: true,
    //     });
    //   }
    
    //   handleClose = () => {
    //     this.setState({
    //         open: false,
    //     });
    //   }

    signUp = async () => {
        try {
            // await AuthProvider.signup("Bobby", this.state.email, this.state.password);
            await auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
            auth.currentUser.updateProfile({
                displayName: "Bobby"
            })

            if (!auth.currentUser) {console.log("Not authorized")} else {
                console.log(db.doc('users/' + auth.currentUser.uid))}
            this.props.handleClose();
            return true; // successfully signed up
        } catch(error) {
            console.log(error.message);
            this.setState({
                errorMessage: error.message
            });
            return false;
        }
    }

    login = async () => {
        try {
            auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                if (!auth.currentUser) {console.log("Not authorized")} else {
                    console.log(db.doc('users/' + auth.currentUser.uid))}

                this.props.handleClose();
                return true;
            }).catch((error)=>{
                console.log(error.message);
                this.setState({
                    errorMessage: error.message
                })
                return false;
            });
            
        } catch(error) {
            console.log(error.message);
            this.setState({
                errorMessage: error.message
            });
            return false;
        }
        
    }

      handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
      
      handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit = (event) => {
        let success = false;
        if (this.state.email != "" && this.state.password != "") {
            if (this.state.isSignUp) {
                this.setState({
                    loading: true
                })
                success = this.signUp().then(()=>{
                    this.setState({
                        loading: false
                    });
                });
            } else {
                success = this.login();
            }
    
            console.log("Submitted");
            // if (success) {
            //     this.props.handleClose();
            // }
        } else {
            this.setState({
                errorMessage: "Email and passwords field empty."
            })
        }

    }
    
      render() {
        
          return (
            // <AuthProvider>
            <div>
                <Dialog open={this.props.open} onClose={this.props.handleClose} style={{minWidth: "min(500px, 64vw)"}}>
                    <DialogTitle>
                        {this.state.isSignUp ? "Sign Up" : "Log In"}
                    </DialogTitle>
                    <DialogContent>
                    <Typography variant="body1" style={{color: "red"}}>{(this.state.errorMessage != "") && this.state.errorMessage}</Typography>
                    {/* <DialogContentText>
                        {auth.currentUser ?
                            ('Current user: ' + auth.currentUser.email + auth.currentUser.displayName) : 'Noone is currently signed in.'}
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-required"
                        label="Email Address"
                        onChange={this.handleChangeEmail}
                        value={this.state.email}
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    {/* <DialogContentText>
                        Password
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-password-input"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        fullWidth
                        type="password"
                        variant="standard"
                        autoComplete="current-password"
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={this.state.loading} onClick={this.handleSubmit}> {this.state.isSignUp ? "Sign Up" : "Log In"} </Button>
                    </DialogActions>
                    <DialogContent>
                        <Typography variant="body1" style={{display:"inline"}}>{this.state.isSignUp ? "Already have an account?" : "Don't have an account?"}</Typography>
                        <Button onClick={()=>this.setState({isSignUp: !this.state.isSignUp})}> {this.state.isSignUp ? "Log In" : "Sign Up"} </Button>
                    </DialogContent>
                </Dialog>
            </div>
            // </AuthProvider>
          );
      }
}

export default Login;