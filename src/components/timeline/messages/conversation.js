import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const friendId = conversation.members.find((m) => m !== currentUser._id);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/users/" + friendId
      );
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, [currentUser, conversation]);

  return (
    <li>
      <figure>
        <img
          src={
            user?.profilepic[0]
              ? user.profilepic[0]
              : "images/resources/friend-avatar2.jpg"
          }
          // src="images/resources/friend-avatar2.jpg"
          alt
        />
        <span className="status f-online" />
      </figure>
      <div className="people-name">
        <span>{user?.name}</span>
      </div>
    </li>
  );
}
