import React, { useEffect, useState, Suspense} from "react";
import DonationCard from "./DonationCard";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TextField from "@mui/material/TextField";
import Mapaffiche from "./Mapaffiche";
import Swal from "sweetalert2";
import uuid from "react-uuid";
import { anime } from "react-anime";
const Tunisiamap = React.lazy(
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import("./TunisiaMap")), 1000)
    )
);
function Donation() {
  const [totaldoantions, settotaldoantions] = useState(0);
  const [listdoantionsbylocation, setlistdonationsbylocation] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(4);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [listdoantions, setlistdonations] = useState([]);
  const [state, setstate] = useState(true);
  let navigate = useNavigate();
  const change = async (e) => {
    const response = await axios.get(
      "http://localhost:2600/donation/listdonations"
    );
    setlistdonations(response.data);
    const searchelement = e.target.value;
    if (searchelement != "") {
      const m = listdoantions.filter((item) => {
        if (item.title.includes(searchelement)) {
          return item;
        } else {
          setstate(false);
        }
      });
      setlistdonations(m);
    } else {
      setlistdonations(response.data);
    }
  };
  const fetchdonations1 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2600/donation/listdonationsbylocation"
      );
      setlistdonationsbylocation(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchsumdonnation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2600/donation/totaldonations"
      );
      settotaldoantions(response.data.total);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchdonations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2600/donation/listdonations"
      );
      setlistdonations(response.data);
      const counters = document.querySelectorAll(".counter");
      counters.forEach((counter) => {
        counter.innerText = "0";
        const updateCounter = () => {
          const target = counter.getAttribute("data-target");
          const c = +counter.innerText;
          const increment = target / 500;
          if (c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`;
            setTimeout(updateCounter, 100);
          }
        };
        updateCounter();
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    var textWrapper = document.querySelector(".ml2");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml2 .letter",
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70 * i,
      })
      .add({
        targets: ".ml2",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
    var textWrapper = document.querySelector(".ml1");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml1 .letter",
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70 * i,
      })
      .add({
        targets: ".ml1",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
    fetchsumdonnation();
    fetchdonations();
    fetchdonations1();
  }, []);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(listdoantions.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listdoantions.slice(indexOfFirstItem, indexOfLastItem);
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <Button
          variant="outlined"
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
          style={{ borderColor: "grey", color: "grey" }}
        >
          {number}
        </Button>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <Button onClick={handleNextbtn}> &hellip; </Button>;
  }
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <Button onClick={handlePrevbtn}> &hellip; </Button>;
  }
  return (
    <div>
      <div className="theme-layout">
        <div className="responsive-header">
          <div className="mh-head first Sticky">
            <span className="mh-btns-left">
              <a className="true" href="#menu">
                <i className="fa fa-align-justify" />
              </a>
            </span>
            <span className="mh-text">
              <a href="newsfeed.html" title="true">
                <img src="images/logo2.png" alt="true" />
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
                    <a href="index-2.html" title="true">
                      Home Social
                    </a>
                  </li>
                  <li>
                    <a href="index2.html" title="true">
                      Home Social 2
                    </a>
                  </li>
                  <li>
                    <a href="index-company.html" title="true">
                      Home Company
                    </a>
                  </li>
                  <li>
                    <a href="landing.html" title="true">
                      Login page
                    </a>
                  </li>
                  <li>
                    <a href="logout.html" title="true">
                      Logout Page
                    </a>
                  </li>
                  <li>
                    <a href="newsfeed.html" title="true">
                      news feed
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Time Line</span>
                <ul>
                  <li>
                    <a href="time-line.html" title="true">
                      timeline
                    </a>
                  </li>
                  <li>
                    <a href="timeline-friends.html" title="true">
                      timeline friends
                    </a>
                  </li>
                  <li>
                    <a href="timeline-groups.html" title="true">
                      timeline groups
                    </a>
                  </li>
                  <li>
                    <a href="timeline-pages.html" title="true">
                      timeline pages
                    </a>
                  </li>
                  <li>
                    <a href="timeline-photos.html" title="true">
                      timeline photos
                    </a>
                  </li>
                  <li>
                    <a href="timeline-videos.html" title="true">
                      timeline videos
                    </a>
                  </li>
                  <li>
                    <a href="fav-page.html" title="true">
                      favourit page
                    </a>
                  </li>
                  <li>
                    <a href="groups.html" title="true">
                      groups page
                    </a>
                  </li>
                  <li>
                    <a href="page-likers.html" title="true">
                      Likes page
                    </a>
                  </li>
                  <li>
                    <a href="people-nearby.html" title="true">
                      people nearby
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Account Setting</span>
                <ul>
                  <li>
                    <a href="create-fav-page.html" title="true">
                      create fav page
                    </a>
                  </li>
                  <li>
                    <a href="edit-account-setting.html" title="true">
                      edit account setting
                    </a>
                  </li>
                  <li>
                    <a href="edit-interest.html" title="true">
                      edit-interest
                    </a>
                  </li>
                  <li>
                    <a href="edit-password.html" title="true">
                      edit-password
                    </a>
                  </li>
                  <li>
                    <a href="edit-profile-basic.html" title="true">
                      edit profile basics
                    </a>
                  </li>
                  <li>
                    <a href="edit-work-eductation.html" title="true">
                      edit work educations
                    </a>
                  </li>
                  <li>
                    <a href="messages.html" title="true">
                      message box
                    </a>
                  </li>
                  <li>
                    <a href="inbox.html" title="true">
                      Inbox
                    </a>
                  </li>
                  <li>
                    <a href="notifications.html" title="true">
                      notifications page
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>forum</span>
                <ul>
                  <li>
                    <a href="forum.html" title="true">
                      Forum Page
                    </a>
                  </li>
                  <li>
                    <a href="forums-category.html" title="true">
                      Fourm Category
                    </a>
                  </li>
                  <li>
                    <a href="forum-open-topic.html" title="true">
                      Forum Open Topic
                    </a>
                  </li>
                  <li>
                    <a href="forum-create-topic.html" title="true">
                      Forum Create Topic
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Our Shop</span>
                <ul>
                  <li>
                    <a href="shop.html" title="true">
                      Shop Products
                    </a>
                  </li>
                  <li>
                    <a href="shop-masonry.html" title="true">
                      Shop Masonry Products
                    </a>
                  </li>
                  <li>
                    <a href="shop-single.html" title="true">
                      Shop Detail Page
                    </a>
                  </li>
                  <li>
                    <a href="shop-cart.html" title="true">
                      Shop Product Cart
                    </a>
                  </li>
                  <li>
                    <a href="shop-checkout.html" title="true">
                      Product Checkout
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Our Blog</span>
                <ul>
                  <li>
                    <a href="blog-grid-wo-sidebar.html" title="true">
                      Our Blog
                    </a>
                  </li>
                  <li>
                    <a href="blog-grid-right-sidebar.html" title="true">
                      Blog with R-Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="blog-grid-left-sidebar.html" title="true">
                      Blog with L-Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="blog-masonry.html" title="true">
                      Blog Masonry Style
                    </a>
                  </li>
                  <li>
                    <a href="blog-list-wo-sidebar.html" title="true">
                      Blog List Style
                    </a>
                  </li>
                  <li>
                    <a href="blog-list-right-sidebar.html" title="true">
                      Blog List with R-Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="blog-list-left-sidebar.html" title="true">
                      Blog List with L-Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="blog-detail.html" title="true">
                      Blog Post Detail
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Portfolio</span>
                <ul>
                  <li>
                    <a href="portfolio-2colm.html" title="true">
                      Portfolio 2col
                    </a>
                  </li>
                  <li>
                    <a href="portfolio-3colm.html" title="true">
                      Portfolio 3col
                    </a>
                  </li>
                  <li>
                    <a href="portfolio-4colm.html" title="true">
                      Portfolio 4col
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Support &amp; Help</span>
                <ul>
                  <li>
                    <a href="support-and-help.html" title="true">
                      Support &amp; Help
                    </a>
                  </li>
                  <li>
                    <a href="support-and-help-detail.html" title="true">
                      Support &amp; Help Detail
                    </a>
                  </li>
                  <li>
                    <a href="support-and-help-search-result.html" title="true">
                      Support &amp; Help Search Result
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>More pages</span>
                <ul>
                  <li>
                    <a href="careers.html" title="true">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="career-detail.html" title="true">
                      Career Detail
                    </a>
                  </li>
                  <li>
                    <a href="404.html" title="true">
                      404 error page
                    </a>
                  </li>
                  <li>
                    <a href="404-2.html" title="true">
                      404 Style2
                    </a>
                  </li>
                  <li>
                    <a href="faq.html" title="true">
                      faq's page
                    </a>
                  </li>
                  <li>
                    <a href="insights.html" title="true">
                      insights
                    </a>
                  </li>
                  <li>
                    <a href="knowledge-base.html" title="true">
                      knowledge base
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="about.html" title="true">
                  about
                </a>
              </li>
              <li>
                <a href="about-company.html" title="true">
                  About Us2
                </a>
              </li>
              <li>
                <a href="contact.html" title="true">
                  contact
                </a>
              </li>
              <li>
                <a href="contact-branches.html" title="true">
                  Contact Us2
                </a>
              </li>
              <li>
                <a href="widgets.html" title="true">
                  Widgts
                </a>
              </li>
            </ul>
          </nav>
          <nav id="shoppingbag">
            <div>
              <div className="true">
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
          <div className="overlay" id="overlay">
            <nav className="overlay-menu">
              <ul className="offcanvas-menu">
                <li className="menu-item-has-children">
                  <a href="#" title="true">
                    Home
                  </a>
                  <ul>
                    <li>
                      <a href="index-2.html" title="true">
                        Home Social
                      </a>
                    </li>
                    <li>
                      <a href="index2.html" title="true">
                        Home Social 2
                      </a>
                    </li>
                    <li>
                      <a href="index-company.html" title="true">
                        Home Company
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title="true">
                    Our Blog
                  </a>
                  <ul>
                    <li>
                      <a href="blog-grid-wo-sidebar.html" title="true">
                        Our Blog
                      </a>
                    </li>
                    <li>
                      <a href="blog-grid-right-sidebar.html" title="true">
                        Blog with R-Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-grid-left-sidebar.html" title="true">
                        Blog with L-Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-masonry.html" title="true">
                        Blog Masonry Style
                      </a>
                    </li>
                    <li>
                      <a href="blog-list-wo-sidebar.html" title="true">
                        Blog List Style
                      </a>
                    </li>
                    <li>
                      <a href="blog-list-right-sidebar.html" title="true">
                        Blog List with R-Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-list-left-sidebar.html" title="true">
                        Blog List with L-Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-detail.html" title="true">
                        Blog Post Detail
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title="true">
                    Shop Pages
                  </a>
                  <ul>
                    <li>
                      <a href="shop.html" title="true">
                        Shop Products
                      </a>
                    </li>
                    <li>
                      <a href="shop-masonry.html" title="true">
                        Shop Masonry Products
                      </a>
                    </li>
                    <li>
                      <a href="shop-single.html" title="true">
                        Shop Detail Page
                      </a>
                    </li>
                    <li>
                      <a href="shop-cart.html" title="true">
                        Shop Product Cart
                      </a>
                    </li>
                    <li>
                      <a href="shop-checkout.html" title="true">
                        Product Checkout
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title="true">
                    Our Portfolio
                  </a>
                  <ul>
                    <li>
                      <a href="portfolio-2colm.html" title="true">
                        Portfolio 2col
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-3colm.html" title="true">
                        Portfolio 3col
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-4colm.html" title="true">
                        Portfolio 4col
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title="true">
                    Support &amp; Help
                  </a>
                  <ul>
                    <li>
                      <a href="support-and-help.html" title="true">
                        Support &amp; Help
                      </a>
                    </li>
                    <li>
                      <a href="support-and-help-detail.html" title="true">
                        Support &amp; Help Detail
                      </a>
                    </li>
                    <li>
                      <a
                        href="support-and-help-search-result.html"
                        title="true"
                      >
                        Support &amp; Help Search Result
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title="true">
                    Company Forum
                  </a>
                  <ul>
                    <li>
                      <a href="forum.html" title="true">
                        Forum Page
                      </a>
                    </li>
                    <li>
                      <a href="forums-category.html" title="true">
                        Fourm Category
                      </a>
                    </li>
                    <li>
                      <a href="forum-open-topic.html" title="true">
                        Forum Open Topic
                      </a>
                    </li>
                    <li>
                      <a href="forum-create-topic.html" title="true">
                        Forum Create Topic
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" title="true">
                    Featured Pages
                  </a>
                  <ul>
                    <li>
                      <a href="careers.html" title="true">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="career-detail.html" title="true">
                        Career Detail
                      </a>
                    </li>
                    <li>
                      <a href="logout.html" title="true">
                        Logout Page
                      </a>
                    </li>
                    <li>
                      <a href="404-2.html" title="true">
                        404 Errro Page
                      </a>
                    </li>
                    <li>
                      <a href="about-company.html" title="true">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="contact-branches.html" title="true">
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
                    <h1>Donation</h1>
                    <nav className="breadcrumb">
                      <a className="breadcrumb-item" href="/">
                        Home
                      </a>
                      <span className="breadcrumb-item active">Donations</span>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* top area animated */}
        <section>
          <div className="gap gray-bg">
            <div className="container-fluid">
              <div className="row" id="page-contents">
                <div className="offset-lg-1 col-lg-10">
                  <div className="career-page">
                    <div className="post-filter-sec">
                      <TextField
                        onChange={change}
                        type="text"
                        placeholder="Search Donation"
                        label="Search"
                        variant="standard"
                      />
                      <div className="purify">
                        <Link to="/donatecrud" title="true">
                          Donate
                        </Link>
                      </div>
                    </div>
                    {listdoantions.length > 0 ? (
                      <div className="display">
                        <Suspense fallback={<CircularProgress />}>
                          <Tunisiamap
                            name={listdoantionsbylocation}
                          ></Tunisiamap>
                        </Suspense>
                        <div style={{ height: "500px" }}>
                          {currentItems.map((donation) => {
                            return (
                              <DonationCard
                                key={donation._id}
                                name={donation}
                              ></DonationCard>
                            );
                          })}
                          <ul className="pageNumbers">
                            <Button
                              className="btnn"
                              variant="outlined"
                              onClick={handlePrevbtn}
                              disabled={currentPage == pages[0] ? true : false}
                            >
                              Prev
                            </Button>
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}
                            <Button
                              className="btnn"
                              variant="outlined"
                              onClick={handleNextbtn}
                              disabled={
                                currentPage == pages[pages.length - 1]
                                  ? true
                                  : false
                              }
                            >
                              Next
                            </Button>
                          </ul>
                        </div>
                        <Card
                          className="paddd"
                          sx={{ minWidth: 180, height: 400 }}
                        >
                          <div className="contents">
                            <VolunteerActivismIcon className="form1"></VolunteerActivismIcon>
                            <div className="counter-container">
                              <span className="counter1">Total Donations</span>
                              <div
                                className="counter"
                                data-target={totaldoantions}
                              >
                                {totaldoantions}
                                items
                              </div>
                            </div>
                          </div>
                          <img
                            className="charity-image"
                            src="images/charity.jpg"
                          ></img>
                        </Card>
                      </div>
                    ) : state == false ? (
                      <div className="display">
                        <Suspense fallback={<CircularProgress />}>
                          <Tunisiamap
                            name={listdoantionsbylocation}
                          ></Tunisiamap>
                        </Suspense>
                        <div style={{ height: "500px" }}>
                          {" "}
                          <div className="l-post">
                            <div className="l-post-meta">
                              {" "}
                              <h4>Item not found</h4>
                            </div>
                          </div>
                        </div>
                        <Card
                          className="paddd"
                          sx={{ minWidth: 180, height: 400 }}
                        >
                          <div className="contents">
                            <VolunteerActivismIcon className="form1"></VolunteerActivismIcon>
                            <div className="counter-container">
                              <span className="counter1">Total Donations</span>
                              <div
                                className="counter"
                                data-target={totaldoantions}
                              >
                                {totaldoantions}
                                items
                              </div>
                            </div>
                          </div>
                          <img
                            className="charity-image"
                            src="images/charity.jpg"
                          ></img>
                        </Card>
                      </div>
                    ) : (
                      <div className="positionprogress">
                        <CircularProgress />
                      </div>
                    )}
                    <div data-aos="fade-down-left">
                      <Card>
                        <CardContent>
                          <div className="display1">
                            <div>
                              <div className="display1">
                                <img className="im" src="images/gg.jpg"></img>
                                <img
                                  className="ono"
                                  src="images/newimg.png"
                                ></img>
                              </div>
                              <div className="ce ft">
                                <h1 className="co ml2">
                                  Time To Participate !
                                </h1>
                                <h4 className="co ml1">
                                  Here is the most important compaigns to donate
                                </h4>
                              </div>
                            </div>
                            <div className="st">
                              <img className="pli" src="images/spec.jpg"></img>
                            </div>
                          </div>
                          <div>
                            <Mapaffiche></Mapaffiche>{" "}
                          </div>
                        </CardContent>
                      </Card>
                      <br></br>
                      <section className="site-title">
                        <div
                          className="site-background"
                          data-aos="fade-up"
                          data-aos-delay={100}
                        >
                          <h1 style={{ color: "white" }}>
                            Plant a seed in someone’s garden
                          </h1>
                          <button
                            onClick={async () => {
                              const { value: user } = await Swal.fire({
                                title: "Input Your name",
                                input: "text",
                                inputLabel: "Your name",
                                inputPlaceholder: "Enter your name",
                                inputValidator: (value) => {
                                  if (!value) {
                                    return "You need to write name!";
                                  }
                                },
                              });
                              const { value: accept } = await Swal.fire({
                                title: "Terms and conditions",
                                html:
                                  " <h4> 1. Listen - Actively and Humbly </h4>" +
                                  "<p> While others are speaking, be present and attentive. Avoid mentally imposing your own biases, thoughts, or opinions onto what someone else is sharing</p>" +
                                  "<h4> 2. Share the air Be mindful of how much you and those around you are speaking</h4>" +
                                  "<p> If you find yourself dominating the conversation, please step back; if you have not spoken much, feel encouraged to step up.</p> " +
                                  "<h4>3. Be aware of privilege and power</h4>" +
                                  " <p>Think about how your identity and status affect how you speak and listen to others</p>",
                                input: "checkbox",
                                inputValue: 1,
                                inputPlaceholder:
                                  "I agree with the terms and conditions",
                                confirmButtonText:
                                  'Continue <i class="fa fa-arrow-right"></i>',
                                inputValidator: (result) => {
                                  return (
                                    !result && "You need to agree with T&C"
                                  );
                                },
                              });
                              if (accept) {
                                await Swal.fire({
                                  title: "Are you invited?",
                                  showDenyButton: true,
                                  confirmButtonText: "yes",
                                }).then(async (result) => {
                                  if (result.isConfirmed) {
                                    const { value: id } = await Swal.fire({
                                      input: "text",
                                      inputLabel: "Enter your room Id",
                                      inputValue: "",
                                      confirmButtonText: "Join",
                                      showCancelButton: true,
                                      inputValidator: (value) => {
                                        if (!value) {
                                          return "You need to enter your romm Id!";
                                        }
                                      },
                                    });
                                    navigate(`/test/${id}`, {
                                      state: { user, id },
                                    });
                                  } else if (result.isDenied) {
                                    const id = uuid();
                                    await Swal.fire({
                                      input: "text",
                                      inputLabel: "This is your room Id",
                                      inputValue: id,
                                      cancelButtonColor: "#d33",
                                      showCancelButton: true,
                                      confirmButtonText: "Create",
                                    }).then(async (result) => {
                                      if (result.isConfirmed) {
                                        navigate(`/test/${id}`, {
                                          state: { user, id },
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            }}
                            className="btn"
                          >
                            Chat Room
                          </button>
                        </div>
                      </section>
                    </div>
                    <br></br>
                    <div>
                      <section>
                        <h2 className="positt">List of Categories </h2>
                        <div className="gap">
                          <div className="container">
                            <div className="row" id="page-contents">
                              <div className="col-lg-12">
                                <div className="row masonry">
                                  <div className="hand col-lg-3 col-sm-6">
                                    <div className="portfolio-box">
                                      <img
                                        src="images/resources/folio-detail1.jpg"
                                        alt="true"
                                      />
                                      <div className="overlinks">
                                        <h4>
                                          <a
                                            title="true"
                                            onClick={async () => {
                                              await axios
                                                .get(
                                                  "http://localhost:2600/donation/listdonationsbycategorie/Shoes"
                                                )
                                                .then((response) => {
                                                  navigate(
                                                    "/donationbycategorie",
                                                    { state: response.data }
                                                  );
                                                });
                                            }}
                                          >
                                            Shoes
                                          </a>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="jewl col-lg-3 col-sm-6">
                                    <div className="portfolio-box">
                                      <img
                                        src="images/resources/folio-detail2.jpg"
                                        alt="true"
                                      />
                                      <div className="overlinks">
                                        <h4>
                                          <a
                                            onClick={async () => {
                                              await axios
                                                .get(
                                                  "http://localhost:2600/donation/listdonationsbycategorie/Furniture"
                                                )
                                                .then((response) => {
                                                  navigate(
                                                    "/donationbycategorie",
                                                    { state: response.data }
                                                  );
                                                });
                                            }}
                                            title="true"
                                          >
                                            Furniture
                                          </a>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accessory col-lg-3 col-sm-6">
                                    <div className="portfolio-box">
                                      <img
                                        style={{ height: "292px" }}
                                        src="images/book.jpeg"
                                        alt="true"
                                      />
                                      <div className="overlinks">
                                        <h4>
                                          <a
                                            onClick={async () => {
                                              await axios
                                                .get(
                                                  "http://localhost:2600/donation/listdonationsbycategorie/Books"
                                                )
                                                .then((response) => {
                                                  navigate(
                                                    "/donationbycategorie",
                                                    { state: response.data }
                                                  );
                                                });
                                            }}
                                            title="true"
                                          >
                                            Books
                                          </a>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="diy col-lg-3 col-sm-6">
                                    <div className="portfolio-box">
                                      <img
                                        src="images/resources/folio-detail4.jpg"
                                        alt="true"
                                      />
                                      <div className="overlinks">
                                        <h4>
                                          <a
                                            onClick={async () => {
                                              await axios
                                                .get(
                                                  "http://localhost:2600/donation/listdonationsbycategorie/Clothes"
                                                )
                                                .then((response) => {
                                                  navigate(
                                                    "/donationbycategorie",
                                                    { state: response.data }
                                                  );
                                                });
                                            }}
                                            title="true"
                                          >
                                            Clothes
                                          </a>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="cloth col-lg-3 col-sm-6">
                                    <div className="portfolio-box">
                                      <img
                                        style={{ height: "292px" }}
                                        src="images/phone1.jpg"
                                        alt="true"
                                      />
                                      <div className="overlinks">
                                        <h4>
                                          <a
                                            onClick={async () => {
                                              await axios
                                                .get(
                                                  "http://localhost:2600/donation/listdonationsbycategorie/Phones"
                                                )
                                                .then((response) => {
                                                  navigate(
                                                    "/donationbycategorie",
                                                    { state: response.data }
                                                  );
                                                });
                                            }}
                                            title="true"
                                          >
                                            Phones
                                          </a>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="jewl col-lg-3 col-sm-7">
                                    <div className="portfolio-box">
                                      <img
                                        src="images/resources/folio-detail8.jpg"
                                        alt="true"
                                      />
                                      <div className="overlinks">
                                        <h4>
                                          <a
                                            onClick={async () => {
                                              await axios
                                                .get(
                                                  "http://localhost:2600/donation/listdonationsbycategorie/Appliances"
                                                )
                                                .then((response) => {
                                                  navigate(
                                                    "/donationbycategorie",
                                                    { state: response.data }
                                                  );
                                                });
                                            }}
                                            title="true"
                                          >
                                            Appliances
                                          </a>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
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
                      <a href="index-2.html" title="true">
                        <img src="images/logo.png" alt="true" />
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
                      <a
                        href="https://web.facebook.com/shopcircut/"
                        title="true"
                      >
                        facebook
                      </a>
                    </li>
                    <li>
                      <i className="fa fa-twitter-square" />
                      <a href="https://twitter.com/login?lang=en" title="true">
                        twitter
                      </a>
                    </li>
                    <li>
                      <i className="fa fa-instagram" />
                      <a href="https://www.instagram.com/?hl=en" title="true">
                        instagram
                      </a>
                    </li>
                    <li>
                      <i className="fa fa-google-plus-square" />{" "}
                      <a href="https://plus.google.com/discover" title="true">
                        Google+
                      </a>
                    </li>
                    <li>
                      <i className="fa fa-pinterest-square" />{" "}
                      <a href="https://www.pinterest.com/" title="true">
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
                      <a href="about.html" title="true">
                        about us
                      </a>
                    </li>
                    <li>
                      <a href="contact.html" title="true">
                        contact us
                      </a>
                    </li>
                    <li>
                      <a href="terms.html" title="true">
                        terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a href="#" title="true">
                        RSS syndication
                      </a>
                    </li>
                    <li>
                      <a href="sitemap.html" title="true">
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
                      <a href="#" title="true">
                        leasing
                      </a>
                    </li>
                    <li>
                      <a href="#" title="true">
                        submit route
                      </a>
                    </li>
                    <li>
                      <a href="#" title="true">
                        how does it work?
                      </a>
                    </li>
                    <li>
                      <a href="#" title="true">
                        agent listings
                      </a>
                    </li>
                    <li>
                      <a href="#" title="true">
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
                      <a
                        href="https://play.google.com/store?hl=en"
                        title="true"
                      >
                        <i className="fa fa-android" />
                        android
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.apple.com/lae/ios/app-store/"
                        title="true"
                      >
                        <i className="ti-apple" />
                        iPhone
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.microsoft.com/store/apps"
                        title="true"
                      >
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
                  <img src="images/credit-cards.png" alt="true" />
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
      {/* side panel */}
    </div>
  );
}
export default Donation;
