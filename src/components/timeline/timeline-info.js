import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Timelineinfo({ friends, setFriends }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [coverPath, setCoverPath] = useState("");
  const [propicPath, setProPicPath] = useState("");
  const currentUserId = localStorage.getItem("currentUser");

  useEffect(() => {
    if (!currentUserId) {
      navigate("/login");
    } else {
      fetch("http://localhost:2600/api/users/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentUserId,
        }),
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCurrentUser(data.user);

         /// setCoverPath(
        ///    "uploads/users/" + data.user.coverpic[data.user.coverpic.length - 1]
        ///  );
        //  setProPicPath(
        ////    "uploads/users/" +
        //      data.user.profilepic[data.user.profilepic.length - 1]
        ////  );
          if (response.status === 401) {
            window.location.reload();
          }
        }
      });
    }
  }, []);

  return (
    <div className="feature-photo">
      <figure>
        <img src={coverPath} style={{ height: 400 + "px" }} alt />
      </figure>
      <div className="add-btn">
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
                <img src={propicPath} alt={"profile picture"} />

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
                  <Link className to="/timelinegroups" title data-ripple>
                    Groups
                  </Link>
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
