import React from "react";
import { format } from "timeago.js";
import "./message.css";

function message({ message, own, currentUser }) {
  return (
    <li className={own ? "me" : "you"}>
      <figure>
        <img
          height="32"
          width="32"
          src={"/uploads/users/" + message?.sender?.profilepic}
          alt
        />
      </figure>
      <p>{message.text}</p>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </li>
  );
}

export default message;
