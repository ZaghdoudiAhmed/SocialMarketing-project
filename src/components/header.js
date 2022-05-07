import { useEffect, useState, React } from "react";

import { Link } from "react-router-dom";
import "./header.css";
import axios from "axios";

function Header({ socket, currentUserId, friends }) {
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    fetch("http://localhost:2600/api/users/me", {
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
      <div class="theme-layout">
        <div className="responsive-header">
          <div className="mh-head first Sticky">
            <span className="mh-btns-left">
              <a className href="#menu">
                <i className="fa fa-align-justify" />
              </a>
            </span>
            <span className="mh-text">
              <Link to="/" title>
                <img
                  width="45"
                  height="45"
                  /*src={"/uploads/users/" + currentUser.profilepic}*/
                  alt
                />
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

        <div class="topbar stick is_stuck" style={{position: "fixed" , top: "0px", width: "1750px"}}>
          <div className="logo">
            <Link to="/" title>
              <img className="logg"src="/images/2nd-Chance-Icon-sm.png" alt />
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
                    <a href="/donations" title>
                      Donations
                    </a>
                  </li>
                  <li>
                    <Link to="/shop" title>
                      Shop
                    </Link>
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
                    <Link to="/edit-profile" title>
                    edit profile
                    </Link>
                  </li>
                </ul>
              </li>
        
              <li className={'test-li'}>
                <Link to={'/ads-management'}>ADS Management<i className="bi bi-star-fill test-i"/></Link>
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
                <div
                  className="icon"
                  title="Notification"
                  onClick={() => setOpen(!open)}
                >
                  <i className="ti-bell" />
                  {notifications.length > 0 && (
                    <span className="counter">{notifications.length}</span>
                  )}
                </div>
                {open && (
                  <div className="notifications">
                    <span>{notifications.length} New Notifications</span>
                    <ul>
                      {notifications.map((n) => (
                        <>
                          <li key={n._id}>
                            <a href="/notification" title>
                              <img
                                src={
                                  "/uploads/users/" + n?.sender?.profilepic[0]
                                }
                                alt
                              />
                              <div>
                                <h6>{n?.sender?.name}</h6>
                                <p>{n?.text}</p>
                              </div>
                            </a>
                            {/* <span className="tag green">seen</span> */}
                          </li>
                        </>
                      ))}
                    </ul>
                    {/* <button
                      //   onClick={handleRead}
                      className="btn btn-primary-outline"
                    >
                      delete
                    </button> */}
                  </div>
                )}
              </li>
            </ul>
            <div className="user-img">
              <img
                width="35"
                height="35"
              src={"/uploads/users/" + currentUser.profilepic}
                alt
              />
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
          
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
