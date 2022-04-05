import { useEffect, useState, React } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

function Header({ socket, currentUserId, friends }) {
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

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
    <>
      <div className="responsive-header">
        <div className="mh-head first Sticky">
          <span className="mh-btns-left">
            <a className href="#menu">
              <i className="fa fa-align-justify" />
            </a>
          </span>
          <span className="mh-text">
            <Link to="/" title>
              <img src="images/logo2.png" alt />
            </Link>
          </span>
          <span className="mh-btns-right">
            <a className="fa fa-sliders" href="#shoppingbag" />
          </span>
        </div>
        <div className="mh-head second">
          <form className="mh-form">
            <input placeholder="search" />
            <a href="#/" className="fa fa-search" />
          </form>
        </div>
        <nav id="shoppingbag">
          <div>
            <div className>
              <form method="post">
                <div className="setting-row">
                  <span>use night mode</span>
                  <input type="checkbox" id="nightmode" />
                  <label
                    htmlFor="nightmode"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
                <div className="setting-row">
                  <span>Notifications</span>
                  <input type="checkbox" id="switch2" />
                  <label
                    htmlFor="switch2"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
                <div className="setting-row">
                  <span>Notification sound</span>
                  <input type="checkbox" id="switch3" />
                  <label
                    htmlFor="switch3"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
                <div className="setting-row">
                  <span>My profile</span>
                  <input type="checkbox" id="switch4" />
                  <label
                    htmlFor="switch4"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
                <div className="setting-row">
                  <span>Show profile</span>
                  <input type="checkbox" id="switch5" />
                  <label
                    htmlFor="switch5"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
              </form>
              <h4 className="panel-title">Account Setting</h4>
              <form method="post">
                <div className="setting-row">
                  <span>Sub users</span>
                  <input type="checkbox" id="switch6" />
                  <label
                    htmlFor="switch6"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
                <div className="setting-row">
                  <span>personal account</span>
                  <input type="checkbox" id="switch7" />
                  <label
                    htmlFor="switch7"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
                <div className="setting-row">
                  <span>Business account</span>
                  <input type="checkbox" id="switch8" />
                  <label
                    htmlFor="switch8"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
                <div className="setting-row">
                  <span>Show me online</span>
                  <input type="checkbox" id="switch9" />
                  <label
                    htmlFor="switch9"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
                <div className="setting-row">
                  <span>Delete history</span>
                  <input type="checkbox" id="switch10" />
                  <label
                    htmlFor="switch10"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
                <div className="setting-row">
                  <span>Expose author name</span>
                  <input type="checkbox" id="switch11" />
                  <label
                    htmlFor="switch11"
                    data-on-label="ON"
                    data-off-label="OFF"
                  />
                </div>
              </form>
            </div>
          </div>
        </nav>
      </div>

      <div className="topbar stick">
        <div className="logo">
          <Link to="/" title>
            <img src="/images/logo.png" alt />
          </Link>
        </div>
        <div className="top-area">
          <ul className="main-menu">
            <li>
              <Link to="/" title>
                Home
              </Link>
              <ul>
                <li>
                  <Link to="/" title>
                    Home Social
                  </Link>
                </li>
                <li>
                  <a href="index2.html" title>
                    Home Social 2
                  </a>
                </li>
                <li>
                  <Link to="/company" title>
                    Home Company
                  </Link>
                </li>
                <li>
                  <a href="landing.html" title>
                    Login page
                  </a>
                </li>
                <li>
                  <a href="logout.html" title>
                    Logout Page
                  </a>
                </li>
                <li>
                  <a href="newsfeed.html" title>
                    news feed
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/" title>
                timeline
              </Link>
              <ul>
                <li>
                  <Link to="/timeline">timeline</Link>
                </li>
                <li>
                  <Link to="/timelinefriends" title>
                    timeline friends
                  </Link>
                </li>
                <li>
                  <Link to="/timelinegroups" title>
                    timeline groups
                  </Link>
                </li>
                <li>
                  <Link to="/tim" title>
                    timeline pages
                  </Link>
                </li>
                <li>
                  <Link to="/timelinephotos" title>
                    timeline photos
                  </Link>
                </li>
                <li>
                  <Link to="/timelinevideos" title>
                    timeline videos
                  </Link>
                </li>
                <li>
                  <a href="fav-page.html" title>
                    favourit page
                  </a>
                </li>
                <li>
                  <a href="groups.html" title>
                    groups page
                  </a>
                </li>
                <li>
                  <a href="page-likers.html" title>
                    Likes page
                  </a>
                </li>
                <li>
                  <a href="people-nearby.html" title>
                    people nearby
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" title>
                account settings
              </a>
              <ul>
                <li>
                  <Link to="/edit-profile" title>
                    Edit profile
                  </Link>
                </li>
                <li>
                  <Link to="/edit-password" title>
                    edit password
                  </Link>
                </li>
                <li>
                  <Link to="/user-management" title>
                    user management
                  </Link>
                </li>
                <li>
                  <a href="edit-password.html" title>
                    edit-password
                  </a>
                </li>
                <li>
                  <a href="edit-profile-basic.html" title>
                    edit profile basics
                  </a>
                </li>
                <li>
                  <a href="edit-work-eductation.html" title>
                    edit work educations
                  </a>
                </li>
                <li>
                  <Link to="/messages" title>
                    message box
                  </Link>
                </li>
                <li>
                  <a href="inbox.html" title>
                    Inbox
                  </a>
                </li>
                <li>
                  <a href="notifications.html" title>
                    notifications page
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" title>
                more pages
              </a>
              <ul>
                <li>
                  <a href="404.html" title>
                    404 error page
                  </a>
                </li>
                <li>
                  <a href="about.html" title>
                    about
                  </a>
                </li>
                <li>
                  <a href="contact.html" title>
                    contact
                  </a>
                </li>
                <li>
                  <a href="faq.html" title>
                    faq's page
                  </a>
                </li>
                <li>
                  <a href="insights.html" title>
                    insights
                  </a>
                </li>
                <li>
                  <a href="knowledge-base.html" title>
                    knowledge base
                  </a>
                </li>
                <li>
                  <a href="widgets.html" title>
                    Widgts
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="setting-area">
            <li>
              <a title="Home" data-ripple>
                <i className="ti-search" />
              </a>
              <div className="searched">
                <form method="post" className="form-search">
                  <input type="text" placeholder="Search Friend" />
                  <button data-ripple>
                    <i className="ti-search" />
                  </button>
                </form>
              </div>
            </li>
            <li>
              <Link to="/" title="Home" data-ripple>
                <i className="ti-home" />
              </Link>
            </li>
            <li>
              <a href="#" title="Notification" data-ripple>
                <i className="ti-bell" />
                {notifications.length > 0 && (
                  <span>{notifications.length}</span>
                )}
              </a>
              <div className="dropdowns">
                <span>{notifications.length} New Notifications</span>
                <ul className="drops-menu">
                  {notifications.map((n) => (
                    <li key={n._id}>
                      <a href="notifications.html" title>
                        <img src="/images/resources/thumb-3.jpg" alt />
                        <div className="mesg-meta">
                          <h6>{n?.sender?.name}</h6>
                          <p className="notification">{n?.text}</p>
                        </div>
                      </a>
                      <span className="tag green">seen</span>
                    </li>
                  ))}
                </ul>
                <button
                  //   onClick={handleRead}
                  className="btn btn-primary-outline"
                >
                  delete
                </button>
              </div>
            </li>
            <li>
              <a href="#" title="Messages" data-ripple>
                <i className="ti-comment" />
                <span>12</span>
              </a>
              <div className="dropdowns">
                <span>5 New Messages</span>
                <ul className="drops-menu">
                  <li>
                    <a href="notifications.html" title>
                      <img src="/images/resources/thumb-1.jpg" alt />
                      <div className="mesg-meta">
                        <h6>sarah Loren</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </a>
                    <span className="tag green">New</span>
                  </li>
                  <li>
                    <a href="notifications.html" title>
                      <img src="/images/resources/thumb-2.jpg" alt />
                      <div className="mesg-meta">
                        <h6>Jhon doe</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </a>
                    <span className="tag red">Reply</span>
                  </li>
                  <li>
                    <a href="notifications.html" title>
                      <img src="/images/resources/thumb-3.jpg" alt />
                      <div className="mesg-meta">
                        <h6>Andrew</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </a>
                    <span className="tag blue">Unseen</span>
                  </li>
                  <li>
                    <a href="notifications.html" title>
                      <img src="/images/resources/thumb-4.jpg" alt />
                      <div className="mesg-meta">
                        <h6>Tom cruse</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </a>
                    <span className="tag">New</span>
                  </li>
                  <li>
                    <a href="notifications.html" title>
                      <img src="/images/resources/thumb-5.jpg" alt />
                      <div className="mesg-meta">
                        <h6>Amy</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </a>
                    <span className="tag">New</span>
                  </li>
                </ul>
                <a href="messages.html" title className="more-mesg">
                  view more
                </a>
              </div>
            </li>
            <li>
              <a href="#" title="Languages" data-ripple>
                <i className="fa fa-globe" />
              </a>
              <div className="dropdowns languages">
                <a href="#" title>
                  <i className="ti-check" />
                  English
                </a>
                <a href="#" title>
                  Arabic
                </a>
                <a href="#" title>
                  Dutch
                </a>
                <a href="#" title>
                  French
                </a>
              </div>
            </li>
          </ul>
          <div className="user-img">
            <img src="/images/resources/admin.jpg" alt />
            <span className="status f-online" />
            <div className="user-setting">
              <a href="#" title>
                <span className="status f-online" />
                online
              </a>
              <a href="#" title>
                <span className="status f-away" />
                away
              </a>
              <a href="#" title>
                <span className="status f-off" />
                offline
              </a>
              <Link to="/about" title>
                <i className="ti-user" /> view profile
              </Link>
              <a href="#" title>
                <i className="ti-pencil-alt" />
                edit profile
              </a>
              <a href="#" title>
                <i className="ti-target" />
                activity log
              </a>
              <a href="#" title>
                <i className="ti-settings" />
                account setting
              </a>
              <a href="#" title>
                <i className="ti-power-off" />
                log out
              </a>
            </div>
          </div>
          <span className="ti-menu main-menu" data-ripple />
        </div>
      </div>
    </>
  );
}

export default Header;