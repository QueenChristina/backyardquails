import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar.js';
import NewPosts from './components/NewPosts.js';
import FeaturedContent from "./components/FeaturedContent.js";
import Thread from "./components/Thread.js";
import Forums from "./components/Forums.js";
import Articles from "./components/Articles.js";

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
      <div className="pageContainer">
        <NavBar/>
        <div className="contentContainer">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Routes>
                <Route path="/" element={<FeaturedContent/>}/>
                <Route path="/forums" element={<Forums/>}/>
                <Route path="/articles" element={<Articles/>}/>
                <Route path="/threads/post" element={<Thread/>}/>
                <Route path="*" element={<p>Link not found.</p>} />
              </Routes>
            </Grid>
            <Grid item xs={12} md={4}>
              <NewPosts/>
            </Grid>
        </Grid>
        </div>
        <div style={{flexGrow: 1}}></div>
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