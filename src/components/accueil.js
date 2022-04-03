import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { io } from "socket.io-client";

import Post from "./post/post";
import Header from "./header";
import Shortcuts from "./timeline/shortcuts";
import Loading from "./loading";
import { MentionsInput, Mention } from "react-mentions";

function Accueil() {
  const url = "http://localhost:3000/posts";
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [file, setFile] = useState(null);
  const [socket, setSocket] = useState(null);
  const [friends, setFriends] = useState([]);
  const users = [
    {
      id: "1",
      display: "Jimmy",
    },
    {
      id: "2",
      display: "Ketut",
    },
    {
      id: "3",
      display: "Gede",
    },
  ];

  const [currentUser, setCurrentUser] = useState("");
  const currentUserId = localStorage.getItem("currentUser");

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = new FormData();

    post.append("Photo", file);
    post.append("Description", newDescription);
    post.append("Private", true);
    post.append("Creator", currentUserId);

    try {
      await axios.post(url, post).then((res) => {
        Toast.fire({
          icon: "success",
          title: "Your post is added succesfuly",
        });
        socket.emit("sendNotification", {
          senderId: res.data.Creator._id,
          receiverId: currentUserId,
          senderName: res.data.Creator.name,
          type: 4,
        });

        setPostData([res.data, ...postData]);
        setNewDescription("");
        setFile(null);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getPosts = async () => {
    try {
      axios.get(url + "/").then((res) => {
        setPostData(res.data);
        setLoading(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

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
    setSocket(io("http://localhost:8900"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", currentUserId);
  }, [socket]);

  useEffect(() => {
    getPosts();
    getFriends();
  }, []);

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
        <Header
          socket={socket}
          currentUserId={currentUserId}
          friends={friends}
        />

        <div className="fixed-sidebar right">
          <div className="chat-friendz">
            <ul className="chat-users">
              {friends.map((f) => (
                <li key={f._id}>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend1.jpg" alt />
                    <span className="status f-online" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="chat-box">
              <div className="chat-head">
                <span className="status f-online" />
                <h6>Bucky Barnes</h6>
                <div className="more">
                  <span className="more-optns">
                    <i className="ti-more-alt" />
                    <ul>
                      <li>block chat</li>
                      <li>unblock chat</li>
                      <li>conversation</li>
                    </ul>
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
                      <img src="images/resources/chatlist1.jpg" alt />
                    </div>
                    <div className="notification-event">
                      <span className="chat-message-item">
                        Hi James! Please remember to buy the food for tomorrow!
                        I’m gonna be handling the gifts and Jake’s gonna get the
                        drinks
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
                      <img src="images/resources/chatlist2.jpg" alt />
                    </div>
                    <div className="notification-event">
                      <span className="chat-message-item">
                        Hi James! Please remember to buy the food for tomorrow!
                        I’m gonna be handling the gifts and Jake’s gonna get the
                        drinks
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
                      <img src="images/resources/chatlist1.jpg" alt />
                    </div>
                    <div className="notification-event">
                      <span className="chat-message-item">
                        Hi James! Please remember to buy the food for tomorrow!
                        I’m gonna be handling the gifts and Jake’s gonna get the
                        drinks
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
                    <span title="add icon" className="em em-expressionless" />
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
        </div>
        <div className="fixed-sidebar left">
          <div className="menu-left">
            <ul className="left-menu">
              <li>
                <a
                  href="newsfeed.html"
                  title="Newsfeed Page"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <i className="ti-magnet" />
                </a>
              </li>
              <li>
                <a
                  href="fav-page.html"
                  title="favourit page"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <i className="fa fa-star-o" />
                </a>
              </li>
              <li>
                <a
                  href="insights.html"
                  title="Account Stats"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <i className="ti-stats-up" />
                </a>
              </li>
              <li>
                <a
                  href="inbox.html"
                  title="inbox"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <i className="ti-import" />
                </a>
              </li>
              <li>
                <Link
                  to="/messages"
                  title="Messages"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <i className="ti-comment-alt" />
                </Link>
              </li>
              <li>
                <a
                  href="edit-account-setting.html"
                  title="Setting"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <i className="ti-panel" />
                </a>
              </li>
              <li>
                <a
                  href="faq.html"
                  title="Faq's"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <i className="ti-light-bulb" />
                </a>
              </li>
              <li>
                <a
                  href="timeline-friends.html"
                  title="Friends"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <i className="ti-themify-favicon" />
                </a>
              </li>
              <li>
                <a
                  href="widgets.html"
                  title="Widgets"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <i className="ti-eraser" />
                </a>
              </li>
              <li>
                <a
                  href="notifications.html"
                  title="Notification"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <i className="ti-bookmark-alt" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* left sidebar menu */}
        <section>
          <div className="gap2 gray-bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row merged20" id="page-contents">
                    <div className="col-lg-3">
                      <aside className="sidebar static left">
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
                                  by <a href="time-line.html">black demon.</a>
                                </h6>
                              </div>
                            </li>
                            <li>
                              <div className="activity-meta">
                                <i>30 Days Ago</i>
                                <span>
                                  <a href="#" title>
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
                                  "<a href="#">you are so funny mr.been.</a>"
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

                    <div className="col-lg-6">
                      {/* <ReactPlayer url="https://www.youtube.com/watch?v=ipwiaaRXZp4" /> */}

                      <div className="central-meta">
                        <div className="new-postbox">
                          <figure>
                            <img src="images/resources/admin2.jpg" alt />
                          </figure>
                          <div className="newpst-input">
                            <form>
                              <MentionsInput
                                rows={2}
                                placeholder="..."
                                onChange={(e) =>
                                  setNewDescription(e.target.value)
                                }
                                value={newDescription}
                                markup="@[__name__](___id__)"
                              >
                                <Mention trigger="@" data={friends} />
                              </MentionsInput>

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
                                        id="file"
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
                                      onClick={handleSubmit}
                                      type="submit"
                                    >
                                      Share
                                    </button>
                                  </li>
                                  <br />
                                  {file && (
                                    <div className="center">
                                      <img
                                        style={{ position: "center" }}
                                        alt=""
                                        src={URL.createObjectURL(file)}
                                      />
                                    </div>
                                  )}
                                </ul>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      {/* add post new box */}
                      {loading ? (
                        <div className="loadMore">
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
                                socket={socket}
                                currentUser={currentUser}
                                friends={friends}
                              />
                            ))}
                        </div>
                      ) : (
                        <Loading />
                      )}
                    </div>
                    {/* centerl meta */}
                    <div className="col-lg-3">
                      <aside className="sidebar static right">
                        <div className="widget">
                          <h4 className="widget-title">Your page</h4>
                          <div className="your-page">
                            <figure>
                              <a href="#" title>
                                <img
                                  src="images/resources/friend-avatar9.jpg"
                                  alt
                                />
                              </a>
                            </figure>
                            <div className="page-meta">
                              <a href="#" title className="underline">
                                My page
                              </a>
                              <span>
                                <i className="ti-comment" />
                                <a href="insight.html">
                                  Messages <em>9</em>
                                </a>
                              </span>
                              <span>
                                <i className="ti-bell" />
                                <a href="insight.html">
                                  Notifications <em>2</em>
                                </a>
                              </span>
                            </div>
                            <div className="page-likes">
                              <ul className="nav nav-tabs likes-btn">
                                <li className="nav-item">
                                  <a
                                    className="active"
                                    href="#link1"
                                    data-toggle="tab"
                                  >
                                    likes
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a className href="#link2" data-toggle="tab">
                                    views
                                  </a>
                                </li>
                              </ul>
                              {/* Tab panes */}
                              <div className="tab-content">
                                <div
                                  className="tab-pane active fade show "
                                  id="link1"
                                >
                                  <span>
                                    <i className="ti-heart" />
                                    884
                                  </span>
                                  <a href="#" title="weekly-likes">
                                    35 new likes this week
                                  </a>
                                  <div className="users-thumb-list">
                                    <a
                                      href="#"
                                      title="Anderw"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-1.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="frank"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-2.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="Sara"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-3.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="Amy"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-4.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="Ema"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-5.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="Sophie"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-6.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="Maria"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-7.jpg"
                                        alt
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="tab-pane fade" id="link2">
                                  <span>
                                    <i className="ti-eye" />
                                    440
                                  </span>
                                  <a href="#" title="weekly-likes">
                                    440 new views this week
                                  </a>
                                  <div className="users-thumb-list">
                                    <a
                                      href="#"
                                      title="Anderw"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-1.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="frank"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-2.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="Sara"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-3.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="Amy"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-4.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="Ema"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-5.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="Sophie"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-6.jpg"
                                        alt
                                      />
                                    </a>
                                    <a
                                      href="#"
                                      title="Maria"
                                      data-toggle="tooltip"
                                    >
                                      <img
                                        src="images/resources/userlist-7.jpg"
                                        alt
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* page like widget */}
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
                          <h4 className="widget-title">Profile intro</h4>
                          <ul className="short-profile">
                            <li>
                              <span>about</span>
                              <p>
                                Hi, i am jhon kates, i am 32 years old and
                                worked as a web developer in microsoft{" "}
                              </p>
                            </li>
                            <li>
                              <span>fav tv show</span>
                              <p>
                                Sacred Games, Spartcus Blood, Games of Theron{" "}
                              </p>
                            </li>
                            <li>
                              <span>favourit music</span>
                              <p>Justin Biber, Shakira, Nati Natasah</p>
                            </li>
                          </ul>
                        </div>
                      </aside>
                    </div>
                    {/* sidebar */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
export default Accueil;
