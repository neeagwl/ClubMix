import React from 'react'
import Video from './Video';
import video from '../assets/video.mp4';
import {Button} from 'react-bootstrap';

const videoStyle = {
    position :"relative",
    height :"30rem",
    width :"100%",
    backgroundColor : "black",
    position : "fixed",
    marginBottom : "0"
}

const heading = {
    marginTop :"40px",
    textAlign:"center",
    color : "#8a165f"
}


const tagline = {
    textAlign:"center"
}

const overText = {
    color : "#b5d46e",
    position: "absolute",
        zIndex: "999",
        margin: "0 auto",
        left: "0",
        right: "0",
        top: "85%",
        textAlign : "center"
}



const App = () => {
    return (
        <div >

            <h1 my-2 style= {heading}>Welcome to ClubMix!</h1>
            <h5 style = {tagline}>Discover the Possibilities with US!</h5>
           <Video style = {videoStyle} source={video}/>
            <h4 style={overText}>MNNIT, One Conservatory, One Community, Infinite Possibilities</h4>
        </div>
    )
}

export default App
