import React from "react";
import { format } from "timeago.js";
import "./message.css";

function message({ message, own }) {
  return (
    <li className={own ? "me" : "you"}>
      <figure>
        <img src="images/resources/userlist-2.jpg" alt />
      </figure>
      <p>{message.text}</p>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </li>
  );
}

export default message;
