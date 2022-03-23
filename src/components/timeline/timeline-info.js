import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Timelineinfo({ friends, setFriends }) {
  const [currentUser, setCurrentUser] = useState("");
  const currentUserId = localStorage.getItem("currentUser");

  useEffect(() => {
    fetch("http://localhost:3000/api/users/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId,
      }),
    }).then(async (res) => {
      const data = await res.json();
      setCurrentUser(data.user);
    });
  }, []);

  return (
    <div className="feature-photo">
      <figure>
        <img src="images/resources/timeline-1.jpg" alt />
      </figure>
      <div className="add-btn">
        <span>{friends.length} followers</span>
        <a href="#" title data-ripple>
          Add Friend
        </a>
      </div>
      <form className="edit-phto">
        <i className="fa fa-camera-retro" />
        <label className="fileContainer">
          Edit Cover Photo
          <input type="file" />
        </label>
      </form>
      <div className="container-fluid">
        <div className="row merged">
          <div className="col-lg-2 col-sm-3">
            <div className="user-avatar">
              <figure>
                <img src="images/resources/user-avatar.jpg" alt />
                <form className="edit-phto">
                  <i className="fa fa-camera-retro" />
                  <label className="fileContainer">
                    Edit Display Photo
                    <input type="file" />
                  </label>
                </form>
              </figure>
            </div>
          </div>
          <div className="col-lg-10 col-sm-9">
            <div className="timeline-info">
              <ul>
                <li className="admin-name">
                  <h5>{currentUser.name}</h5>
                  <span>Group Admin</span>
                </li>
                <li>
                  <Link className="active" to="/timeline" title data-ripple>
                    time line
                  </Link>
                  <Link
                    className
                    to={{
                      pathname: "/timelinephotos",
                    }}
                    title
                    data-ripple
                  >
                    Photos
                  </Link>
                  <Link className to="/timelinevideos" title data-ripple>
                    Videos
                  </Link>
                  <Link className to="/timelinefriends" title data-ripple>
                    Friends
                  </Link>
                  <a className href="timeline-groups.html" title data-ripple>
                    Groups
                  </a>
                  <Link className to="/about" title data-ripple>
                    about
                  </Link>
                  <a className href="#" title data-ripple>
                    more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timelineinfo;
