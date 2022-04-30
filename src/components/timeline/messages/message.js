import React, { useState, useEffect, useRef } from "react";
import { format } from "timeago.js";
import "./message.css";
import axios from "axios";

function Message({ message, own, currentUser }) {
  const [response , setresponse]=useState(null);
  console.log(message)
  useEffect(()=>{
    if (message.sender._id){
       axios.get("http://localhost:2600/api/users/"+ message.sender._id).then((response) => {
      console.log(response.data)
      setresponse(response.data);
            })
    }
   else{
    axios.get("http://localhost:2600/api/users/"+ message.sender).then((response) => {
      console.log(response.data)
      setresponse(response.data);
            })
   }
  },[])

  return (
    <li className={own ? "me" : "you"}>
      <figure>
        <img
          height="32"
          width="32"
          src={"/uploads/users/" + response?.profilepic}
          alt
        />
        
      </figure>
      <p>{message.text}</p>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </li>
  );
}

export default Message;
