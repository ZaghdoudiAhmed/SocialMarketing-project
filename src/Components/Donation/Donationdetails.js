import React, { useEffect, useRef, useState } from "react";
import { useLocation, Outlet, Link, route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useForm, useFormState } from "react-hook-form";
function Donationdetails(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const socketRef = useRef();
  const [posts, setposts] = useState([]);
  useEffect(() => {
    socketRef.current = io.connect("http://localhost:2600");
    socketRef.current.on("connection", (msg) => {
      socketRef.current.on("session", (msg) => {});
      socketRef.current.on("new message", (msg) => {
        setposts([...posts, msg.post]);
      });
    });
  }, [posts]);
  const renderChat = () => {
    return posts.map((post, index) => (
      <li key={index} className="me">
        <div className="notification-event">
          <span className="chat-message-item">
            <div>
              <div className="chat-thumb">
                <img src="images/resources/ahmed.gif" alt />
              </div>
              <div className="notification-event">
                <span className="chat-message-item">{post}</span>
                <span className="notification-date">
                  <time
                    dateTime="2004-07-24T18:18"
                    className="entry-date updated"
                  >
                    Yesterday at 8:10pm
                  </time>
                </span>
              </div>
            </div>
          </span>
        </div>
      </li>
    ));
  };
  const { state } = useLocation();
  const change = () => {
    var elts = document.getElementsByClassName("chat-box");
    elts[0].classList.add("show");
  };
  const onSubmit = async (e) => {
    socketRef.current.emit("chat", e);
    reset();
  };
  const close = () => {
    var elts = document.getElementsByClassName("chat-box");
    elts[0].classList.remove("show");
  };
  return (
    <div>
      <div className="theme-layout">
        <div className="responsive-header">
          <div className="mh-head first Sticky">
            <span className="mh-btns-left">
              <a className href="#menu">
                <i className="fa fa-align-justify" />
              </a>
            </span>
            <span className="mh-text">
              <a href="newsfeed.html" title>
                <img src="images/logo2.png" alt />
              </a>
            </span>
            <span className="mh-btns-right">
              <a className="fa fa-sliders" href="#shoppingbag" />
            </span>
          </div>
          <div className="mh-head second">
            <form className="mh-form">
              <input placeholder="search" />
              <a href="#/" className="fa fa-search" />
            </form>
          </div>
          <nav id="menu" className="res-menu">
            <ul>
              <li>
                <span>Home</span>
                <ul>
                  <li>
                    <a href="index-2.html" title>
                      Home Social
                    </a>
                  </li>
                  <li>
                    <a href="index2.html" title>
                      Home Social 2
                    </a>
                  </li>
                  <li>
                    <a href="index-company.html" title>
                      Home Company
                    </a>
                  </li>
                  <li>
                    <a href="landing.html" title>
                      Login page
                    </a>
                  </li>
                  <li>
                    <a href="logout.html" title>
                      Logout Page
                    </a>
                  </li>
                  <li>
                    <a href="newsfeed.html" title>
                      news feed
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Time Line</span>
                <ul>
                  <li>
                    <a href="time-line.html" title>
                      timeline
                    </a>
                  </li>
                  <li>
                    <a href="timeline-friends.html" title>
                      timeline friends
                    </a>
                  </li>
                  <li>
                    <a href="timeline-groups.html" title>
                      timeline groups
                    </a>
                  </li>
                  <li>
                    <a href="timeline-pages.html" title>
                      timeline pages
                    </a>
                  </li>
                  <li>
                    <a href="timeline-photos.html" title>
                      timeline photos
                    </a>
                  </li>
                  <li>
                    <a href="timeline-videos.html" title>
                      timeline videos
                    </a>
                  </li>
                  <li>
                    <a href="fav-page.html" title>
                      favourit page
                    </a>
                  </li>
                  <li>
                    <a href="groups.html" title>
                      groups page
                    </a>
                  </li>
                  <li>
                    <a href="page-likers.html" title>
                      Likes page
                    </a>
                  </li>
                  <li>
                    <a href="people-nearby.html" title>
                      people nearby
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Account Setting</span>
                <ul>
                  <li>
                    <a href="create-fav-page.html" title>
                      create fav page
                    </a>
                  </li>
                  <li>
                    <a href="edit-account-setting.html" title>
                      edit account setting
                    </a>
                  </li>
                  <li>
                    <a href="edit-interest.html" title>
                      edit-interest
                    </a>
                  </li>
                  <li>
                    <a href="edit-password.html" title>
                      edit-password
                    </a>
                  </li>
                  <li>
                    <a href="edit-profile-basic.html" title>
                      edit profile basics
                    </a>
                  </li>
                  <li>
                    <a href="edit-work-eductation.html" title>
                      edit work educations
                    </a>
                  </li>
                  <li>
                    <a href="messages.html" title>
                      message box
                    </a>
                  </li>
                  <li>
                    <a href="inbox.html" title>
                      Inbox
                    </a>
                  </li>
                  <li>
                    <a href="notifications.html" title>
                      notifications page
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>forum</span>
                <ul>
                  <li>
                    <a href="forum.html" title>
                      Forum Page
                    </a>
                  </li>
                  <li>
                    <a href="forums-category.html" title>
                      Fourm Category
                    </a>
                  </li>
                  <li>
                    <a href="forum-open-topic.html" title>
                      Forum Open Topic
                    </a>
                  </li>
                  <li>
                    <a href="forum-create-topic.html" title>
                      Forum Create Topic
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Our Shop</span>
                <ul>
                  <li>
                    <a href="shop.html" title>
                      Shop Products
                    </a>
                  </li>
                  <li>
                    <a href="shop-masonry.html" title>
                      Shop Masonry Products
                    </a>
                  </li>
                  <li>
                    <a href="shop-single.html" title>
                      Shop Detail Page
                    </a>
                  </li>
                  <li>
                    <a href="shop-cart.html" title>
                      Shop Product Cart
                    </a>
                  </li>
                  <li>
                    <a href="shop-checkout.html" title>
                      Product Checkout
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Our Blog</span>
                <ul>
                  <li>
                    <a href="blog-grid-wo-sidebar.html" title>
                      Our Blog
                    </a>
                  </li>
                  <li>
                    <a href="blog-grid-right-sidebar.html" title>
                      Blog with R-Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="blog-grid-left-sidebar.html" title>
                      Blog with L-Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="blog-masonry.html" title>
                      Blog Masonry Style
                    </a>
                  </li>
                  <li>
                    <a href="blog-list-wo-sidebar.html" title>
                      Blog List Style
                    </a>
                  </li>
                  <li>
                    <a href="blog-list-right-sidebar.html" title>
                      Blog List with R-Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="blog-list-left-sidebar.html" title>
                      Blog List with L-Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="blog-detail.html" title>
                      Blog Post Detail
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Portfolio</span>
                <ul>
                  <li>
                    <a href="portfolio-2colm.html" title>
                      Portfolio 2col
                    </a>
                  </li>
                  <li>
                    <a href="portfolio-3colm.html" title>
                      Portfolio 3col
                    </a>
                  </li>
                  <li>
                    <a href="portfolio-4colm.html" title>
                      Portfolio 4col
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Support &amp; Help</span>
                <ul>
                  <li>
                    <a href="support-and-help.html" title>
                      Support &amp; Help
                    </a>
                  </li>
                  <li>
                    <a href="support-and-help-detail.html" title>
                      Support &amp; Help Detail
                    </a>
                  </li>
                  <li>
                    <a href="support-and-help-search-result.html" title>
                      Support &amp; Help Search Result
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>More pages</span>
                <ul>
                  <li>
                    <a href="careers.html" title>
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="career-detail.html" title>
                      Career Detail
                    </a>
                  </li>
                  <li>
                    <a href="404.html" title>
                      404 error page
                    </a>
                  </li>
                  <li>
                    <a href="404-2.html" title>
                      404 Style2
                    </a>
                  </li>
                  <li>
                    <a href="faq.html" title>
                      faq's page
                    </a>
                  </li>
                  <li>
                    <a href="insights.html" title>
                      insights
                    </a>
                  </li>
                  <li>
                    <a href="knowledge-base.html" title>
                      knowledge base
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="about.html" title>
                  about
                </a>
              </li>
              <li>
                <a href="about-company.html" title>
                  About Us2
                </a>
              </li>
              <li>
                <a href="contact.html" title>
                  contact
                </a>
              </li>
              <li>
                <a href="contact-branches.html" title>
                  Contact Us2
                </a>
              </li>
              <li>
                <a href="widgets.html" title>
                  Widgts
                </a>
              </li>
            </ul>
          </nav>
          <nav id="shoppingbag">
            <div>
              <div className>
                <form method="post">
                  <div className="setting-row">
                    <span>use night mode</span>
                    <input type="checkbox" id="nightmode" />
                    <label
                      htmlFor="nightmode"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                  <div className="setting-row">
                    <span>Notifications</span>
                    <input type="checkbox" id="switch2" />
                    <label
                      htmlFor="switch2"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                  <div className="setting-row">
                    <span>Notification sound</span>
                    <input type="checkbox" id="switch3" />
                    <label
                      htmlFor="switch3"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                  <div className="setting-row">
                    <span>My profile</span>
                    <input type="checkbox" id="switch4" />
                    <label
                      htmlFor="switch4"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                  <div className="setting-row">
                    <span>Show profile</span>
                    <input type="checkbox" id="switch5" />
                    <label
                      htmlFor="switch5"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                </form>
                <h4 className="panel-title">Account Setting</h4>
                <form method="post">
                  <div className="setting-row">
                    <span>Sub users</span>
                    <input type="checkbox" id="switch6" />
                    <label
                      htmlFor="switch6"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                  <div className="setting-row">
                    <span>personal account</span>
                    <input type="checkbox" id="switch7" />
                    <label
                      htmlFor="switch7"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                  <div className="setting-row">
                    <span>Business account</span>
                    <input type="checkbox" id="switch8" />
                    <label
                      htmlFor="switch8"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                  <div className="setting-row">
                    <span>Show me online</span>
                    <input type="checkbox" id="switch9" />
                    <label
                      htmlFor="switch9"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                  <div className="setting-row">
                    <span>Delete history</span>
                    <input type="checkbox" id="switch10" />
                    <label
                      htmlFor="switch10"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                  <div className="setting-row">
                    <span>Expose author name</span>
                    <input type="checkbox" id="switch11" />
                    <label
                      htmlFor="switch11"
                      data-on-label="ON"
                      data-off-label="OFF"
                    />
                  </div>
                </form>
              </div>
            </div>
          </nav>
        </div>
        {/* responsive header */}
        <div className="topbar transparent">
          <div className="logo">
            <a title href="newsfeed.html">
              <img src="images/logo2.png" alt />
            </a>
          </div>
          <div className="menu-container" id="toggle">
            <a href="#" className="canvas-menu">
              <i className="fa fa-times fa-bars" aria-hidden="true" />
            </a>
          </div>
          <div className="overlay" id="overlay">
            <nav className="overlay-menu">
              <ul className="offcanvas-menu">
                <li className="menu-item-has-children">
                  <a href="#" title>
                    Home
                  </a>
                  <ul>
                    <li>
                      <a href="index-2.html" title>
                        Home Social
                      </a>
                    </li>
                    <li>
                      <a href="index2.html" title>
                        Home Social 2
                      </a>
                    </li>
                    <li>
                      <a href="index-company.html" title>
                        Home Company
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title>
                    Our Blog
                  </a>
                  <ul>
                    <li>
                      <a href="blog-grid-wo-sidebar.html" title>
                        Our Blog
                      </a>
                    </li>
                    <li>
                      <a href="blog-grid-right-sidebar.html" title>
                        Blog with R-Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-grid-left-sidebar.html" title>
                        Blog with L-Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-masonry.html" title>
                        Blog Masonry Style
                      </a>
                    </li>
                    <li>
                      <a href="blog-list-wo-sidebar.html" title>
                        Blog List Style
                      </a>
                    </li>
                    <li>
                      <a href="blog-list-right-sidebar.html" title>
                        Blog List with R-Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-list-left-sidebar.html" title>
                        Blog List with L-Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-detail.html" title>
                        Blog Post Detail
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title>
                    Shop Pages
                  </a>
                  <ul>
                    <li>
                      <a href="shop.html" title>
                        Shop Products
                      </a>
                    </li>
                    <li>
                      <a href="shop-masonry.html" title>
                        Shop Masonry Products
                      </a>
                    </li>
                    <li>
                      <a href="shop-single.html" title>
                        Shop Detail Page
                      </a>
                    </li>
                    <li>
                      <a href="shop-cart.html" title>
                        Shop Product Cart
                      </a>
                    </li>
                    <li>
                      <a href="shop-checkout.html" title>
                        Product Checkout
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title>
                    Our Portfolio
                  </a>
                  <ul>
                    <li>
                      <a href="portfolio-2colm.html" title>
                        Portfolio 2col
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-3colm.html" title>
                        Portfolio 3col
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-4colm.html" title>
                        Portfolio 4col
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title>
                    Support &amp; Help
                  </a>
                  <ul>
                    <li>
                      <a href="support-and-help.html" title>
                        Support &amp; Help
                      </a>
                    </li>
                    <li>
                      <a href="support-and-help-detail.html" title>
                        Support &amp; Help Detail
                      </a>
                    </li>
                    <li>
                      <a href="support-and-help-search-result.html" title>
                        Support &amp; Help Search Result
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title>
                    Company Forum
                  </a>
                  <ul>
                    <li>
                      <a href="forum.html" title>
                        Forum Page
                      </a>
                    </li>
                    <li>
                      <a href="forums-category.html" title>
                        Fourm Category
                      </a>
                    </li>
                    <li>
                      <a href="forum-open-topic.html" title>
                        Forum Open Topic
                      </a>
                    </li>
                    <li>
                      <a href="forum-create-topic.html" title>
                        Forum Create Topic
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title>
                    Featured Pages
                  </a>
                  <ul>
                    <li>
                      <a href="careers.html" title>
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="career-detail.html" title>
                        Career Detail
                      </a>
                    </li>
                    <li>
                      <a href="logout.html" title>
                        Logout Page
                      </a>
                    </li>
                    <li>
                      <a href="404-2.html" title>
                        404 Errro Page
                      </a>
                    </li>
                    <li>
                      <a href="about-company.html" title>
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="contact-branches.html" title>
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* topbar transparent header */}
        <section>
          <div className="ext-gap bluesh high-opacity">
            <div
              className="content-bg-wrap"
              style={{ background: "url(images/resources/animated-bg2.png)" }}
            />
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="top-banner">
                    <h1>Donation Detail </h1>
                    <nav className="breadcrumb">
                      <Link className="breadcrumb-item" to="/*">
                        Home
                      </Link>
                      <span className="breadcrumb-item active">
                        Donation Detail
                      </span>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* top area animated */}
        <section>
          <div className="chat-box">
            <div className="chat-head">
              <span className="status f-online" />
              <h6>Ahmed Chokri</h6>
              <div className="more">
                <span>
                  <i className="ti-more-alt" />
                </span>
                <span className="close-mesage">
                  <i className="ti-close" onClick={close} />
                </span>
              </div>
            </div>
            <div className="chat-list">
              <ul className="scroll">{renderChat()}</ul>
              <form className="text-box" onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  name="post"
                  id="textarea"
                  defaultValue={""}
                  {...register("post")}
                  placeholder="Post enter to post..."
                />
                <Button type="submit">
                  <SendIcon></SendIcon>{" "}
                </Button>
              </form>
            </div>
          </div>
          <div className="gap100">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="prod-detail">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="prod-avatar">
                          <ul className="slider-for-gold">
                            <li>
                              <img src={state.image} alt />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="full-postmeta">
                          <h4>{state.title}</h4>
                          <i>DESCRIPTION</i>
                          <p>{state.description}</p>

                          <div className="delivery-guide">
                            <a href="#" title>
                              Size Guide
                            </a>
                            <a href="#" title>
                              Delivery &amp; Return
                            </a>
                          </div>
                          <a className="add_to_wishlist" href="#" title>
                            <i className="fa fa-heart-o" />
                          </a>
                          <div className="prod categories">
                            <span className="cat-heading">
                              Categories:
                              <a href="#" title>
                                {state.category}
                              </a>
                            </span>
                          </div>
                          <div className="prod tags">
                            <span className="cat-heading">
                              Location:
                              <a href="#" title>
                                {state.location}
                              </a>
                            </span>
                          </div>
                          <div className="prod tags">
                            <span className="cat-heading">
                              State:
                              <i className="colorstate"> {state.state}</i>
                            </span>
                          </div>
                          <div>
                            <Avatar
                              onClick={change}
                              alt="Remy Sharp"
                              src="images/resources/ahmed.gif"
                            />
                          </div>
                          <div className="extras">
                            <a
                              href="https://www.youtube.com/watch?v=MIbbtEjdYrc"
                              title
                              data-strip-group="mygroup"
                              className="strip btn2"
                              data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"
                            >
                              <i className="fa fa-play-circle" />
                              Watch video
                            </a>
                          </div>
                          {/* play video btn */}
                        </div>
                      </div>
                    </div>
                    <div className="gap no-bottom">
                      <div className="tab-section">
                        <ul className="nav nav-tabs single-btn">
                          <li className="nav-item">
                            <a
                              className="active"
                              href="#desc"
                              data-toggle="tab"
                            >
                              Description
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className href="#additional" data-toggle="tab">
                              Additional Information
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className href="#review" data-toggle="tab">
                              Reviews (2)
                            </a>
                          </li>
                        </ul>
                        {/* Tab panes */}
                        <div className="tab-content">
                          <div className="tab-pane active fade show " id="desc">
                            <div className="more-pix">
                              <h2 className="main-title text-center">
                                Shoes for Men Black
                              </h2>
                              <div className="row">
                                <div className="offset-md-1 col-lg-10">
                                  <p className="prod-info text-center">
                                    Let the rest look at you with starry eyes,
                                    as you show off your love for fashion and
                                    for the company by carrying this grey
                                    handbag from Inc.5. Featuring a
                                    sophisticated gusseted design and delicate
                                    laser cut details all over,and find the way
                                    through the maze of the creative
                                    process/journey. this handbag is a cut above
                                    the rest. It also has twin grab handles and
                                    a zip closure that allows the ease of
                                    carrying.
                                  </p>
                                  <p className="prod-info text-center">
                                    Ariadne’s thread is the thread of the divine
                                    present in all things. or rather uncover,
                                    their source and find the way through the
                                    maze of the creative process/journey. Let
                                    the rest look at you with starry eyes, as
                                    you show off your love for fashion and for
                                    the company by carrying this grey handbag
                                    from Inc.5.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="additional">
                            <div className="aditional-inf">
                              <h2 className="main-title">
                                Shoes for Men Black
                              </h2>
                              <p className="adition-info">
                                Fusce vestibulum justo id varius tristique.
                                Vivamus purus odio, interdum id massa
                                ullamcorper, tempus.
                              </p>
                              <table className="table table-responsive adition">
                                <tbody>
                                  <tr>
                                    <td className="bold">Material:</td>
                                    <td>Cotton</td>
                                  </tr>
                                  <tr>
                                    <td className="bold">Weight:</td>
                                    <td>100 g</td>
                                  </tr>
                                  <tr>
                                    <td className="bold">Color:</td>
                                    <td>Beige, white, blue</td>
                                  </tr>
                                  <tr>
                                    <td className="bold">Size:</td>
                                    <td>44, 48, 50</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="review">
                            <div className="woocommerce-Reviews">
                              <div id="comments">
                                <h2 className="woocommerce-Reviews-title">
                                  Reviews
                                </h2>
                                <ol className="commentlist">
                                  <li>
                                    <div className="comment_container">
                                      <img
                                        src="images/resources/single-comment1.jpg"
                                        alt
                                        className="avatar"
                                      />
                                      <div className="comment-text">
                                        <span className="user-name">
                                          Jason Bourne
                                        </span>
                                        <a className="post-date">24 Sep 2018</a>
                                        <div className="star-rating">
                                          <span>
                                            <i className="fa fa-star" />
                                          </span>
                                          <span>
                                            <i className="fa fa-star" />
                                          </span>
                                          <span>
                                            <i className="fa fa-star" />
                                          </span>
                                          <span>
                                            <i className="fa fa-star" />
                                          </span>
                                          <span>
                                            <i className="fa fa-star" />
                                          </span>
                                        </div>
                                        <p>
                                          Duis ante magna, aliquet sit amet
                                          sagittis vitae, tristique at lacus. Ut
                                          et accumsan turpis. Phasellus ornare,
                                          tortor ut congue imperdiet, mauris
                                          magna condimentum nulla, non malesuada
                                          mauris massa eu augue.
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="comment_container">
                                      <img
                                        src="images/resources/single-comment1.jpg"
                                        alt
                                        className="avatar"
                                      />
                                      <div className="comment-text">
                                        <span className="user-name">
                                          Jhon Cena
                                        </span>
                                        <a className="post-date">12 Aug 2018</a>
                                        <div className="star-rating">
                                          <span>
                                            <i className="fa fa-star" />
                                          </span>
                                          <span>
                                            <i className="fa fa-star" />
                                          </span>
                                          <span>
                                            <i className="fa fa-star" />
                                          </span>
                                          <span>
                                            <i className="fa fa-star" />
                                          </span>
                                          <span>
                                            <i className="fa fa-star" />
                                          </span>
                                        </div>
                                        <p>
                                          Duis ante magna, aliquet sit amet
                                          sagittis vitae, tristique at lacus. Ut
                                          et accumsan turpis. Phasellus ornare,
                                          tortor ut congue imperdiet, mauris
                                          magna condimentum nulla, non malesuada
                                          mauris massa eu augue.
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                </ol>
                              </div>
                              <div id="respond" className="comment-respond">
                                <h3 className="reply-title">
                                  Post Your Review:
                                </h3>
                                <div className="star-rating">
                                  <label>Rating:</label>
                                  <span>
                                    <i className="fa fa-star" />
                                  </span>
                                  <span>
                                    <i className="fa fa-star" />
                                  </span>
                                  <span>
                                    <i className="fa fa-star" />
                                  </span>
                                  <span>
                                    <i className="fa fa-star" />
                                  </span>
                                  <span>
                                    <i className="fa fa-star" />
                                  </span>
                                </div>
                                <form method="post">
                                  <p className="comment-notes">
                                    <span id="email-notes">
                                      Your email address will not be published.
                                    </span>{" "}
                                    Required fields are marked{" "}
                                    <span className="required">*</span>
                                  </p>
                                  <p className="comment-form-author">
                                    <input
                                      type="text"
                                      placeholder="Your Name*"
                                    />
                                  </p>
                                  <p className="comment-form-email">
                                    <input type="text" placeholder="Email*" />
                                  </p>
                                  <p className="comment-notes">
                                    <textarea
                                      placeholder="Enter your review*"
                                      defaultValue={""}
                                    />
                                  </p>
                                </form>
                                <p className="form-submit">
                                  <input
                                    type="submit"
                                    className="submit"
                                    defaultValue="submit"
                                  />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gap no-bottom">
                      <div className="section-heading">
                        <h2>Related Products</h2>
                      </div>
                      <div className="row remove-ext-50">
                        <div className="col-lg-3 col-sm-6">
                          <div className="product-box">
                            <figure>
                              <span className="new">New</span>
                              <img src="images/resources/shop1.jpg" alt />
                              <ul className="cart-optionz">
                                <li>
                                  <a
                                    href="#"
                                    title="Add Cart"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-shopping-cart" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Quick Shop"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-eye" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Wishlist"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-heart" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Compare"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-split-v-alt" />
                                  </a>
                                </li>
                              </ul>
                            </figure>
                            <div className="product-name">
                              <h5>
                                <a href="#" title>
                                  GSound wireless Headphone
                                </a>
                              </h5>
                              <ul className="starz">
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                              </ul>
                              <div className="prices">
                                <ins>$29</ins>
                                <del>$39</del>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="product-box">
                            <figure>
                              <span className="hot">Hot</span>
                              <img src="images/resources/shop2.jpg" alt />
                              <ul className="cart-optionz">
                                <li>
                                  <a
                                    href="#"
                                    title="Add Cart"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-shopping-cart" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Quick Shop"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-eye" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Wishlist"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-heart" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Compare"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-split-v-alt" />
                                  </a>
                                </li>
                              </ul>
                            </figure>
                            <div className="product-name">
                              <h5>
                                <a href="#" title>
                                  High class Men watch
                                </a>
                              </h5>
                              <ul className="starz">
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                              </ul>
                              <div className="prices">
                                <ins>$29</ins>
                                <del>$39</del>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="product-box">
                            <figure>
                              <img src="images/resources/shop3.jpg" alt />
                              <ul className="cart-optionz">
                                <li>
                                  <a
                                    href="#"
                                    title="Add Cart"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-shopping-cart" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Quick Shop"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-eye" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Wishlist"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-heart" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Compare"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-split-v-alt" />
                                  </a>
                                </li>
                              </ul>
                            </figure>
                            <div className="product-name">
                              <h5>
                                <a href="#" title>
                                  Shoes for Men
                                </a>
                              </h5>
                              <ul className="starz">
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                              </ul>
                              <div className="prices">
                                <ins>$49</ins>
                                <del>$59</del>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="product-box">
                            <figure>
                              <span className="sale">sale</span>
                              <img src="images/resources/shop4.jpg" alt />
                              <ul className="cart-optionz">
                                <li>
                                  <a
                                    href="#"
                                    title="Add Cart"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-shopping-cart" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Quick Shop"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-eye" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Wishlist"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-heart" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    title="Compare"
                                    data-toggle="tooltip"
                                  >
                                    <i className="ti-split-v-alt" />
                                  </a>
                                </li>
                              </ul>
                            </figure>
                            <div className="product-name">
                              <h5>
                                <a href="#" title>
                                  Leather Pent Belt
                                </a>
                              </h5>
                              <ul className="starz">
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                              </ul>
                              <div className="prices">
                                <ins>$29</ins>
                                <del>$39</del>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* related products */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* shop detail meta */}
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
        <script
          data-cfasync="false"
          src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
        ></script>
        <script src="js/map-init.js"></script>
        <script src="js/main.min.js"></script>
        <script src="js/script.js"></script>
      </div>
    </div>
  );
}
export default Donationdetails;
