import React, { Component } from "react";
import profile from '../assets/profile3.svg';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import '../styles/App.css';
import db from '../firebase';

class ThreadThumbnail extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
            <a href={"/threads/" + this.props.id}>
                <div>
                    <div style={{display:"inline-block"}}>
                        <img src={profile} style={{width: "49px"}}></img>
                    </div>
                    <div style={{display:"inline-block"}}>
                        <Typography variant="h6"> {this.props.title} </Typography>
                        <Typography variant="body1"> {this.props.category} </Typography>
                        <Typography variant="body1"> {this.props.username} | 5 minutes ago </Typography>
                    </div>
                </div>
            </a>
        );
    }
}

class NewThreads extends Component {
    constructor(props) {
      super(props);

      this.state = {
        threads: [],
        };
    }
  
    componentDidMount() {
        // Update threads realtime
        db.collection("threads").orderBy("date", "desc").onSnapshot(snapshot => 
            this.setState({
                threads: snapshot.docs.slice(0, 5).map(x => {
                        const data = x.data();
                        const id = x.id;
                        return { id, ...data };
            })
            })
        );
    }

    render() {
        return (
            <div>
            <Typography variant="h3" className="heading">New Posts</Typography>
                <Box className="colorBox columnPosts">
                {this.state.threads.map((thread, index) =>
                        <ThreadThumbnail key={index} id={thread.id} title={thread.title} date={thread.date} username={thread.username} category={thread.category}/>                      
                    )
                }
                </Box>
            </div>
        );
    }
}

export default NewThreads;