import React from "react";
import { Link } from "react-router-dom";

function Timelineinfo(props) {
  return (
    <div className="timeline-info">
      <ul>
        <li className="admin-name">
          <h5>Janice Griffith</h5>
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
  );
}

export default Timelineinfo;
