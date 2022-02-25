import React, { useState, useEffect } from "react";

export default function Conversation({ conversation }) {
  return (
    <li>
      <figure>
        <img src="images/resources/friend-avatar2.jpg" alt />
        <span className="status f-online" />
      </figure>
      <div className="people-name">
        <span>Molly cyrus</span>
      </div>
    </li>
  );
}
