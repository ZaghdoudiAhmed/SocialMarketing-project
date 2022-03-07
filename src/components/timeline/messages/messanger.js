import React, { useState, useEffect, useRef } from "react";

import Conversation from "./conversation";
import Message from "./message";
import Header from "../../header";
import axios from "axios";
import { io } from "socket.io-client";

function Messanger(props) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const scrollRef = useRef();
  const socket = useRef();
  const url = "http://localhost:3000/conversations/";

  const getConversations = async () => {
    try {
      const res = await axios.get(url + "fekgrgogo4546glrgthob56");
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/messages/" + "62165fab8c09405845d635c1"
      );
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      // sender: user._id,
      sender: "6218b4tkgb9a7fc8d3pyy7adad5",
      text: newMessage,
      conversationId: "62165fab8c09405845d635c1",
    };
    try {
      const res = await axios.post("http://localhost:3000/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConversations();
    getMessages();
  }, ["fekgrgogo4546glrgthob56"]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // useEffect(() => {
  //   socket.current.emit("addUser", user._id);
  //   socket.current.on("getUsers", (users) => {
  //      setOnlineUsers(
  //       user.followings.filter((f) => users.some((u) => u.userId === f))
  //     );
  //    });
  // }, [user]);
  return (
    <div>
      <div className="theme-layout">
        <Header />
        {/* topbar */}
        <section>
          <div className="feature-photo">
            <figure>
              <img src="images/resources/timeline-1.jpg" alt />
            </figure>
            <div className="add-btn">
              <span>1205 followers</span>
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
                        <h5>Janice Griffith</h5>
                        <span>Group Admin</span>
                      </li>
                      <li>
                        <a
                          className="active"
                          href="time-line.html"
                          title
                          data-ripple
                        >
                          time line
                        </a>
                        <a
                          className
                          href="timeline-photos.html"
                          title
                          data-ripple
                        >
                          Photos
                        </a>
                        <a
                          className
                          href="timeline-videos.html"
                          title
                          data-ripple
                        >
                          Videos
                        </a>
                        <a
                          className
                          href="timeline-friends.html"
                          title
                          data-ripple
                        >
                          Friends
                        </a>
                        <a className href="groups.html" title data-ripple>
                          Groups
                        </a>
                        <a className href="about.html" title data-ripple>
                          about
                        </a>
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
                        <div className="advertisment-box">
                          <h4 className>advertisment</h4>
                          <figure>
                            <a href="#" title="Advertisment">
                              <img src="images/resources/ad-widget.jpg" alt />
                            </a>
                          </figure>
                        </div>
                        <div className="widget stick-widget">
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
                              <a href="timeline-friends.html" title>
                                friends
                              </a>
                            </li>
                            <li>
                              <i className="ti-image" />
                              <a href="timeline-photos.html" title>
                                images
                              </a>
                            </li>
                            <li>
                              <i className="ti-video-camera" />
                              <a href="timeline-videos.html" title>
                                videos
                              </a>
                            </li>
                          </ul>
                        </div>
                        {/* Shortcuts */}
                      </aside>
                    </div>
                    {/* sidebar */}
                    <div className="col-lg-6">
                      <div className="central-meta">
                        <div className="messages">
                          <h5 className="f-title">
                            <i className="ti-bell" />
                            All Messages{" "}
                            <span className="more-options">
                              <i className="fa fa-ellipsis-h" />
                            </span>
                          </h5>
                          <div className="message-box">
                            <ul className="peoples">
                              {conversations.map((c) => (
                                <Conversation conversation={c} />
                              ))}
                            </ul>
                            <div className="peoples-mesg-box">
                              <div className="conversation-head">
                                <figure>
                                  <img
                                    src="images/resources/friend-avatar.jpg"
                                    alt
                                  />
                                </figure>
                                <span>
                                  jason bourne <i>online</i>
                                </span>
                              </div>

                              <ul className="chatting-area" ref={scrollRef}>
                                {messages.map((m) => (
                                  <Message
                                    message={m}
                                    own={
                                      m.sender === "6218b4tkgb9a7fc8d3pyy7adad5"
                                    }
                                  />
                                ))}
                              </ul>
                              <div className="message-text-container">
                                <form method="post">
                                  <textarea
                                    defaultValue={""}
                                    onChange={(e) =>
                                      setNewMessage(e.target.value)
                                    }
                                    value={newMessage}
                                  />
                                  <button title="send" onClick={handleSubmit}>
                                    <i className="fa fa-paper-plane" />
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Messanger;
