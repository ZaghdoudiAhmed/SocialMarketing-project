import React from "react";
import { Link } from "react-router-dom";

function Shortcuts(props) {
  return (
    <div className="widget">
      <h4 className="widget-title">Shortcuts</h4>
      <ul className="naves">
        <li>
          <i className="ti-clipboard" />
          <a href="newsfeed.html" title>
            News feed
          </a>
        </li>
        <li>
          <i className="ti-mouse-alt" />
          <a href="inbox.html" title>
            Inbox
          </a>
        </li>
        <li>
          <i className="ti-files" />
          <a href="fav-page.html" title>
            My pages
          </a>
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
          <i className="ti-share" />
          <a href="people-nearby.html" title>
            People Nearby
          </a>
        </li>
        <li>
          <i className="fa fa-bar-chart-o" />
          <a href="insights.html" title>
            insights
          </a>
        </li>
        <li>
          <i className="ti-direction" />
          <Link to="/company">Company</Link>
        </li>
        <li>
          <i className="ti-power-off" />
          <a href="landing.html" title>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Shortcuts;
