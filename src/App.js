import React, { Component } from "react";
import NavBar from './components/NavBar.js';
import NewPosts from './components/NewPosts.js';
import FeaturedContent from "./components/FeaturedContent.js";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './styles/App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: { text: ''},
      tasks: [],
    };
  }

  render() {
    const { task, tasks } = this.state;

    return (
      <div>
        <NavBar/>
        <div id="content">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <FeaturedContent/>
            </Grid>
            <Grid item xs={12} md={4}>
              <NewPosts/>
            </Grid>
        </Grid>
        </div>
        <footer>
          <Typography variant="body1" style={{display: "inline"}}>BackyardQuails (c) 2022</Typography>
          <div style={{ flex: 1 }}></div>
          <Button><a href="google.com"> Contact Us </a></Button>
          <Button><a href="google.com"> Terms and Rules </a></Button>
          <Button><a href="google.com"> Privacy Policy </a></Button>
        </footer>
      </div>
    );
  }
}

export default App;