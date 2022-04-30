import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { io } from "socket.io-client";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
const Videofeed =() => {
  const navigate = useNavigate();
    const [x,setx]=useState(null)
    const [y,sety]=useState(null)
    const getimage =() =>{
axios.get('http://127.0.0.1:8000/hub/takeimage').then((res)=>{
  console.log(res.data)
  setx(res.data['pred'])
  sety(res.data['bar'])
})
    }
    useEffect(  () => {
    //const video = document.createElement("video");
 ///axios.get('http://127.0.0.1:8000/hub/video_feed').then((response) =>{
    ///console.log(response);
////})
    },[x])
    return (
         <div className="banner-text">
  <div className="animation-area">
    <h1 style={{color: '#0A043C'}}>Capturing your Image</h1>
<img src={"data:image/jpeg;base64,"+x}></img>
<img src={"data:image/jpeg;base64,"+y}></img>
    <br />
    <h3 style={{color: '#0A043C'}}>Do you want to figure out your emotion? Well, what are you waiting for</h3>
    <div className="center">
        <input onClick={getimage} type="submit" name="Click the Photo" defaultValue="Click an Image" className="button" />

    </div>
  </div>
</div>



    
    );
}

export default Videofeed;
