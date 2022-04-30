import React,{useEffect} from 'react';
import { Link, Routes, Route, useNavigate } from "react-router-dom";
function Machinelearning(props) {
  const navigate = useNavigate();
    var myIndex = 0;
    useEffect(() => {
    },[])
   


    return (
<div>
    <div >
      <div className="animation-area">
        <div className="animation-area .container-sm" >
          <p>Real time image</p>
          <p>To detect your emotion using the webcam feed</p>
            <input onClick={()=>{navigate('/videofeed')}} type="submit" name="Real Time Image" defaultValue="Real Time Image" className="button" />

        </div>
      </div>
    </div>
  </div>


    );
}

export default Machinelearning;