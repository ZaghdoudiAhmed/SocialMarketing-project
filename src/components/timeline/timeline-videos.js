import React from "react";
import Header from "../header";
import Shortcuts from "./shortcuts";
import Timelineinfo from "./timeline-info";

function Timelinevideos(props) {
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
                  <Timelineinfo />
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
                          <h4 className="widget-title">Your page</h4>
                          <div className="your-page">
                            <figure>
                              <a title href="#">
                                <img
                                  alt
                                  src="images/resources/friend-avatar9.jpg"
                                />
                              </a>
                            </figure>
                            <div className="page-meta">
                              <a className="underline" title href="#">
                                My page
                              </a>
                              <span>
                                <i className="ti-comment" />
                                Messages <em>9</em>
                              </span>
                              <span>
                                <i className="ti-bell" />
                                Notifications <em>2</em>
                              </span>
                            </div>
                            <div className="page-likes">
                              <ul className="nav nav-tabs likes-btn">
                                <li className="nav-item">
                                  <a
                                    data-toggle="tab"
                                    href="#link1"
                                    className="active"
                                  >
                                    likes
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a data-toggle="tab" href="#link2" className>
                                    views
                                  </a>
                                </li>
                              </ul>
                              {/* Tab panes */}
                              <div className="tab-content">
                                <div
                                  id="link1"
                                  className="tab-pane active fade show"
                                >
                                  <span>
                                    <i className="ti-heart" />
                                    884
                                  </span>
                                  <a title="weekly-likes" href="#">
                                    35 new likes this week
                                  </a>
                                  <div className="users-thumb-list">
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Anderw"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-1.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="frank"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-2.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Sara"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-3.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Amy"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-4.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Ema"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-5.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Sophie"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-6.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Maria"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-7.jpg"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div id="link2" className="tab-pane fade">
                                  <span>
                                    <i className="ti-eye" />
                                    445
                                  </span>
                                  <a title="weekly-likes" href="#">
                                    440 new views this week
                                  </a>
                                  <div className="users-thumb-list">
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Anderw"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-1.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="frank"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-2.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Sara"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-3.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Amy"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-4.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Ema"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-5.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Sophie"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-6.jpg"
                                      />
                                    </a>
                                    <a
                                      data-toggle="tooltip"
                                      title
                                      href="#"
                                      data-original-title="Maria"
                                    >
                                      <img
                                        alt
                                        src="images/resources/userlist-7.jpg"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Shortcuts />
                        {/* Shortcuts */}
                      </aside>
                    </div>
                    {/* sidebar */}
                    <div className="col-lg-6">
                      <div className="central-meta">
                        <ul className="photos">
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo1.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
													C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo2.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
														C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo3.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
													C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo4.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
													C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo5.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
													C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo6.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
														C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo7.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
													C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo8.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
													C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo9.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
													C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo10.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
													C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo11.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
													C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <img src="images/resources/photo12.jpg" alt />
                              <i>
                                <svg
                                  version="1.1"
                                  className="play"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  height="40px"
                                  width="40px"
                                  viewBox="0 0 100 100"
                                  enableBackground="new 0 0 100 100"
                                  xmlSpace="preserve"
                                >
                                  <path
                                    className="stroke-solid"
                                    fill="none"
                                    stroke
                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
													C97.3,23.7,75.7,2.3,49.9,2.5"
                                  />
                                  <path
                                    className="icon"
                                    fill
                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                  />
                                </svg>
                              </i>
                            </a>
                          </li>
                        </ul>
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
                                    data-cfemail="91e6f8ffe5f4e3e2fefdf5f4e3d1f6fcf0f8fdbff2fefc"
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
                                    data-cfemail="9dfffceff3f8eeddfaf0fcf4f1b3fef2f0"
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
                                    data-cfemail="cda7acbea2a3af8daaa0aca4a1e3aea2a0"
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
                                    data-cfemail="ef858e9c80818daf88828e8683c18c8082"
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
                                    data-cfemail="e38982908c8d81a3848e828a8fcd808c8e"
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
                                    data-cfemail="7c161d0f13121e3c1b111d1510521f1311"
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
                                    data-cfemail="305a51435f5e5270575d51595c1e535f5d"
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
                                    data-cfemail="107a71637f7e7250777d71797c3e737f7d"
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
                                    data-cfemail="4a282b38242f390a2d272b232664292527"
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

export default Timelinevideos;
