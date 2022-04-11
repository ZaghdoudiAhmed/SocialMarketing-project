import React, { useState, useEffect, useRef } from "react";

import Conversation from "./conversation";
import Message from "./message";
import Header from "../../header";
import Shortcuts from "../shortcuts";
import Timelineinfo from "../timeline-info";
import Chatonline from "./chatonline";

import axios from "axios";
import { io } from "socket.io-client";

function Messanger(props) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const currentUserId = localStorage.getItem("currentUser");
  const [friends, setFriends] = useState([]);

  const scrollRef = useRef();
  const socket = useRef();
  const url = "http://localhost:2600/conversations/";

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

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const getConversations = async () => {
    try {
      const res = await axios.get(url + currentUserId);
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:2600/messages/" + currentChat?._id
      );
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getFriends = async () => {
    try {
      const friendList = await axios.get(
        "http://localhost:2600/api/users/friends/" + currentUserId
      );
      setFriends(friendList.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    console.log(receiverId);
    socket?.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:2600/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConversations();
    getMessages();
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket?.current.emit("newUser", currentUserId);

    socket?.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser?.followings?.filter((f) => users.some((u) => u._id === f))
      );
    });
  }, [socket, currentUser]);

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
    <div>
      <div className="theme-layout">
        <Header />
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
                        <div className="advertisment-box">
                          <h4 className>advertisment</h4>
                          <figure>
                            <a href="#" title="Advertisment">
                              <img src="images/resources/ad-widget.jpg" alt />
                            </a>
                          </figure>
                        </div>
                        <Shortcuts />
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
                                <li
                                  key={c._id}
                                  onClick={() => setCurrentChat(c)}
                                >
                                  <Conversation
                                    key={c._id}
                                    conversation={c}
                                    currentUser={currentUser}
                                  />
                                </li>
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
                              {currentChat ? (
                                <>
                                  <ul className="chatting-area" ref={scrollRef}>
                                    {messages.map((m) => (
                                      <Message
                                        key={m._id}
                                        message={m}
                                        own={m.sender === currentUserId}
                                      />
                                    ))}
                                  </ul>
                                </>
                              ) : (
                                <span className="noConversationText">
                                  Open a conversation to start a chat.
                                </span>
                              )}
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
                          <h4 className="widget-title">Who's Online </h4>

                          <ul className="followers">
                            <Chatonline
                              onlineUsers={onlineUsers}
                              currentUserId={currentUserId}
                              setCurrentChat={setCurrentChat}
                            />
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
