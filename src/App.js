import React, { Component } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar.js';
import NewThreads from './components/NewThreads.js';
import NewThread from "./components/NewThread.js";
import FeaturedContent from "./components/FeaturedContent.js";
import Thread from "./components/Thread.js";
import Forums from "./components/Forums.js";
import Articles from "./components/Articles.js";
import Forum from "./components/Forum.js";
import TextEditor from "./components/TextEditor.js";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './styles/App.css';
import db from './firebase';


class App extends Component {
  constructor() {
    super();
  }

  render() {
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
                <Route path="/threads/*" element={<Thread/>}/>
                <Route path="/forums/post-thread/*" element={<NewThread/>}/>
                <Route path="/text-editor" element={<TextEditor/>}/>
                <Route path="*" element={<p>Link not found.</p>} />

                <Route path="/forums/incubating-and-hatching-eggs" element={<Forum category="Incubating and Hatching Eggs"/>}/>
                <Route path="/forums/raising-babies" element={<Forum category="Raising Babies"/>}/>
                <Route path="/forums/aviary-and-hutches" element={<Forum category="Aviary and Hutches"/>}/>
                <Route path="/forums/feeding-and-watering" element={<Forum category="Feeding and Watering"/>}/>
                <Route path="/forums/emergencies-diseases-and-injuries" element={<Forum category="Emergencies, Diseases, and Injuries"/>}/>
                <Route path="/forums/predators-and-pests" element={<Forum category="Predators and Pests"/>}/>
                <Route path="/forums/behaviors-and-eggs" element={<Forum category="Behaviors and Eggs"/>}/>
                <Route path="/forums/meat-bird" element={<Forum category="Meat Bird"/>}/>
                <Route path="/forums/laws" element={<Forum category="Laws"/>}/>
                <Route path="/forums/pictures-and-stories" element={<Forum category="Pictures and Stories"/>}/>
              </Routes>
            </Grid>
            <Grid item xs={12} md={4}>
              <NewThreads/>
            </Grid>
        </Grid>
        </div>
        <div style={{flexGrow: 1}}></div>
        <footer>
          <Typography variant="body1" style={{display: "inline", margin: "auto"}}>BackyardQuails (c) 2022</Typography>
          <div style={{ flex: 1 }}></div>
          <Button><a href="google.com" style={{color: "white"}}> Contact Us </a></Button>
          <Button><a href="google.com" style={{color: "white"}}> Terms and Rules </a></Button>
          <Button><a href="google.com" style={{color: "white"}}> Privacy Policy </a></Button>
        </footer>
      </div>
    );
  }
}

export default App;