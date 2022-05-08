import React, { useState, useEffect } from "react";
import Shortcuts from "./shortcuts";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Timelineinfo from "./timeline-info";

import Header from "../header";
import axios from "axios";

function Timelinefriends(props) {
  const [friends, setFriends] = useState([]);
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
    Swal.fire({
      title: "Are you sure to delete your post ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("http://localhost:2600/api/users/" + userid + "/unfollow", {
            userId: currentUserId,
          })
          .then((res) => {
            const newList = friends.filter((f) => f._id !== userid);
            setFriends(newList);
          });
        Swal.fire("Unfollowed!", "Your friend has been  unfollowed", "success");
      }
    });
  };

  useEffect(() => {
    getFriends();
  }, []);
  return (
    <div>
      <div className="theme-layout">
        <Header currentUserId={currentUserId} />
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
                                            src={
                                              friend.profilepic
                                                ? "/uploads/users/" +
                                                  friend.profilepic
                                                : "images/resources/friend-avatar9.jpg"
                                            }
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
                                        <button
                                          className=" btn add-butn more-action"
                                          data-ripple
                                          onClick={() =>
                                            handleClick(friend._id)
                                          }
                                        >
                                          unfriend
                                        </button>
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
                              
                              </ul>
                              <button className="btn-view btn-load-more" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* centerl meta */}
                 
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
