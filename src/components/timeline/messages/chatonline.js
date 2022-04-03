import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Chatonline({ onlineUsers, currentUserId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  const getFriends = async () => {
    try {
      const friendList = await axios.get(
        "http://localhost:3000/api/users/friends/" + currentUserId
      );
      setFriends(friendList.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        "http://localhost:3000/conversations/find/" +
          currentUserId +
          "/" +
          user._id
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {onlineFriends.map((o) => (
        <li>
          <figure>
            <img
              src={
                o?.profilepic[0]
                  ? o.profilepic[0]
                  : "images/resources/friend-avatar2.jpg"
              }
              alt
            />
          </figure>
          <div className="friend-meta">
            <h4>
              <a href="time-line.html" title>
                {o?.name}
              </a>
            </h4>
            <a href="#" title className="underline">
              Add Friend
            </a>
          </div>
        </li>
      ))}
    </>
  );
}

export default Chatonline;
