import React, { useState, useEffect } from "react";
import Header from "../header";
import Timelineinfo from "./timeline-info";
import axios from "axios";
import { format } from "timeago.js";
import moment from "moment";

function Notification(props) {
  const [currentUser, setCurrentUser] = useState("");

  const currentUserId = localStorage.getItem("currentUser");
  const [friends, setFriends] = useState([]);
  const [allnotifications, setAllNotifications] = useState([]);

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

  const getAllNotif = async () => {
    axios
      .get("http://localhost:3000/notifications/" + currentUserId)
      .then((res) => {
        setAllNotifications(res.data);
      });
  };

  useEffect(() => {
    getFriends();
    getAllNotif();
  }, [currentUserId]);

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
    <div>
      <div className="theme-layout">
        <Header currentUser={currentUser} />
        {/* topbar */}
        <section>
          <Timelineinfo
            friends={friends}
            setFriends={setFriends}
            currentUser={currentUser}
          />
        </section>
        {/* top area */}
        <section>
          <div className="gap gray-bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row" id="page-contents">
                    <div className="col-lg-3">
                      <aside className="sidebar static">
                        <div className="widget">
                          <h4 className="widget-title">Recent Photos</h4>
                          <ul className="recent-photos">
                            <li>
                              <a
                                className="strip"
                                href="images/resources/recent-11.jpg"
                                title
                                data-strip-group="mygroup"
                                data-strip-group-options="loop: false"
                              >
                                <img src="images/resources/recent-1.jpg" alt />
                              </a>
                            </li>
                            <li>
                              <a
                                className="strip"
                                href="images/resources/recent-22.jpg"
                                title
                                data-strip-group="mygroup"
                                data-strip-group-options="loop: false"
                              >
                                <img src="images/resources/recent-2.jpg" alt />
                              </a>
                            </li>
                            <li>
                              <a
                                className="strip"
                                href="images/resources/recent-33.jpg"
                                title
                                data-strip-group="mygroup"
                                data-strip-group-options="loop: false"
                              >
                                <img src="images/resources/recent-3.jpg" alt />
                              </a>
                            </li>
                            <li>
                              <a
                                className="strip"
                                href="images/resources/recent-44.jpg"
                                title
                                data-strip-group="mygroup"
                                data-strip-group-options="loop: false"
                              >
                                <img src="images/resources/recent-4.jpg" alt />
                              </a>
                            </li>
                            <li>
                              <a
                                className="strip"
                                href="images/resources/recent-55.jpg"
                                title
                                data-strip-group="mygroup"
                                data-strip-group-options="loop: false"
                              >
                                <img src="images/resources/recent-5.jpg" alt />
                              </a>
                            </li>
                            <li>
                              <a
                                className="strip"
                                href="images/resources/recent-66.jpg"
                                title
                                data-strip-group="mygroup"
                                data-strip-group-options="loop: false"
                              >
                                <img src="images/resources/recent-6.jpg" alt />
                              </a>
                            </li>
                            <li>
                              <a
                                className="strip"
                                href="images/resources/recent-77.jpg"
                                title
                                data-strip-group="mygroup"
                                data-strip-group-options="loop: false"
                              >
                                <img src="images/resources/recent-7.jpg" alt />
                              </a>
                            </li>
                            <li>
                              <a
                                className="strip"
                                href="images/resources/recent-88.jpg"
                                title
                                data-strip-group="mygroup"
                                data-strip-group-options="loop: false"
                              >
                                <img src="images/resources/recent-8.jpg" alt />
                              </a>
                            </li>
                            <li>
                              <a
                                className="strip"
                                href="images/resources/recent-99.jpg"
                                title
                                data-strip-group="mygroup"
                                data-strip-group-options="loop: false"
                              >
                                <img src="images/resources/recent-9.jpg" alt />
                              </a>
                            </li>
                          </ul>
                        </div>
                        {/* recent photos*/}
                        <div className="widget stick-widget">
                          <h4 className="widget-title">Shortcuts</h4>
                          <ul className="naves">
                            <li>
                              <i className="ti-clipboard" />
                              <a title href="#">
                                News feed
                              </a>
                            </li>
                            <li>
                              <i className="ti-mouse-alt" />
                              <a title href="inbox.html">
                                Inbox
                              </a>
                            </li>
                            <li>
                              <i className="ti-files" />
                              <a title href="page.html">
                                My pages
                              </a>
                            </li>
                            <li>
                              <i className="ti-user" />
                              <a title href="friends-list.html">
                                friends
                              </a>
                            </li>
                            <li>
                              <i className="ti-image" />
                              <a title href="images.html">
                                images
                              </a>
                            </li>
                            <li>
                              <i className="ti-video-camera" />
                              <a title href="videos.html">
                                videos
                              </a>
                            </li>
                            <li>
                              <i className="ti-comments-smiley" />
                              <a title href="inbox.html">
                                Messages
                              </a>
                            </li>
                          </ul>
                        </div>
                      </aside>
                    </div>
                    {/* sidebar */}
                    <div className="col-lg-6">
                      <div className="central-meta">
                        <div className="editing-interest">
                          <h5 className="f-title">
                            <i className="ti-bell" />
                            All Notifications{" "}
                          </h5>
                          <div className="notification-box">
                            <ul>
                              {allnotifications.map((n) => (
                                <li key={n._id}>
                                  <figure>
                                    <img
                                      src="images/resources/friend-avatar.jpg"
                                      alt
                                    />
                                  </figure>
                                  <div className="notifi-meta">
                                    <p>{n.text}</p>
                                    <span> {format(n.Date_creation)}</span>
                                  </div>
                                  <i className="del fa fa-close" />
                                </li>
                              ))}
                              <li>
                                <figure>
                                  <img
                                    src="images/resources/friend-avatar.jpg"
                                    alt
                                  />
                                </figure>
                                <div className="notifi-meta">
                                  <p>bob frank like your post</p>
                                  <span>30 mints ago</span>
                                </div>
                                <i className="del fa fa-close" />
                              </li>
                              <li>
                                <figure>
                                  <img
                                    src="images/resources/friend-avatar2.jpg"
                                    alt
                                  />
                                </figure>
                                <div className="notifi-meta">
                                  <p>
                                    Sarah Hetfield commented on your photo.{" "}
                                  </p>
                                  <span>1 hours ago</span>
                                </div>
                                <i className="del fa fa-close" />
                              </li>
                              <li>
                                <figure>
                                  <img
                                    src="images/resources/friend-avatar3.jpg"
                                    alt
                                  />
                                </figure>
                                <div className="notifi-meta">
                                  <p>
                                    Mathilda Brinker commented on your new
                                    profile status.{" "}
                                  </p>
                                  <span>2 hours ago</span>
                                </div>
                                <i className="del fa fa-close" />
                              </li>
                              <li>
                                <figure>
                                  <img
                                    src="images/resources/friend-avatar4.jpg"
                                    alt
                                  />
                                </figure>
                                <div className="notifi-meta">
                                  <p>
                                    Green Goo Rock invited you to attend to his
                                    event Goo in Gotham Bar.{" "}
                                  </p>
                                  <span>2 hours ago</span>
                                </div>
                                <i className="del fa fa-close" />
                              </li>
                              <li>
                                <figure>
                                  <img
                                    src="images/resources/friend-avatar5.jpg"
                                    alt
                                  />
                                </figure>
                                <div className="notifi-meta">
                                  <p>
                                    Chris Greyson liked your profile status.{" "}
                                  </p>
                                  <span>1 day ago</span>
                                </div>
                                <i className="del fa fa-close" />
                              </li>
                              <li>
                                <figure>
                                  <img
                                    src="images/resources/friend-avatar6.jpg"
                                    alt
                                  />
                                </figure>
                                <div className="notifi-meta">
                                  <p>
                                    You and Nicholas Grissom just became
                                    friends. Write on his wall.{" "}
                                  </p>
                                  <span>2 days ago</span>
                                </div>
                                <i className="del fa fa-close" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* centerl meta */}
                    <div className="col-lg-3">
                      <aside className="sidebar static">
                        <div className="widget">
                          <div className="banner medium-opacity bluesh">
                            <div
                              className="bg-image"
                              style={{
                                backgroundImage:
                                  "url(images/resources/baner-widgetbg.jpg)",
                              }}
                            />
                            <div className="baner-top">
                              <span>
                                <img alt src="images/book-icon.png" />
                              </span>
                              <i className="fa fa-ellipsis-h" />
                            </div>
                            <div className="banermeta">
                              <p>create your own favourit page.</p>
                              <span>like them all</span>
                              <a data-ripple title href="#">
                                start now!
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="widget stick-widget">
                          <h4 className="widget-title">Who's follownig</h4>
                          <ul className="followers">
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar2.jpg"
                                  alt
                                />
                              </figure>
                              <div className="friend-meta">
                                <h4>
                                  <a href="time-line.html" title>
                                    Kelly Bill
                                  </a>
                                </h4>
                                <a href="#" title className="underline">
                                  Add Friend
                                </a>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar4.jpg"
                                  alt
                                />
                              </figure>
                              <div className="friend-meta">
                                <h4>
                                  <a href="time-line.html" title>
                                    Issabel
                                  </a>
                                </h4>
                                <a href="#" title className="underline">
                                  Add Friend
                                </a>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar6.jpg"
                                  alt
                                />
                              </figure>
                              <div className="friend-meta">
                                <h4>
                                  <a href="time-line.html" title>
                                    Andrew
                                  </a>
                                </h4>
                                <a href="#" title className="underline">
                                  Add Friend
                                </a>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar8.jpg"
                                  alt
                                />
                              </figure>
                              <div className="friend-meta">
                                <h4>
                                  <a href="time-line.html" title>
                                    Sophia
                                  </a>
                                </h4>
                                <a href="#" title className="underline">
                                  Add Friend
                                </a>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar3.jpg"
                                  alt
                                />
                              </figure>
                              <div className="friend-meta">
                                <h4>
                                  <a href="time-line.html" title>
                                    Allen
                                  </a>
                                </h4>
                                <a href="#" title className="underline">
                                  Add Friend
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        {/* who's following */}
                      </aside>
                    </div>
                    {/* sidebar */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="widget">
                  <div className="foot-logo">
                    <div className="logo">
                      <a href="index-2.html" title>
                        <img src="images/logo.png" alt />
                      </a>
                    </div>
                    <p>
                      The trio took this simple idea and built it into the
                      world’s leading carpooling platform.
                    </p>
                  </div>
                  <ul className="location">
                    <li>
                      <i className="ti-map-alt" />
                      <p>
                        33 new montgomery st.750 san francisco, CA USA 94105.
                      </p>
                    </li>
                    <li>
                      <i className="ti-mobile" />
                      <p>+1-56-346 345</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className="widget">
                  <div className="widget-title">
                    <h4>follow</h4>
                  </div>
                  <ul className="list-style">
                    <li>
                      <i className="fa fa-facebook-square" />{" "}
                      <a href="https://web.facebook.com/shopcircut/" title>
                        facebook
                      </a>
                    </li>
                    <li>
                      <i className="fa fa-twitter-square" />
                      <a href="https://twitter.com/login?lang=en" title>
                        twitter
                      </a>
                    </li>
                    <li>
                      <i className="fa fa-instagram" />
                      <a href="https://www.instagram.com/?hl=en" title>
                        instagram
                      </a>
                    </li>
                    <li>
                      <i className="fa fa-google-plus-square" />{" "}
                      <a href="https://plus.google.com/discover" title>
                        Google+
                      </a>
                    </li>
                    <li>
                      <i className="fa fa-pinterest-square" />{" "}
                      <a href="https://www.pinterest.com/" title>
                        Pintrest
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className="widget">
                  <div className="widget-title">
                    <h4>Navigate</h4>
                  </div>
                  <ul className="list-style">
                    <li>
                      <a href="about.html" title>
                        about us
                      </a>
                    </li>
                    <li>
                      <a href="contact.html" title>
                        contact us
                      </a>
                    </li>
                    <li>
                      <a href="terms.html" title>
                        terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a href="#" title>
                        RSS syndication
                      </a>
                    </li>
                    <li>
                      <a href="sitemap.html" title>
                        Sitemap
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className="widget">
                  <div className="widget-title">
                    <h4>useful links</h4>
                  </div>
                  <ul className="list-style">
                    <li>
                      <a href="#" title>
                        leasing
                      </a>
                    </li>
                    <li>
                      <a href="#" title>
                        submit route
                      </a>
                    </li>
                    <li>
                      <a href="#" title>
                        how does it work?
                      </a>
                    </li>
                    <li>
                      <a href="#" title>
                        agent listings
                      </a>
                    </li>
                    <li>
                      <a href="#" title>
                        view All
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className="widget">
                  <div className="widget-title">
                    <h4>download apps</h4>
                  </div>
                  <ul className="colla-apps">
                    <li>
                      <a href="https://play.google.com/store?hl=en" title>
                        <i className="fa fa-android" />
                        android
                      </a>
                    </li>
                    <li>
                      <a href="https://www.apple.com/lae/ios/app-store/" title>
                        <i className="ti-apple" />
                        iPhone
                      </a>
                    </li>
                    <li>
                      <a href="https://www.microsoft.com/store/apps" title>
                        <i className="fa fa-windows" />
                        Windows
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* footer */}
        <div className="bottombar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <span className="copyright">
                  <a target="_blank" href="https://www.templateshub.net">
                    Templates Hub
                  </a>
                </span>
                <i>
                  <img src="images/credit-cards.png" alt />
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="side-panel">
        <h4 className="panel-title">General Setting</h4>
        <form method="post">
          <div className="setting-row">
            <span>use night mode</span>
            <input type="checkbox" id="nightmode1" />
            <label
              htmlFor="nightmode1"
              data-on-label="ON"
              data-off-label="OFF"
            />
          </div>
          <div className="setting-row">
            <span>Notifications</span>
            <input type="checkbox" id="switch22" />
            <label htmlFor="switch22" data-on-label="ON" data-off-label="OFF" />
          </div>
          <div className="setting-row">
            <span>Notification sound</span>
            <input type="checkbox" id="switch33" />
            <label htmlFor="switch33" data-on-label="ON" data-off-label="OFF" />
          </div>
          <div className="setting-row">
            <span>My profile</span>
            <input type="checkbox" id="switch44" />
            <label htmlFor="switch44" data-on-label="ON" data-off-label="OFF" />
          </div>
          <div className="setting-row">
            <span>Show profile</span>
            <input type="checkbox" id="switch55" />
            <label htmlFor="switch55" data-on-label="ON" data-off-label="OFF" />
          </div>
        </form>
        <h4 className="panel-title">Account Setting</h4>
        <form method="post">
          <div className="setting-row">
            <span>Sub users</span>
            <input type="checkbox" id="switch66" />
            <label htmlFor="switch66" data-on-label="ON" data-off-label="OFF" />
          </div>
          <div className="setting-row">
            <span>personal account</span>
            <input type="checkbox" id="switch77" />
            <label htmlFor="switch77" data-on-label="ON" data-off-label="OFF" />
          </div>
          <div className="setting-row">
            <span>Business account</span>
            <input type="checkbox" id="switch88" />
            <label htmlFor="switch88" data-on-label="ON" data-off-label="OFF" />
          </div>
          <div className="setting-row">
            <span>Show me online</span>
            <input type="checkbox" id="switch99" />
            <label htmlFor="switch99" data-on-label="ON" data-off-label="OFF" />
          </div>
          <div className="setting-row">
            <span>Delete history</span>
            <input type="checkbox" id="switch101" />
            <label
              htmlFor="switch101"
              data-on-label="ON"
              data-off-label="OFF"
            />
          </div>
          <div className="setting-row">
            <span>Expose author name</span>
            <input type="checkbox" id="switch111" />
            <label
              htmlFor="switch111"
              data-on-label="ON"
              data-off-label="OFF"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Notification;
