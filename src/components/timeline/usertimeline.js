import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Shortcuts from "./shortcuts";
import Timelineinfo from "./timeline-info";

import Loading from "../loading";
import Header from "../header";
import axios from "axios";

import Post from "../post/post";
function Usertimeline(props) {
  const url = "http://localhost:2600/posts";

  const [postData, setPostData] = useState([]);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [file, setFile] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const currentUserId = localStorage.getItem("currentUser");
  const [userProfile, setProfile] = useState(null);
  const { userid } = useParams();

  const getPosts = async () => {
    try {
      axios.get(url + "/all/" + userProfile._id).then((res) => {
        setPostData(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getFriends = async () => {
    try {
      const friendList = await axios.get(
        "http://localhost:2600/api/users/friends/" + userProfile._id
      );
      setFriends(friendList.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:2600/api/users/${userid}`).then((res) => {
      setProfile(res.data);
      try {
        axios.get(url + "/all/" + res.data._id).then((res) => {
          setPostData(res.data);
        });

        axios
          .get("http://localhost:2600/api/users/friends/" + res.data._id)
          .then((res) => {
            setFriends(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    });
    //  console.log(yourFriend);
  }, []);

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
      {userProfile ? (
        <div>
          <div className="theme-layout">
            <Header currentUserId={currentUserId} />
            {/* topbar */}
            <section>
              {/* <Timelineinfo friends={friends} setFriends={setFriends} /> */}
              <div className="feature-photo">
                <figure>
                  <img src="/images/resources/timeline-1.jpg" alt />
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
                          <img src="/images/resources/user-avatar.jpg" alt />
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
                            <h5>{userProfile.name}</h5>
                            <span>Group Admin</span>
                          </li>
                          <li>
                            <Link
                              className="active"
                              to="/timeline"
                              title
                              data-ripple
                            >
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
                            <Link
                              className
                              to="/timelinevideos"
                              title
                              data-ripple
                            >
                              Videos
                            </Link>
                            <Link
                              className
                              to="/timelinefriends"
                              title
                              data-ripple
                            >
                              Friends
                            </Link>
                            <Link
                              className
                             to="/timelinegroups"
                              title
                              data-ripple
                            >
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
                              <h4 className="widget-title">Socials</h4>
                              <ul className="socials">
                                <li className="facebook">
                                  <a title href="#">
                                    <i className="fa fa-facebook" />{" "}
                                    <span>facebook</span> <ins>45 likes</ins>
                                  </a>
                                </li>
                                <li className="twitter">
                                  <a title href="#">
                                    <i className="fa fa-twitter" />{" "}
                                    <span>twitter</span>
                                    <ins>25 likes</ins>
                                  </a>
                                </li>
                                <li className="google">
                                  <a title href="#">
                                    <i className="fa fa-google" />{" "}
                                    <span>google</span>
                                    <ins>35 likes</ins>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <Shortcuts />
                            {/* Shortcuts */}
                            <div className="widget">
                              <h4 className="widget-title">Recent Activity</h4>
                              <ul className="activitiez">
                                <li>
                                  <div className="activity-meta">
                                    <i>10 hours Ago</i>
                                    <span>
                                      <a href="#" title>
                                        Commented on Video posted{" "}
                                      </a>
                                    </span>
                                    <h6>
                                      by{" "}
                                      <a href="newsfeed.html">black demon.</a>
                                    </h6>
                                  </div>
                                </li>
                                <li>
                                  <div className="activity-meta">
                                    <i>30 Days Ago</i>
                                    <span>
                                      <a href="newsfeed.html" title>
                                        Posted your status. “Hello guys, how are
                                        you?”
                                      </a>
                                    </span>
                                  </div>
                                </li>
                                <li>
                                  <div className="activity-meta">
                                    <i>2 Years Ago</i>
                                    <span>
                                      <a href="#" title>
                                        Share a video on her timeline.
                                      </a>
                                    </span>
                                    <h6>
                                      "
                                      <a href="newsfeed.html">
                                        you are so funny mr.been.
                                      </a>
                                      "
                                    </h6>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            {/* recent activites */}
                            <div className="widget stick-widget">
                              <h4 className="widget-title">Who's follownig</h4>
                              <ul className="followers">
                                <li>
                                  <figure>
                                    <img
                                      src="/images/resources/friend-avatar2.jpg"
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
                                      src="/images/resources/friend-avatar4.jpg"
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
                                      src="/images/resources/friend-avatar6.jpg"
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
                                      src="/images/resources/friend-avatar8.jpg"
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
                                      src="/images/resources/friend-avatar3.jpg"
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
                        <div className="col-lg-6">
                          <div className="loadMore">
                            <div className="central-meta item">
                              <div className="new-postbox">
                                <figure>
                                  <img src="/images/resources/admin2.jpg" alt />
                                </figure>
                                <div className="newpst-input">
                                  {/* <form method="post">
                                <textarea
                                  rows={2}
                                  placeholder="write something"
                                  onChange={(e) =>
                                    setNewDescription(e.target.value)
                                  }
                                  value={newDescription}
                                />
                                <div className="attachments">
                                  <ul>
                                    <li>
                                      <i className="fa fa-image" />
                                      <label className="fileContainer">
                                        <input
                                          type="file"
                                          onChange={(e) => {
                                            setFile(e.target.files[0]);
                                          }}
                                        />
                                      </label>
                                    </li>
                                    <li>
                                      <i className="fa fa-video-camera" />
                                      <label className="fileContainer">
                                        <input type="file" />
                                      </label>
                                    </li>

                                    <li>
                                      <button
                                        type="submit"
                                        onClick={handleSubmit}
                                      >
                                        Publish
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </form> */}
                                </div>
                              </div>
                            </div>
                            {/* add post new box */}

                            {postData
                              .sort(
                                (a, b) =>
                                  new Date(b.Date_creation) -
                                  new Date(a.Date_creation)
                              )
                              .map((p) => (
                                <Post
                                  key={p._id}
                                  post={p}
                                  currentUser={currentUser}
                                />
                              ))}
                          </div>
                        </div>
                        {/* centerl meta */}
                        <div className="col-lg-3">
                          <aside className="sidebar static">
                            <div className="widget">
                              <div className="banner medium-opacity bluesh">
                                <div
                                  style={{
                                    backgroundImage:
                                      "url(/images/resources/baner-widgetbg.jpg)",
                                  }}
                                  className="bg-image"
                                />
                                <div className="baner-top">
                                  <span>
                                    <img src="/images/book-icon.png" alt />
                                  </span>
                                  <i className="fa fa-ellipsis-h" />
                                </div>
                                <div className="banermeta">
                                  <p>create your own favourit page.</p>
                                  <span>like them all</span>
                                  <a href="#" title data-ripple>
                                    start now!
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="widget friend-list stick-widget">
                              <h4 className="widget-title">Followers</h4>
                              <div id="searchDir" />
                              <ul id="people-list" className="friendz-list">
                                {friends.map((f) => (
                                  <li>
                                    <figure>
                                      <img
                                        src="/images/resources/friend-avatar.jpg"
                                        alt
                                      />
                                      <span className="status f-online" />
                                    </figure>
                                    <div className="friendz-meta">
                                      <a href="time-line.html">{f.name}</a>
                                      <i>
                                        <a
                                          href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                          className="__cf_email__"
                                          data-cfemail="4136282f352433322e2d25243301262c20282d6f222e2c"
                                        ></a>
                                      </i>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              <div className="chat-box">
                                <div className="chat-head">
                                  <span className="status f-online" />
                                  <h6>Bucky Barnes</h6>
                                  <div className="more">
                                    <span>
                                      <i className="ti-more-alt" />
                                    </span>
                                    <span className="close-mesage">
                                      <i className="ti-close" />
                                    </span>
                                  </div>
                                </div>
                                <div className="chat-list">
                                  <ul>
                                    <li className="me">
                                      <div className="chat-thumb">
                                        <img
                                          src="/images/resources/chatlist1.jpg"
                                          alt
                                        />
                                      </div>
                                      <div className="notification-event">
                                        <span className="chat-message-item">
                                          Hi James! Please remember to buy the
                                          food for tomorrow! I’m gonna be
                                          handling the gifts and Jake’s gonna
                                          get the drinks
                                        </span>
                                        <span className="notification-date">
                                          <time
                                            dateTime="2004-07-24T18:18"
                                            className="entry-date updated"
                                          >
                                            Yesterday at 8:10pm
                                          </time>
                                        </span>
                                      </div>
                                    </li>
                                    <li className="you">
                                      <div className="chat-thumb">
                                        <img
                                          src="images/resources/chatlist2.jpg"
                                          alt
                                        />
                                      </div>
                                      <div className="notification-event">
                                        <span className="chat-message-item">
                                          Hi James! Please remember to buy the
                                          food for tomorrow! I’m gonna be
                                          handling the gifts and Jake’s gonna
                                          get the drinks
                                        </span>
                                        <span className="notification-date">
                                          <time
                                            dateTime="2004-07-24T18:18"
                                            className="entry-date updated"
                                          >
                                            Yesterday at 8:10pm
                                          </time>
                                        </span>
                                      </div>
                                    </li>
                                    <li className="me">
                                      <div className="chat-thumb">
                                        <img
                                          src="images/resources/chatlist1.jpg"
                                          alt
                                        />
                                      </div>
                                      <div className="notification-event">
                                        <span className="chat-message-item">
                                          Hi James! Please remember to buy the
                                          food for tomorrow! I’m gonna be
                                          handling the gifts and Jake’s gonna
                                          get the drinks
                                        </span>
                                        <span className="notification-date">
                                          <time
                                            dateTime="2004-07-24T18:18"
                                            className="entry-date updated"
                                          >
                                            Yesterday at 8:10pm
                                          </time>
                                        </span>
                                      </div>
                                    </li>
                                  </ul>
                                  <form className="text-box">
                                    <textarea
                                      placeholder="Post enter to post..."
                                      defaultValue={""}
                                    />
                                    <div className="add-smiles">
                                      <span
                                        title="add icon"
                                        className="em em-expressionless"
                                      />
                                    </div>
                                    <div className="smiles-bunch">
                                      <i className="em em---1" />
                                      <i className="em em-smiley" />
                                      <i className="em em-anguished" />
                                      <i className="em em-laughing" />
                                      <i className="em em-angry" />
                                      <i className="em em-astonished" />
                                      <i className="em em-blush" />
                                      <i className="em em-disappointed" />
                                      <i className="em em-worried" />
                                      <i className="em em-kissing_heart" />
                                      <i className="em em-rage" />
                                      <i className="em em-stuck_out_tongue" />
                                    </div>
                                    <button type="submit" />
                                  </form>
                                </div>
                              </div>
                            </div>
                            {/* friends list sidebar */}
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
                            33 new montgomery st.750 san francisco, CA USA
                            94105.
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
                          <a
                            href="https://www.apple.com/lae/ios/app-store/"
                            title
                          >
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
                <label
                  htmlFor="switch22"
                  data-on-label="ON"
                  data-off-label="OFF"
                />
              </div>
              <div className="setting-row">
                <span>Notification sound</span>
                <input type="checkbox" id="switch33" />
                <label
                  htmlFor="switch33"
                  data-on-label="ON"
                  data-off-label="OFF"
                />
              </div>
              <div className="setting-row">
                <span>My profile</span>
                <input type="checkbox" id="switch44" />
                <label
                  htmlFor="switch44"
                  data-on-label="ON"
                  data-off-label="OFF"
                />
              </div>
              <div className="setting-row">
                <span>Show profile</span>
                <input type="checkbox" id="switch55" />
                <label
                  htmlFor="switch55"
                  data-on-label="ON"
                  data-off-label="OFF"
                />
              </div>
            </form>
            <h4 className="panel-title">Account Setting</h4>
            <form method="post">
              <div className="setting-row">
                <span>Sub users</span>
                <input type="checkbox" id="switch66" />
                <label
                  htmlFor="switch66"
                  data-on-label="ON"
                  data-off-label="OFF"
                />
              </div>
              <div className="setting-row">
                <span>personal account</span>
                <input type="checkbox" id="switch77" />
                <label
                  htmlFor="switch77"
                  data-on-label="ON"
                  data-off-label="OFF"
                />
              </div>
              <div className="setting-row">
                <span>Business account</span>
                <input type="checkbox" id="switch88" />
                <label
                  htmlFor="switch88"
                  data-on-label="ON"
                  data-off-label="OFF"
                />
              </div>
              <div className="setting-row">
                <span>Show me online</span>
                <input type="checkbox" id="switch99" />
                <label
                  htmlFor="switch99"
                  data-on-label="ON"
                  data-off-label="OFF"
                />
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
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Usertimeline;
