import React, { useState,useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Donationbyuser from "./Donationbyuser";
function Donatecrud(props) {
  const currentUserId = localStorage.getItem("currentUser");
  const [imgFile, imgFileSet] = useState([]);
  const [data, setdata] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const { isValid } = useFormState({
    control,
  });
  const [open, setOpen] = React.useState(true);
  const [age, setAge] = React.useState("");
  const [istrue, setistrue] = useState(true);
  const [isupload, setisupload] = useState(true);
  const onSubmit = async (e) => {
    if (imgFile.length == 0) {
      setisupload(false);
    } else {
      var result = [];
      result.push(e);
      result.push({ image: imgFile });
      await axios
        .post("http://localhost:2600/donation/adddonation/"+currentUserId, result)
        .catch((err) => {});
      setistrue(false);
      reset();
      imgFileSet([]);
    }
  };
  const onImageChange = (i) => {
    const reader = new FileReader();
    if (i.target.files && i.target.files.length) {
      const [file] = i.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        imgFileSet(reader.result);
      };
      setisupload(true);
    }
  };
  useEffect( async () => {
    const res = await axios.get("http://localhost:2600/donation/donationbyuser/"+ currentUserId)
    console.log(res.data);
    setdata(res.data);
  },[])
  return (
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
        <div className="logo">
          <a title="true" href="newsfeed.html">
            <img src="images/logo2.png" alt="true" />
          </a>
        </div>
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
                    <a href="support-and-help-search-result.html" title="true">
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
                  <h1>Create New Donation</h1>
                  <nav className="breadcrumb">
                    <a className="breadcrumb-item" href="/">
                      Home
                    </a>
                    <span className="breadcrumb-item active">Forum</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* top area animated */}
      <section>
        <div className="gap101">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="forum-warper"></div>
                <div className="forum-form">
                  <h5 className="f-title">
                    <i className="ti-info-alt" /> Create new Donation{" "}
                  </h5>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="title"
                        id="input"
                        {...register("title", {
                          required: {
                            value: true,
                            message: "Title is required",
                          },
                        })}
                      />
                      <label className="control-label" htmlFor="input">
                        Title
                      </label>
                      <i className="mtrl-select" />
                      <i className="colorred">
                        {errors?.title && errors.title.message}
                      </i>
                    </div>

                    <div className="form-group">
                      <textarea
                        rows={4}
                        id="textarea"
                        defaultValue={""}
                        name="description"
                        {...register("description", {
                          required: {
                            value: true,
                            message: "Description is required",
                          },
                        })}
                      />
                      <label className="control-label" htmlFor="textarea">
                        description
                      </label>
                      <i className="colorred">
                        {errors?.description && errors.description.message}
                      </i>
                      <i className="mtrl-select" />
                    </div>
                    <div>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel id="demo-simple-select-standard-label">
                          Categorie
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          name="category"
                          id="demo-simple-select-standard"
                          defaultValue=""
                          {...register("category", {
                            required: {
                              value: true,
                              message: "Category is required",
                            },
                          })}
                          label="Categorie"
                        >
                          <MenuItem value={"Books"}>Books</MenuItem>
                          <MenuItem value={"Shoes"}>Shoes</MenuItem>
                          <MenuItem value={"Clothes"}>Clothes</MenuItem>
                          <MenuItem value={"Appliances"}>Appliances</MenuItem>
                          <MenuItem value={"Phones"}>Phones</MenuItem>
                          <MenuItem value={"Furniture "}>Furniture</MenuItem>
                        </Select>
                        <i className="colorred">
                          {errors?.categeory && errors.categeory.message}
                        </i>
                      </FormControl>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel id="demo-simple-select-standard-label">
                          State
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          name="state"
                          defaultValue=""
                          {...register("state", {
                            required: {
                              value: true,
                              message: "State is required",
                            },
                          })}
                          label="State"
                        >
                          <MenuItem value={"Good"}>good</MenuItem>
                          <MenuItem value={"Need restoration"}>
                            Need restoration
                          </MenuItem>
                        </Select>
                        <i className="colorred">
                          {errors?.state && errors.state.message}
                        </i>
                      </FormControl>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel id="demo-simple-select-standard-label">
                          Location
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          name="location"
                          {...register("location", {
                            required: {
                              value: true,
                              message: "Location is required",
                            },
                          })}
                          defaultValue=""
                          label="location"
                        >
                          <MenuItem value={"Gafsa"}>Gafsa</MenuItem>
                          <MenuItem value={"Nabeul"}>Nabeul</MenuItem>
                          <MenuItem value={"Sfax"}>Sfax</MenuItem>
                          <MenuItem value={"Mednine"}>Mednine</MenuItem>
                          <MenuItem value={"Tunis"}>Tunis</MenuItem>
                          <MenuItem value={"Ariana"}>Ariana</MenuItem>
                          <MenuItem value={"Mahdia"}>Mahdia</MenuItem>
                          <MenuItem value={"Sousse"}>Sousse</MenuItem>
                          <MenuItem value={"Kasserine"}>Kasserine</MenuItem>
                          <MenuItem value={"Tozeur"}>Tozeur</MenuItem>
                          <MenuItem value={"Kairawen"}>Kairawen</MenuItem>
                          <MenuItem value={"Zaghwen"}>Zaghwen</MenuItem>
                          <MenuItem value={"SidiBouzid"}>SidiBouzid</MenuItem>
                          <MenuItem value={"Gendouba"}>Gendouba</MenuItem>
                          <MenuItem value={"Monastir"}>Monastir</MenuItem>
                          <MenuItem value={"Gabes"}>Gabes</MenuItem>
                          <MenuItem value={"Siliana"}>Siliana</MenuItem>
                          <MenuItem value={"Kef"}>Kef</MenuItem>
                          <MenuItem value={"Manouba"}>Manouba</MenuItem>
                          <MenuItem value={"BenArous"}>BenArous</MenuItem>
                          <MenuItem value={"Beja"}>Beja</MenuItem>
                          <MenuItem value={"Bizerte"}>Bizerte</MenuItem>
                          <MenuItem value={"Kbeli"}>Kbeli</MenuItem>
                          <MenuItem value={"Tatouin"}>Tatouin</MenuItem>
                        </Select>
                        <i className="colorred">
                          {errors?.location && errors.location.message}
                        </i>
                      </FormControl>
                    </div>
                    <div>
                      <div className="mb-3">
                        <div>
                          <div>
                            <label
                              htmlFor="file-upload"
                              className="custom-file-upload x"
                            >
                              Upload Image{" "}
                              <CloudUploadIcon className="y"> </CloudUploadIcon>
                            </label>
                          </div>
                          <input
                            onChange={onImageChange}
                            id="file-upload"
                            type="file"
                            name="file"
                          />
                          {isupload == false && (
                            <i className="colorred">image is not uploaded</i>
                          )}
                          <div className="col-md-4"></div>
                        </div>
                      </div>
                      {imgFile.length > 0 && (
                        <div className="preview">
                          <img
                            id="imgFile"
                            name="imgfile"
                            src={imgFile}
                            style={{
                              width: 250,
                              height: 250,
                              marginTop: 5,
                              borderRadius: 3,
                              borderStyle: "groove",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="submit-btns">
                      <button type="reset" className="mtr-btn">
                        <span>Cancel</span>
                      </button>
                      <button type="submit" className="mtr-btn">
                        <span>Post Donation</span>
                      </button>
                    </div>
                    {istrue == false && (
                      <Collapse in={open}>
                        <Alert
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setOpen(false);
                              }}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                          sx={{ mb: 2 }}
                        >
                          Close me!
                        </Alert>
                      </Collapse>
                    )}
                  </form>
                </div>
              </div>
              <div className="col-lg-3">
                <aside className="sidebar full-style">
                  <div className="widget">
                    <h4 className="widget-title">Donation Statistics</h4>
                    <ul className="forum-static">
                      <li>
                        <a href="#" title="true">
                          Forums
                        </a>
                        <span>13</span>
                      </li>
                      <li>
                        <a href="#" title="true">
                          Registered Users
                        </a>
                        <span>50</span>
                      </li>
                      <li>
                        <a href="#" title="true">
                          Topics
                        </a>
                        <span>14</span>
                      </li>
                      <li>
                        <a href="#" title="true">
                          Replies
                        </a>
                        <span>32</span>
                      </li>
                      <li>
                        <a href="#" title="true">
                          Topic Tags
                        </a>
                        <span>50</span>
                      </li>
                    </ul>
                  </div>
                  <div className="widget">
                    <h4 className="widget-title">Last donations</h4>
                    <ul className="feature-topics">
                      <li>
                        <i className="fa fa-star" />
                        <a href="#" title="true">
                          What is your favourit season in summer?
                        </a>
                        <span>2 hours, 16 minutes ago</span>
                      </li>
                      <li>
                        <i className="fa fa-star" />
                        <a href="#" title="true">
                          The new Goddess of War trailer was launched at E3!
                        </a>
                        <span>2 hours, 16 minutes ago</span>
                      </li>
                      <li>
                        <i className="fa fa-star" />
                        <a href="#" title="true">
                          Summer is Coming! Picnic in the east boulevard park
                        </a>
                        <span>2 hours, 16 minutes ago</span>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div> 
       
      </section>
      <h4 className=" title">
                    <i className="ti-info-alt" /> List of your donations {" "}
      </h4>
        <div className="dip">  
        {data.length>0 &&(
      
data.map((one)=>(

  <Donationbyuser key={one._id} name={one}/>



)
))}
     </div> 
      <section>


        <div className="getquot-baner">
          <span>
            Want to join our awesome forum and start interacting with others?
          </span>
          <a href="#" title="true">
            Sign up
          </a>
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
                    The trio took this simple idea and built it into the world’s
                    leading carpooling platform.
                  </p>
                </div>
                <ul className="location">
                  <li>
                    <i className="ti-map-alt" />
                    <p>33 new montgomery st.750 san francisco, CA USA 94105.</p>
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
                    <a href="https://web.facebook.com/shopcircut/" title="true">
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
                    <a href="https://play.google.com/store?hl=en" title="true">
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
                    <a href="https://www.microsoft.com/store/apps" title="true">
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
  );
}
export default Donatecrud;
