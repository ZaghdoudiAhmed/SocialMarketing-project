import React, { useState, useEffect } from "react";
import Shortcuts from "./shortcuts";
import { Link } from "react-router-dom";

import Timelineinfo from "./timeline-info";

import Header from "../header";
import axios from "axios";

function Timelinefriends(props) {
  const [friends, setFriends] = useState([]);
  const currentUserId = localStorage.getItem("currentUser");

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

  const handleClick = async (userid) => {
    try {
      await axios
        .put("http://localhost:2600/api/users/" + userid + "/unfollow", {
          userId: currentUserId,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);
  return (
    <div>
      <div className="theme-layout">
        <Header />
        {/* topbar */}
        <section>
          <Timelineinfo friends={friends} setFriends={setFriends} />
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
                        <Shortcuts />
                        {/* Shortcuts */}
                        <div className="widget stick-widget">
                          <h4 className="widget-title">Profile intro</h4>
                          <ul className="short-profile">
                            <li>
                              <span>about</span>
                              <p>
                                Hi, i am jhon kates, i am 32 years old and
                                worked as a web developer in microsoft company.{" "}
                              </p>
                            </li>
                            <li>
                              <span>fav tv show</span>
                              <p>
                                Hi, i am jhon kates, i am 32 years old and
                                worked as a web developer in microsoft company.{" "}
                              </p>
                            </li>
                            <li>
                              <span>favourit music</span>
                              <p>
                                Hi, i am jhon kates, i am 32 years old and
                                worked as a web developer in microsoft company.{" "}
                              </p>
                            </li>
                          </ul>
                        </div>
                        {/* profile intro widget */}
                      </aside>
                    </div>
                    {/* sidebar */}
                    <div className="col-lg-6">
                      <div className="central-meta">
                        <div className="frnds">
                          <ul className="nav nav-tabs">
                            <li className="nav-item">
                              <a
                                className="active"
                                href="#frends"
                                data-toggle="tab"
                              >
                                My Friends
                              </a>{" "}
                              <span>{friends.length}</span>
                            </li>
                            <li className="nav-item">
                              <a className href="#frends-req" data-toggle="tab">
                                Friend Requests
                              </a>
                              <span>60</span>
                            </li>
                          </ul>
                          {/* Tab panes */}
                          <div className="tab-content">
                            <div
                              className="tab-pane active fade show "
                              id="frends"
                            >
                              <ul className="nearby-contct">
                                {friends?.map((friend) => (
                                  <li>
                                    <div className="nearly-pepls">
                                      <figure>
                                        <a href="time-line.html" title>
                                          <img
                                            // src={
                                            //   friend.profilepic
                                            //     ? friend.profilepic
                                            //     : "images/resources/friend-avatar9.jpg"
                                            // }
                                            src="images/resources/friend-avatar9.jpg"
                                            alt
                                          />
                                        </a>
                                      </figure>
                                      <div className="pepl-info">
                                        <h4>
                                          <a href="time-line.html" title>
                                            {friend.name}
                                          </a>
                                        </h4>
                                        <span>ftv model</span>
                                        <a
                                          href="#"
                                          title
                                          className="add-butn more-action"
                                          data-ripple
                                          //  onClick={handleClick(friend._id)}
                                        >
                                          unfriend
                                        </a>
                                        <a
                                          href="#"
                                          title
                                          className="add-butn"
                                          data-ripple
                                        >
                                          add friend
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              <div className="lodmore">
                                <button className="btn-view btn-load-more" />
                              </div>
                            </div>
                            <div className="tab-pane fade" id="frends-req">
                              <ul className="nearby-contct">
                                <li>
                                  <div className="nearly-pepls">
                                    <figure>
                                      <a href="time-line.html" title>
                                        <img
                                          src="images/resources/nearly5.jpg"
                                          alt
                                        />
                                      </a>
                                    </figure>
                                    <div className="pepl-info">
                                      <h4>
                                        <a href="time-line.html" title>
                                          Amy watson
                                        </a>
                                      </h4>
                                      <span>ftv model</span>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn more-action"
                                        data-ripple
                                      >
                                        delete Request
                                      </a>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn"
                                        data-ripple
                                      >
                                        Confirm
                                      </a>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="nearly-pepls">
                                    <figure>
                                      <a href="time-line.html" title>
                                        <img
                                          src="images/resources/nearly1.jpg"
                                          alt
                                        />
                                      </a>
                                    </figure>
                                    <div className="pepl-info">
                                      <h4>
                                        <a href="time-line.html" title>
                                          sophia Gate
                                        </a>
                                      </h4>
                                      <span>ftv model</span>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn more-action"
                                        data-ripple
                                      >
                                        delete Request
                                      </a>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn"
                                        data-ripple
                                      >
                                        Confirm
                                      </a>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="nearly-pepls">
                                    <figure>
                                      <a href="time-line.html" title>
                                        <img
                                          src="images/resources/nearly6.jpg"
                                          alt
                                        />
                                      </a>
                                    </figure>
                                    <div className="pepl-info">
                                      <h4>
                                        <a href="time-line.html" title>
                                          caty lasbo
                                        </a>
                                      </h4>
                                      <span>ftv model</span>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn more-action"
                                        data-ripple
                                      >
                                        delete Request
                                      </a>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn"
                                        data-ripple
                                      >
                                        Confirm
                                      </a>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="nearly-pepls">
                                    <figure>
                                      <a href="time-line.html" title>
                                        <img
                                          src="images/resources/friend-avatar9.jpg"
                                          alt
                                        />
                                      </a>
                                    </figure>
                                    <div className="pepl-info">
                                      <h4>
                                        <a href="time-line.html" title>
                                          jhon kates
                                        </a>
                                      </h4>
                                      <span>ftv model</span>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn more-action"
                                        data-ripple
                                      >
                                        delete Request
                                      </a>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn"
                                        data-ripple
                                      >
                                        Confirm
                                      </a>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="nearly-pepls">
                                    <figure>
                                      <a href="time-line.html" title>
                                        <img
                                          src="images/resources/nearly2.jpg"
                                          alt
                                        />
                                      </a>
                                    </figure>
                                    <div className="pepl-info">
                                      <h4>
                                        <a href="time-line.html" title>
                                          sara grey
                                        </a>
                                      </h4>
                                      <span>ftv model</span>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn more-action"
                                        data-ripple
                                      >
                                        delete Request
                                      </a>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn"
                                        data-ripple
                                      >
                                        Confirm
                                      </a>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="nearly-pepls">
                                    <figure>
                                      <a href="time-line.html" title>
                                        <img
                                          src="images/resources/nearly4.jpg"
                                          alt
                                        />
                                      </a>
                                    </figure>
                                    <div className="pepl-info">
                                      <h4>
                                        <a href="time-line.html" title>
                                          Sara grey
                                        </a>
                                      </h4>
                                      <span>ftv model</span>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn more-action"
                                        data-ripple
                                      >
                                        delete Request
                                      </a>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn"
                                        data-ripple
                                      >
                                        Confirm
                                      </a>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="nearly-pepls">
                                    <figure>
                                      <a href="time-line.html" title>
                                        <img
                                          src="images/resources/nearly3.jpg"
                                          alt
                                        />
                                      </a>
                                    </figure>
                                    <div className="pepl-info">
                                      <h4>
                                        <a href="time-line.html" title>
                                          Sexy cat
                                        </a>
                                      </h4>
                                      <span>ftv model</span>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn more-action"
                                        data-ripple
                                      >
                                        delete Request
                                      </a>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn"
                                        data-ripple
                                      >
                                        Confirm
                                      </a>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="nearly-pepls">
                                    <figure>
                                      <a href="time-line.html" title>
                                        <img
                                          src="images/resources/friend-avatar9.jpg"
                                          alt
                                        />
                                      </a>
                                    </figure>
                                    <div className="pepl-info">
                                      <h4>
                                        <a href="time-line.html" title>
                                          jhon kates
                                        </a>
                                      </h4>
                                      <span>ftv model</span>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn more-action"
                                        data-ripple
                                      >
                                        delete Request
                                      </a>
                                      <a
                                        href="#"
                                        title
                                        className="add-butn"
                                        data-ripple
                                      >
                                        Confirm
                                      </a>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <button className="btn-view btn-load-more" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* centerl meta */}
                    <div className="col-lg-3">
                      <aside className="sidebar static">
                        <div className="widget">
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
                        <div className="widget friend-list stick-widget">
                          <h4 className="widget-title">Friends</h4>
                          <div id="searchDir" />
                          <ul id="people-list" className="friendz-list">
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar.jpg"
                                  alt
                                />
                                <span className="status f-online" />
                              </figure>
                              <div className="friendz-meta">
                                <a href="time-line.html">bucky barnes</a>
                                <i>
                                  <a
                                    href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="c6b1afa8b2a3b4b5a9aaa2a3b486a1aba7afaae8a5a9ab"
                                  >
                                    [email&nbsp;protected]
                                  </a>
                                </i>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar2.jpg"
                                  alt
                                />
                                <span className="status f-away" />
                              </figure>
                              <div className="friendz-meta">
                                <a href="time-line.html">Sarah Loren</a>
                                <i>
                                  <a
                                    href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="82e0e3f0ece7f1c2e5efe3ebeeace1edef"
                                  >
                                    [email&nbsp;protected]
                                  </a>
                                </i>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar3.jpg"
                                  alt
                                />
                                <span className="status f-off" />
                              </figure>
                              <div className="friendz-meta">
                                <a href="time-line.html">jason borne</a>
                                <i>
                                  <a
                                    href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="6f050e1c00010d2f08020e0603410c0002"
                                  >
                                    [email&nbsp;protected]
                                  </a>
                                </i>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar4.jpg"
                                  alt
                                />
                                <span className="status f-off" />
                              </figure>
                              <div className="friendz-meta">
                                <a href="time-line.html">Cameron diaz</a>
                                <i>
                                  <a
                                    href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="147e75677b7a76547379757d783a777b79"
                                  >
                                    [email&nbsp;protected]
                                  </a>
                                </i>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar5.jpg"
                                  alt
                                />
                                <span className="status f-online" />
                              </figure>
                              <div className="friendz-meta">
                                <a href="time-line.html">daniel warber</a>
                                <i>
                                  <a
                                    href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="640e05170b0a06240309050d084a070b09"
                                  >
                                    [email&nbsp;protected]
                                  </a>
                                </i>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar6.jpg"
                                  alt
                                />
                                <span className="status f-away" />
                              </figure>
                              <div className="friendz-meta">
                                <a href="time-line.html">andrew</a>
                                <i>
                                  <a
                                    href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="d3b9b2a0bcbdb193b4beb2babffdb0bcbe"
                                  >
                                    [email&nbsp;protected]
                                  </a>
                                </i>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar7.jpg"
                                  alt
                                />
                                <span className="status f-off" />
                              </figure>
                              <div className="friendz-meta">
                                <a href="time-line.html">amy watson</a>
                                <i>
                                  <a
                                    href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="deb4bfadb1b0bc9eb9b3bfb7b2f0bdb1b3"
                                  >
                                    [email&nbsp;protected]
                                  </a>
                                </i>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar5.jpg"
                                  alt
                                />
                                <span className="status f-online" />
                              </figure>
                              <div className="friendz-meta">
                                <a href="time-line.html">daniel warber</a>
                                <i>
                                  <a
                                    href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="bbd1dac8d4d5d9fbdcd6dad2d795d8d4d6"
                                  >
                                    [email&nbsp;protected]
                                  </a>
                                </i>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/friend-avatar2.jpg"
                                  alt
                                />
                                <span className="status f-away" />
                              </figure>
                              <div className="friendz-meta">
                                <a href="time-line.html">Sarah Loren</a>
                                <i>
                                  <a
                                    href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="ff9d9e8d919a8cbf98929e9693d19c9092"
                                  >
                                    [email&nbsp;protected]
                                  </a>
                                </i>
                              </div>
                            </li>
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
                                      src="images/resources/chatlist1.jpg"
                                      alt
                                    />
                                  </div>
                                  <div className="notification-event">
                                    <span className="chat-message-item">
                                      Hi James! Please remember to buy the food
                                      for tomorrow! I’m gonna be handling the
                                      gifts and Jake’s gonna get the drinks
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
                                      Hi James! Please remember to buy the food
                                      for tomorrow! I’m gonna be handling the
                                      gifts and Jake’s gonna get the drinks
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
                                      Hi James! Please remember to buy the food
                                      for tomorrow! I’m gonna be handling the
                                      gifts and Jake’s gonna get the drinks
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

export default Timelinefriends;
