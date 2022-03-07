import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";

import Post from "./post/post";
import Header from "./header";

function Accueil() {
  const url = "http://localhost:3000/posts";
  const [postData, setPostData] = useState([]);
  const [newDescription, setNewDescription] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const [file, setFile] = useState();
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = new FormData();

    post.append("Photo", file);
    post.append("Description", newDescription);
    post.append("Private", true);
    post.append("Creator", "reirfrj45656rgrjyg5656");

    try {
      const res = await axios.post(url, post);
      setPostData([...postData, res.data]);
      setNewDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  const getPosts = async () => {
    try {
      axios.get(url + "/all/" + "12338roty456ze3494zer34aa").then((res) => {
        setPostData(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, ["12338roty456ze3494zer34aa"]);

  return (
    <div>
      <div className="theme-layout">
        <Header />

        <div className="fixed-sidebar right">
          <div className="chat-friendz">
            <ul className="chat-users">
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend1.jpg" alt />
                  <span className="status f-online" />
                </div>
              </li>
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend2.jpg" alt />
                  <span className="status f-away" />
                </div>
              </li>
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend3.jpg" alt />
                  <span className="status f-online" />
                </div>
              </li>
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend4.jpg" alt />
                  <span className="status f-offline" />
                </div>
              </li>
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend5.jpg" alt />
                  <span className="status f-online" />
                </div>
              </li>
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend6.jpg" alt />
                  <span className="status f-online" />
                </div>
              </li>
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend7.jpg" alt />
                  <span className="status f-offline" />
                </div>
              </li>
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend8.jpg" alt />
                  <span className="status f-online" />
                </div>
              </li>
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend9.jpg" alt />
                  <span className="status f-away" />
                </div>
              </li>
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend10.jpg" alt />
                  <span className="status f-away" />
                </div>
              </li>
              <li>
                <div className="author-thmb">
                  <img src="images/resources/side-friend8.jpg" alt />
                  <span className="status f-online" />
                </div>
              </li>
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
                            <li>
                              <i className="ti-comments-smiley" />
                              <Link to="/messages">Messages</Link>
                            </li>
                            <li>
                              <i className="ti-bell" />
                              <a href="notifications.html" title>
                                Notifications
                              </a>
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
                      <div className="central-meta">
                        <div className="new-postbox">
                          <figure>
                            <img src="images/resources/admin2.jpg" alt />
                          </figure>
                          <div className="newpst-input">
                            <form>
                              <textarea
                                rows={2}
                                placeholder="write something"
                                defaultValue={""}
                                onChange={(e) =>
                                  setNewDescription(e.target.value)
                                }
                                value={newDescription}
                              />

                              <div className="attachments">
                                <ul>
                                  <li>
                                    <i className="fa fa-music" />
                                    <label className="fileContainer">
                                      <input type="file" />
                                    </label>
                                  </li>
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
                                    <i className="fa fa-camera" />
                                    <label className="fileContainer">
                                      <input type="file" />
                                    </label>
                                  </li>
                                  <li>
                                    <button
                                      onClick={handleSubmit}
                                      type="submit"
                                    >
                                      Post
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      {/* add post new box */}
                      <div className="loadMore">
                        {postData.map((p) => (
                          <Post post={p} />
                        ))}
                        <div className="central-meta item">
                          <div className="user-post">
                            <div className="friend-info">
                              <figure>
                                <img src="images/resources/nearly1.jpg" alt />
                              </figure>
                              <div className="friend-name">
                                <ins>
                                  <a href="time-line.html" title>
                                    Sara Grey
                                  </a>
                                </ins>
                                <span>published: june,2 2018 19:PM</span>
                              </div>
                              <div className="post-meta">
                                <iframe
                                  width
                                  height={315}
                                  src="https://www.youtube.com/embed/5JJ_jqqpTMY"
                                  allow="autoplay;"
                                  allowFullScreen
                                />
                                <div className="we-video-info">
                                  <ul>
                                    <li>
                                      <span
                                        className="views"
                                        data-toggle="tooltip"
                                        title="views"
                                      >
                                        <i className="fa fa-eye" />
                                        <ins>1.2k</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="comment"
                                        data-toggle="tooltip"
                                        title="Comments"
                                      >
                                        <i className="fa fa-comments-o" />
                                        <ins>52</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="like"
                                        data-toggle="tooltip"
                                        title="like"
                                      >
                                        <i className="ti-heart" />
                                        <ins>2.2k</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="dislike"
                                        data-toggle="tooltip"
                                        title="dislike"
                                      >
                                        <i className="ti-heart-broken" />
                                        <ins>200</ins>
                                      </span>
                                    </li>
                                    <li className="social-media">
                                      <div className="menu">
                                        <div className="btn trigger">
                                          <i className="fa fa-share-alt" />
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-html5" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-facebook" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-google-plus" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-twitter" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-css3" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-instagram" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-dribbble" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-pinterest" />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="description">
                                  <p>
                                    Lonely Cat Enjoying in Summer Curabitur{" "}
                                    <a href="#" title>
                                      #mypage
                                    </a>{" "}
                                    ullamcorper ultricies nisi. Nam eget dui.
                                    Etiam rhoncus. Maecenas tempus, tellus eget
                                    condimentum rhoncus, sem quam semper libero,
                                    sit amet adipiscing sem neque sed ipsum. Nam
                                    quam nunc,
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="coment-area">
                              <ul className="we-comet">
                                <li>
                                  <div className="comet-avatar">
                                    <img
                                      src="images/resources/comet-1.jpg"
                                      alt
                                    />
                                  </div>
                                  <div className="we-comment">
                                    <div className="coment-head">
                                      <h5>
                                        <a href="time-line.html" title>
                                          Jason borne
                                        </a>
                                      </h5>
                                      <span>1 year ago</span>
                                      <a
                                        className="we-reply"
                                        href="#"
                                        title="Reply"
                                      >
                                        <i className="fa fa-reply" />
                                      </a>
                                    </div>
                                    <p>
                                      we are working for the dance and sing
                                      songs. this video is very awesome for the
                                      youngster. please vote this video and like
                                      our channel
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="comet-avatar">
                                    <img
                                      src="images/resources/comet-2.jpg"
                                      alt
                                    />
                                  </div>
                                  <div className="we-comment">
                                    <div className="coment-head">
                                      <h5>
                                        <a href="time-line.html" title>
                                          Sophia
                                        </a>
                                      </h5>
                                      <span>1 week ago</span>
                                      <a
                                        className="we-reply"
                                        href="#"
                                        title="Reply"
                                      >
                                        <i className="fa fa-reply" />
                                      </a>
                                    </div>
                                    <p>
                                      we are working for the dance and sing
                                      songs. this video is very awesome for the
                                      youngster.
                                      <i className="em em-smiley" />
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title
                                    className="showmore underline"
                                  >
                                    more comments
                                  </a>
                                </li>
                                <li className="post-comment">
                                  <div className="comet-avatar">
                                    <img
                                      src="images/resources/comet-2.jpg"
                                      alt
                                    />
                                  </div>
                                  <div className="post-comt-box">
                                    <form method="post">
                                      <textarea
                                        placeholder="Post your comment"
                                        defaultValue={""}
                                      />
                                      <div className="add-smiles">
                                        <span
                                          className="em em-expressionless"
                                          title="add icon"
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
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="central-meta item">
                          <div className="user-post">
                            <div className="friend-info">
                              <figure>
                                <img src="images/resources/nearly6.jpg" alt />
                              </figure>
                              <div className="friend-name">
                                <ins>
                                  <a href="time-line.html" title>
                                    Sophia
                                  </a>
                                </ins>
                                <span>published: january,5 2018 19:PM</span>
                              </div>
                              <div className="post-meta">
                                <div className="post-map">
                                  <div className="nearby-map">
                                    <div id="map-canvas" />
                                  </div>
                                </div>
                                {/* near by map */}
                                <div className="we-video-info">
                                  <ul>
                                    <li>
                                      <span
                                        className="views"
                                        data-toggle="tooltip"
                                        title="views"
                                      >
                                        <i className="fa fa-eye" />
                                        <ins>1.2k</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="comment"
                                        data-toggle="tooltip"
                                        title="Comments"
                                      >
                                        <i className="fa fa-comments-o" />
                                        <ins>52</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="like"
                                        data-toggle="tooltip"
                                        title="like"
                                      >
                                        <i className="ti-heart" />
                                        <ins>2.2k</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="dislike"
                                        data-toggle="tooltip"
                                        title="dislike"
                                      >
                                        <i className="ti-heart-broken" />
                                        <ins>200</ins>
                                      </span>
                                    </li>
                                    <li className="social-media">
                                      <div className="menu">
                                        <div className="btn trigger">
                                          <i className="fa fa-share-alt" />
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-html5" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-facebook" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-google-plus" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-twitter" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-css3" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-instagram" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-dribbble" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-pinterest" />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="description">
                                  <p>
                                    Curabitur Lonely Cat Enjoying in Summer{" "}
                                    <a href="#" title>
                                      #mypage
                                    </a>{" "}
                                    ullamcorper ultricies nisi. Nam eget dui.
                                    Etiam rhoncus. Maecenas tempus, tellus eget
                                    condimentum rhoncus, sem quam semper libero,
                                    sit amet adipiscing sem neque sed ipsum. Nam
                                    quam nunc,
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="coment-area">
                              <ul className="we-comet">
                                <li>
                                  <div className="comet-avatar">
                                    <img
                                      src="images/resources/comet-1.jpg"
                                      alt
                                    />
                                  </div>
                                  <div className="we-comment">
                                    <div className="coment-head">
                                      <h5>
                                        <a href="time-line.html" title>
                                          Jason borne
                                        </a>
                                      </h5>
                                      <span>1 year ago</span>
                                      <a
                                        className="we-reply"
                                        href="#"
                                        title="Reply"
                                      >
                                        <i className="fa fa-reply" />
                                      </a>
                                    </div>
                                    <p>
                                      we are working for the dance and sing
                                      songs. this video is very awesome for the
                                      youngster. please vote this video and like
                                      our channel
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="comet-avatar">
                                    <img
                                      src="images/resources/comet-2.jpg"
                                      alt
                                    />
                                  </div>
                                  <div className="we-comment">
                                    <div className="coment-head">
                                      <h5>
                                        <a href="time-line.html" title>
                                          Sophia
                                        </a>
                                      </h5>
                                      <span>1 week ago</span>
                                      <a
                                        className="we-reply"
                                        href="#"
                                        title="Reply"
                                      >
                                        <i className="fa fa-reply" />
                                      </a>
                                    </div>
                                    <p>
                                      we are working for the dance and sing
                                      songs. this video is very awesome for the
                                      youngster.
                                      <i className="em em-smiley" />
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title
                                    className="showmore underline"
                                  >
                                    more comments
                                  </a>
                                </li>
                                <li className="post-comment">
                                  <div className="comet-avatar">
                                    <img
                                      src="images/resources/comet-2.jpg"
                                      alt
                                    />
                                  </div>
                                  <div className="post-comt-box">
                                    <form method="post">
                                      <textarea
                                        placeholder="Post your comment"
                                        defaultValue={""}
                                      />
                                      <div className="add-smiles">
                                        <span
                                          className="em em-expressionless"
                                          title="add icon"
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
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="central-meta item">
                          <div className="user-post">
                            <div className="friend-info">
                              <figure>
                                <img
                                  alt
                                  src="images/resources/friend-avatar10.jpg"
                                />
                              </figure>
                              <div className="friend-name">
                                <ins>
                                  <a title href="time-line.html">
                                    test
                                  </a>
                                </ins>
                                <span>published: june,2 2018 19:PM</span>
                              </div>
                              <div className="description">
                                <p>
                                  Curabitur World's most beautiful car in{" "}
                                  <a title href="#">
                                    #test drive booking !
                                  </a>{" "}
                                  the most beatuiful car available in america
                                  and the saudia arabia, you can book your test
                                  drive by our official website
                                </p>
                              </div>
                              <div className="post-meta">
                                <div className="linked-image align-left">
                                  <a title href="#">
                                    <img alt src="images/resources/page1.jpg" />
                                  </a>
                                </div>
                                <div className="detail">
                                  <span>Love Maid - ChillGroves</span>
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    ipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna
                                    aliqua...{" "}
                                  </p>
                                  <a title href="#">
                                    www.sample.com
                                  </a>
                                </div>
                                <div className="we-video-info">
                                  <ul>
                                    <li>
                                      <span
                                        className="views"
                                        data-toggle="tooltip"
                                        title="views"
                                      >
                                        <i className="fa fa-eye" />
                                        <ins>1.2k</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="comment"
                                        data-toggle="tooltip"
                                        title="Comments"
                                      >
                                        <i className="fa fa-comments-o" />
                                        <ins>52</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="like"
                                        data-toggle="tooltip"
                                        title="like"
                                      >
                                        <i className="ti-heart" />
                                        <ins>2.2k</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="dislike"
                                        data-toggle="tooltip"
                                        title="dislike"
                                      >
                                        <i className="ti-heart-broken" />
                                        <ins>200</ins>
                                      </span>
                                    </li>
                                    <li className="social-media">
                                      <div className="menu">
                                        <div className="btn trigger">
                                          <i className="fa fa-share-alt" />
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-html5" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-facebook" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-google-plus" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-twitter" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-css3" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-instagram" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-dribbble" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-pinterest" />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="friend-info">
                              <figure>
                                <img
                                  alt
                                  src="images/resources/friend-avatar10.jpg"
                                />
                              </figure>
                              <div className="friend-name">
                                <ins>
                                  <a title href="time-line.html">
                                    Janice Griffith
                                  </a>
                                </ins>
                                <span>published: june,2 2018 19:PM</span>
                              </div>
                              <div className="description">
                                <p>
                                  Curabitur World's most beautiful car in{" "}
                                  <a title href="#">
                                    #test drive booking !
                                  </a>{" "}
                                  the most beatuiful car available in america
                                  and the saudia arabia, you can book your test
                                  drive by our official website
                                </p>
                              </div>
                              <div className="post-meta">
                                <div className="linked-image align-left">
                                  <a title href="#">
                                    <img alt src="images/resources/page1.jpg" />
                                  </a>
                                </div>
                                <div className="detail">
                                  <span>Love Maid - ChillGroves</span>
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    ipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna
                                    aliqua...{" "}
                                  </p>
                                  <a title href="#">
                                    www.sample.com
                                  </a>
                                </div>
                                <div className="we-video-info">
                                  <ul>
                                    <li>
                                      <span
                                        className="views"
                                        data-toggle="tooltip"
                                        title="views"
                                      >
                                        <i className="fa fa-eye" />
                                        <ins>1.2k</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="comment"
                                        data-toggle="tooltip"
                                        title="Comments"
                                      >
                                        <i className="fa fa-comments-o" />
                                        <ins>52</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="like"
                                        data-toggle="tooltip"
                                        title="like"
                                      >
                                        <i className="ti-heart" />
                                        <ins>2.2k</ins>
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="dislike"
                                        data-toggle="tooltip"
                                        title="dislike"
                                      >
                                        <i className="ti-heart-broken" />
                                        <ins>200</ins>
                                      </span>
                                    </li>
                                    <li className="social-media">
                                      <div className="menu">
                                        <div className="btn trigger">
                                          <i className="fa fa-share-alt" />
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-html5" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-facebook" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-google-plus" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-twitter" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-css3" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-instagram" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-dribbble" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="rotater">
                                          <div className="btn btn-icon">
                                            <a href="#" title>
                                              <i className="fa fa-pinterest" />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
                                <a href="insight.html" title>
                                  Messages <em>9</em>
                                </a>
                              </span>
                              <span>
                                <i className="ti-bell" />
                                <a href="insight.html" title>
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
