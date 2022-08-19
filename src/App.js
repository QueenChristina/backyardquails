import React, { Component } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar.js';
import NewThreads from './components/NewThreads.js';
import FeaturedContent from "./components/FeaturedContent.js";
import Thread from "./components/Thread.js";
import Forums from "./components/Forums.js";
import Articles from "./components/Articles.js";
import Forum from "./components/Forum.js";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './styles/App.css';

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
                {/* <Route path="/threads/post" element={<Thread id = 'ry8j2gwkkq4JK0YtBJ4J'/>}/> */}
                <Route path="/threads/:id" element={<Thread id = 'ry8j2gwkkq4JK0YtBJ4J'/>}/>
                <Route path="*" element={<p>Link not found.</p>} />

                <Route path="/forums/incubating-and-hatching-eggs" element={<Forum category="Incubating and Hatching Eggs"/>}/>
                <Route path="/forums/raising-babies" element={<Forum category="Raising Babies"/>}/>
                <Route path="/forums/aviary-design-construction-maintenance" element={<Forum category="Aviary Design, Construction, Maintenance"/>}/>
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