import React from "react";
import Header from "../header";

function About(props) {
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
                        <a className href="time-line.html" title data-ripple>
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
                        <a
                          className
                          href="timeline-groups.html"
                          title
                          data-ripple
                        >
                          Groups
                        </a>
                        <a
                          className="active"
                          href="about.html"
                          title
                          data-ripple
                        >
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
                        <div className="widget">
                          <h4 className="widget-title">Edit info</h4>
                          <ul className="naves">
                            <li>
                              <i className="ti-info-alt" />
                              <a title href="edit-profile-basic.html">
                                Basic info
                              </a>
                            </li>
                            <li>
                              <i className="ti-mouse-alt" />
                              <a title href="edit-work-eductation.html">
                                Education &amp; Work
                              </a>
                            </li>
                            <li>
                              <i className="ti-heart" />
                              <a title href="edit-interest.html">
                                My interests
                              </a>
                            </li>
                            <li>
                              <i className="ti-settings" />
                              <a title href="edit-account-setting.html">
                                account setting
                              </a>
                            </li>
                            <li>
                              <i className="ti-lock" />
                              <a title href="edit-password.html">
                                change password
                              </a>
                            </li>
                          </ul>
                        </div>
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
                      </aside>
                    </div>
                    {/* sidebar */}
                    <div className="col-lg-6">
                      <div className="central-meta">
                        <div className="about">
                          <div className="personal">
                            <h5 className="f-title">
                              <i className="ti-info-alt" /> Personal Info
                            </h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="d-flex flex-row mt-2">
                            <ul className="nav nav-tabs nav-tabs--vertical nav-tabs--left">
                              <li className="nav-item">
                                <a
                                  href="#basic"
                                  className="nav-link active"
                                  data-toggle="tab"
                                >
                                  Basic info
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="#location"
                                  className="nav-link"
                                  data-toggle="tab"
                                >
                                  location
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="#work"
                                  className="nav-link"
                                  data-toggle="tab"
                                >
                                  work and education
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="#interest"
                                  className="nav-link"
                                  data-toggle="tab"
                                >
                                  interests
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="#lang"
                                  className="nav-link"
                                  data-toggle="tab"
                                >
                                  languages
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content">
                              <div
                                className="tab-pane fade show active"
                                id="basic"
                              >
                                <ul className="basics">
                                  <li>
                                    <i className="ti-user" />
                                    sarah grey
                                  </li>
                                  <li>
                                    <i className="ti-map-alt" />
                                    live in Dubai
                                  </li>
                                  <li>
                                    <i className="ti-mobile" />
                                    +1-234-345675
                                  </li>
                                  <li>
                                    <i className="ti-email" />
                                    <a
                                      href="https://wpkixx.com/cdn-cgi/l/email-protection"
                                      className="__cf_email__"
                                      data-cfemail="3c4553494e515d55507c59515d5550125f5351"
                                    >
                                      [email&nbsp;protected]
                                    </a>
                                  </li>
                                  <li>
                                    <i className="ti-world" />
                                    www.yoursite.com
                                  </li>
                                </ul>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="location"
                                role="tabpanel"
                              >
                                <div className="location-map">
                                  <div id="map-canvas" />
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="work"
                                role="tabpanel"
                              >
                                <div>
                                  <a href="#" title>
                                    Envato
                                  </a>
                                  <p>
                                    work as autohr in envato themeforest from
                                    2013
                                  </p>
                                  <ul className="education">
                                    <li>
                                      <i className="ti-facebook" /> BSCS from
                                      Oxford University
                                    </li>
                                    <li>
                                      <i className="ti-twitter" /> MSCS from
                                      Harvard Unversity
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="interest"
                                role="tabpanel"
                              >
                                <ul className="basics">
                                  <li>Footbal</li>
                                  <li>internet</li>
                                  <li>photography</li>
                                </ul>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="lang"
                                role="tabpanel"
                              >
                                <ul className="basics">
                                  <li>english</li>
                                  <li>french</li>
                                  <li>spanish</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* centerl meta */}
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

export default About;
