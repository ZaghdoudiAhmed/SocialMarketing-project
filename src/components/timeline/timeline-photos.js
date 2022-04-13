import React, { useState, useEffect } from "react";
import Header from "../header";
import Shortcuts from "./shortcuts";
import Timelineinfo from "./timeline-info";
import axios from "axios";

function Timelinephotos(props) {
  const url = "http://localhost:2600/posts";
  const [postData, setPostData] = useState([]);
  const [friends, setFriends] = useState([]);

  const [currentUser, setCurrentUser] = useState("");
  const currentUserId = localStorage.getItem("currentUser");

  const getPosts = async () => {
    try {
      axios.get(url + "/all/" + currentUserId).then((res) => {
        setPostData(res.data);
      });
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

  useEffect(() => {
    getPosts();
    getFriends();
  }, [currentUserId]);

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
                        <div className="widget">
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
                                Sacred Games, Spartcus Blood, Games of theron
                              </p>
                            </li>
                            <li>
                              <span>favourit music</span>
                              <p>Justin Biber, Nati Natsha, Shakira</p>
                            </li>
                          </ul>
                        </div>
                        {/* profile intro widget */}
                      </aside>
                    </div>
                    {/* sidebar */}
                    <div className="col-lg-6">
                      <div className="central-meta">
                        {postData.length ? (
                          <ul className="photos">
                            {postData?.map((p) => (
                              <li>
                                <a
                                  className="strip"
                                  href={
                                    "http://127.0.0.1:5500/server/uploads/" +
                                    p.Photo
                                  }
                                  title
                                  data-strip-group="mygroup"
                                  data-strip-group-options="loop: false"
                                >
                                  <img
                                    src={
                                      "http://127.0.0.1:5500/server/uploads/" +
                                      p.Photo
                                    }
                                    alt
                                  />
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        <div className="lodmore">
                          <button className="btn-view btn-load-more" />
                        </div>
                      </div>
                      {/* photos */}
                    </div>
                    {/* centerl meta */}
                    <div className="col-lg-3">
                      <aside className="sidebar static">
                        <div className="widget">
                          <h4 className="widget-title">Twitter feed</h4>
                          <ul className="twiter-feed">
                            <li>
                              <i className="fa fa-twitter" />
                              <span>
                                <i>jhon william</i>
                                @jhonwilliam
                              </span>
                              <p>
                                tomorrow with the company we were working and 5
                                child run away from the working place.{" "}
                                <a href="#" title>
                                  #daydream5k
                                </a>{" "}
                              </p>
                              <em>2 hours ago</em>
                            </li>
                            <li>
                              <i className="fa fa-twitter" />
                              <span>
                                <i>Kelly watson</i>
                                @kelly
                              </span>
                              <p>
                                tomorrow with the company we were working and 5
                                child run away from the working place.{" "}
                                <a href="#" title>
                                  #daydream5k
                                </a>{" "}
                              </p>
                              <em>2 hours ago</em>
                            </li>
                            <li>
                              <i className="fa fa-twitter" />
                              <span>
                                <i>Jony bravo</i>
                                @jonibravo
                              </span>
                              <p>
                                tomorrow with the company we were working and 5
                                child run away from the working place.{" "}
                                <a href="#" title>
                                  #daydream5k
                                </a>{" "}
                              </p>
                              <em>2 hours ago</em>
                            </li>
                          </ul>
                        </div>
                        {/* twitter feed*/}
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
                                    data-cfemail="36415f5842534445595a52534476515b575f5a1855595b"
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
                                    data-cfemail="741615061a1107341319151d185a171b19"
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
                                    data-cfemail="3852594b57565a785f55595154165b5755"
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
                                    data-cfemail="761c170519181436111b171f1a5815191b"
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
                                    data-cfemail="6a000b190504082a0d070b030644090507"
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
                                    data-cfemail="5c363d2f33323e1c3b313d3530723f3331"
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
                                    data-cfemail="c3a9a2b0acada183a4aea2aaafeda0acae"
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
                                    data-cfemail="e08a81938f8e82a0878d81898cce838f8d"
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
                                    data-cfemail="781a190a161d0b381f15191114561b1715"
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

export default Timelinephotos;
