import React from "react";
import { Link } from "react-router-dom";

function Shortcuts(props) {
  const Remove = () => {
    localStorage.removeItem("currentUser");
    window.reload();
  };
  return (
    <div className="widget">
      <h4 className="widget-title">Shortcuts</h4>
      <ul className="naves">
        <li>
          <i className="ti-instagram" />
          <Link to="/timelinestories" title>
            Stories
          </Link>
        </li>
        <li>
          <i className="ti-user" />
          <Link to="/timelinefriends" title>
            friends
          </Link>
        </li>
        <li>
          <i className="ti-image" />
          <Link to="/timelinephotos" title>
            images
          </Link>
        </li>
        <li>
          <i className="ti-video-camera" />
          <Link to="/timelinevideos" title>
            videos
          </Link>
        </li>
        <li>
          <i className="ti-comments-smiley" />
          <Link to="/messages">Messages</Link>
        </li>
        <li>
          <i className="ti-bell" />
          <Link to="/notification" title>
            Notifications
          </Link>
        </li>
        <li>
          <i className="ti-direction" />
          <Link to="/donations">Donations</Link>
        </li>
        <li>
          <i className="ti-direction" />
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <i className="ti-power-off" />
          <a onClick={Remove} title>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Shortcuts;
