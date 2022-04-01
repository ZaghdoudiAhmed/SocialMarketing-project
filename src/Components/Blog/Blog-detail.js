import React,{useEffect,useState} from 'react';
import { Outlet, Link ,route,Routes,useLocation ,useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import {useForm,useFormState} from "react-hook-form";
const BlogDetail = () => {
const [comments , setcomments]=useState([])

const [replies , setreplies]=useState([])
const {register,handleSubmit,reset,formState: { errors },control }=useForm();
const [nbrcomments,setsnbrcomments] = useState(0)
    const { isValid } = useFormState({
      control
    });
  const { state } = useLocation();
  async function fetchdata(){
    const id = state._id;
    await axios.get('http://localhost:2600/comment/getcomment/'+`${id}`).then(result => {
////console.log(result.data);
setcomments(result.data);

 })
 await axios.get('http://localhost:2600/comment/getcommentcount/'+`${id}`).then(result => {
  ///console.log(result.data);
  setsnbrcomments(result.data.nbrcomment);

   })
 await axios.get('http://localhost:2600/reply/getreply/'+`${id}`).then(result => {
  //console.log(result.data);
  setreplies(result.data);
   })
  }
  const fetchcomments =async () => {
await axios.get('http://localhost:2600/comment/getcomment/'+`${state._id}`).then(result => {
      ////console.log(result.data);
      setcomments(result.data);
      console.log(comments);
       })

  }
  const onSubmit =   (e) => {
  
  var result = [];
   result.push(e);
   result.push(state._id)
  //// console.log(result);

   axios.post("http://localhost:2600/comment/addcomment",result).catch((err) => {console.log(err);}).then(result=>{

   fetchcomments();

    reset();
 
   })
  

  fetchdata();
  }
   useEffect(() => {
  fetchdata();
  ////console.log(comments)
 },[])
 

    return (
        <div>
      <div>
  <div className="theme-layout">
    <div className="responsive-header">
      <div className="mh-head first Sticky">
        <span className="mh-btns-left">
          <a className href="#menu"><i className="fa fa-align-justify" /></a>
        </span>
        <span className="mh-text">
          <a href="newsfeed.html" title><img src="images/logo2.png" alt /></a>
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
          <li><span>Home</span>
            <ul>
              <li><a href="index-2.html" title>Home Social</a></li>
              <li><a href="index2.html" title>Home Social 2</a></li>
              <li><a href="index-company.html" title>Home Company</a></li>
              <li><a href="landing.html" title>Login page</a></li>
              <li><a href="logout.html" title>Logout Page</a></li>
              <li><a href="newsfeed.html" title>news feed</a></li>
            </ul>
          </li>
          <li><span>Time Line</span>
            <ul>
              <li><a href="time-line.html" title>timeline</a></li>
              <li><a href="timeline-friends.html" title>timeline friends</a></li>
              <li><a href="timeline-groups.html" title>timeline groups</a></li>
              <li><a href="timeline-pages.html" title>timeline pages</a></li>
              <li><a href="timeline-photos.html" title>timeline photos</a></li>
              <li><a href="timeline-videos.html" title>timeline videos</a></li>
              <li><a href="fav-page.html" title>favourit page</a></li>
              <li><a href="groups.html" title>groups page</a></li>
              <li><a href="page-likers.html" title>Likes page</a></li>
              <li><a href="people-nearby.html" title>people nearby</a></li>
            </ul>
          </li>
          <li><span>Account Setting</span>
            <ul>
              <li><a href="create-fav-page.html" title>create fav page</a></li>
              <li><a href="edit-account-setting.html" title>edit account setting</a></li>
              <li><a href="edit-interest.html" title>edit-interest</a></li>
              <li><a href="edit-password.html" title>edit-password</a></li>
              <li><a href="edit-profile-basic.html" title>edit profile basics</a></li>
              <li><a href="edit-work-eductation.html" title>edit work educations</a></li>
              <li><a href="messages.html" title>message box</a></li>
              <li><a href="inbox.html" title>Inbox</a></li>
              <li><a href="notifications.html" title>notifications page</a></li>
            </ul>
          </li>
          <li><span>forum</span>
            <ul>
              <li><a href="forum.html" title>Forum Page</a></li>
              <li><a href="forums-category.html" title>Fourm Category</a></li>
              <li><a href="forum-open-topic.html" title>Forum Open Topic</a></li>
              <li><a href="forum-create-topic.html" title>Forum Create Topic</a></li>
            </ul>
          </li>
          <li><span>Our Shop</span>
            <ul>
              <li><a href="shop.html" title>Shop Products</a></li>
              <li><a href="shop-masonry.html" title>Shop Masonry Products</a></li>
              <li><a href="shop-single.html" title>Shop Detail Page</a></li>
              <li><a href="shop-cart.html" title>Shop Product Cart</a></li>
              <li><a href="shop-checkout.html" title>Product Checkout</a></li>
            </ul>
          </li>
          <li><span>Our Blog</span>
            <ul>
              <li><a href="blog-grid-wo-sidebar.html" title>Our Blog</a></li>
              <li><a href="blog-grid-right-sidebar.html" title>Blog with R-Sidebar</a></li>
              <li><a href="blog-grid-left-sidebar.html" title>Blog with L-Sidebar</a></li>
              <li><a href="blog-masonry.html" title>Blog Masonry Style</a></li>
              <li><a href="blog-list-wo-sidebar.html" title>Blog List Style</a></li>
              <li><a href="blog-list-right-sidebar.html" title>Blog List with R-Sidebar</a></li>
              <li><a href="blog-list-left-sidebar.html" title>Blog List with L-Sidebar</a></li>
              <li><a href="blog-detail.html" title>Blog Post Detail</a></li>
            </ul>
          </li>
          <li><span>Portfolio</span>
            <ul>
              <li><a href="portfolio-2colm.html" title>Portfolio 2col</a></li>
              <li><a href="portfolio-3colm.html" title>Portfolio 3col</a></li>
              <li><a href="portfolio-4colm.html" title>Portfolio 4col</a></li>
            </ul>
          </li>
          <li><span>Support &amp; Help</span>
            <ul>
              <li><a href="support-and-help.html" title>Support &amp; Help</a></li>
              <li><a href="support-and-help-detail.html" title>Support &amp; Help Detail</a></li>
              <li><a href="support-and-help-search-result.html" title>Support &amp; Help Search Result</a></li>
            </ul>
          </li>
          <li><span>More pages</span>
            <ul>
              <li><a href="careers.html" title>Careers</a></li>
              <li><a href="career-detail.html" title>Career Detail</a></li>
              <li><a href="404.html" title>404 error page</a></li>
              <li><a href="404-2.html" title>404 Style2</a></li>
              <li><a href="faq.html" title>faq's page</a></li>
              <li><a href="insights.html" title>insights</a></li>
              <li><a href="knowledge-base.html" title>knowledge base</a></li>
            </ul>
          </li>
          <li><a href="about.html" title>about</a></li>
          <li><a href="about-company.html" title>About Us2</a></li>
          <li><a href="contact.html" title>contact</a></li>
          <li><a href="contact-branches.html" title>Contact Us2</a></li>
          <li><a href="widgets.html" title>Widgts</a></li>
        </ul>
      </nav>
      <nav id="shoppingbag">
        <div>
          <div className>
            <form method="post">
              <div className="setting-row">
                <span>use night mode</span>
                <input type="checkbox" id="nightmode" /> 
                <label htmlFor="nightmode" data-on-label="ON" data-off-label="OFF" />
              </div>
              <div className="setting-row">
                <span>Notifications</span>
                <input type="checkbox" id="switch2" /> 
                <label htmlFor="switch2" data-on-label="ON" data-off-label="OFF" />
              </div>
              <div className="setting-row">
                <span>Notification sound</span>
                <input type="checkbox" id="switch3" /> 
                <label htmlFor="switch3" data-on-label="ON" data-off-label="OFF" />
              </div>
              <div className="setting-row">
                <span>My profile</span>
                <input type="checkbox" id="switch4" /> 
                <label htmlFor="switch4" data-on-label="ON" data-off-label="OFF" />
              </div>
              <div className="setting-row">
                <span>Show profile</span>
                <input type="checkbox" id="switch5" /> 
                <label htmlFor="switch5" data-on-label="ON" data-off-label="OFF" />
              </div>
            </form>
            <h4 className="panel-title">Account Setting</h4>
            <form method="post">
              <div className="setting-row">
                <span>Sub users</span>
                <input type="checkbox" id="switch6" /> 
                <label htmlFor="switch6" data-on-label="ON" data-off-label="OFF" />
              </div>
              <div className="setting-row">
                <span>personal account</span>
                <input type="checkbox" id="switch7" /> 
                <label htmlFor="switch7" data-on-label="ON" data-off-label="OFF" />
              </div>
              <div className="setting-row">
                <span>Business account</span>
                <input type="checkbox" id="switch8" /> 
                <label htmlFor="switch8" data-on-label="ON" data-off-label="OFF" />
              </div>
              <div className="setting-row">
                <span>Show me online</span>
                <input type="checkbox" id="switch9" /> 
                <label htmlFor="switch9" data-on-label="ON" data-off-label="OFF" />
              </div>
              <div className="setting-row">
                <span>Delete history</span>
                <input type="checkbox" id="switch10" /> 
                <label htmlFor="switch10" data-on-label="ON" data-off-label="OFF" />
              </div>
              <div className="setting-row">
                <span>Expose author name</span>
                <input type="checkbox" id="switch11" /> 
                <label htmlFor="switch11" data-on-label="ON" data-off-label="OFF" />
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>{/* responsive header */}
    <div className="topbar transparent">
      <div className="logo">
        <a title href="newsfeed.html"><img src="images/logo2.png" alt /></a>
      </div>
      <div className="menu-container" id="toggle">
        <a href="#" className="canvas-menu">
          <i className="fa fa-times fa-bars" aria-hidden="true" /></a>
      </div>
      <div className="overlay" id="overlay">
        <nav className="overlay-menu">
          <ul className="offcanvas-menu">
            <li className="menu-item-has-children">
              <a href="#" title>Home</a>
              <ul>
                <li><a href="index-2.html" title>Home Social</a></li>
                <li><a href="index2.html" title>Home Social 2</a></li>
                <li><a href="index-company.html" title>Home Company</a></li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a href="#" title>Our Blog</a>
              <ul>
                <li><a href="blog-grid-wo-sidebar.html" title>Our Blog</a></li>
                <li><a href="blog-grid-right-sidebar.html" title>Blog with R-Sidebar</a></li>
                <li><a href="blog-grid-left-sidebar.html" title>Blog with L-Sidebar</a></li>
                <li><a href="blog-masonry.html" title>Blog Masonry Style</a></li>
                <li><a href="blog-list-wo-sidebar.html" title>Blog List Style</a></li>
                <li><a href="blog-list-right-sidebar.html" title>Blog List with R-Sidebar</a></li>
                <li><a href="blog-list-left-sidebar.html" title>Blog List with L-Sidebar</a></li>
                <li><a href="blog-detail.html" title>Blog Post Detail</a></li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a href="#" title>Shop Pages</a>
              <ul>
                <li><a href="shop.html" title>Shop Products</a></li>
                <li><a href="shop-masonry.html" title>Shop Masonry Products</a></li>
                <li><a href="shop-single.html" title>Shop Detail Page</a></li>
                <li><a href="shop-cart.html" title>Shop Product Cart</a></li>
                <li><a href="shop-checkout.html" title>Product Checkout</a></li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a href="#" title>Our Portfolio</a>
              <ul>
                <li><a href="portfolio-2colm.html" title>Portfolio 2col</a></li>
                <li><a href="portfolio-3colm.html" title>Portfolio 3col</a></li>
                <li><a href="portfolio-4colm.html" title>Portfolio 4col</a></li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a href="#" title>Support &amp; Help</a>
              <ul>
                <li><a href="support-and-help.html" title>Support &amp; Help</a></li>
                <li><a href="support-and-help-detail.html" title>Support &amp; Help Detail</a></li>
                <li><a href="support-and-help-search-result.html" title>Support &amp; Help Search Result</a></li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a href="#" title>Company Forum</a>
              <ul>
                <li><a href="forum.html" title>Forum Page</a></li>
                <li><a href="forums-category.html" title>Fourm Category</a></li>
                <li><a href="forum-open-topic.html" title>Forum Open Topic</a></li>
                <li><a href="forum-create-topic.html" title>Forum Create Topic</a></li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a href="#" title>Featured Pages</a>
              <ul>
                <li><a href="careers.html" title>Careers</a></li>
                <li><a href="career-detail.html" title>Career Detail</a></li>
                <li><a href="logout.html" title>Logout Page</a></li>
                <li><a href="404-2.html" title>404 Errro Page</a></li>
                <li><a href="about-company.html" title>About Us</a></li>
                <li><a href="contact-branches.html" title>Contact Us</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>{/* topbar transparent header */}
    <section>
      <div className="ext-gap bluesh high-opacity">
        <div className="content-bg-wrap" style={{background: 'url(images/resources/animated-bg2.png)'}} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="top-banner">
                <h1>Blog Detail</h1>
                <nav className="breadcrumb">
                  <a className="breadcrumb-item" href="index-2.html">Home</a>
                  <span className="breadcrumb-item active">Blog Detail</span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>{/* top area animated */}
    <section>
      <div className="gap ext-bottom">
        <div className="container">
          <div className="row">
            <div className="offset-lg-1 col-lg-10">
              <div className="detail-page">
                <div className="detail-top">
                  <img src="images/resources/blog-detailfull.jpg" alt />
                  <div className="connect-with">
                    <ul className="social-connect">
                      <li className="rs">
                        <i className="fa fa-rss" />
                        <span>
                          <a title href="#">Subscribe</a>
                          <i>to Rss Feed</i>
                        </span>
                      </li>
                      <li className="twit">
                        <i className="fa fa-twitter" />
                        <span>
                          <a title href="#">Follow Us</a>
                          <i>on twitter</i>
                        </span>
                      </li>
                      <li className="fb">
                        <i className="fa fa-facebook" />
                        <span>
                          <a title href="#">Find Us</a>
                          <i>on Facebook</i>
                        </span>
                      </li>
                      <li className="googl">
                        <i className="fa fa-google-plus" />
                        <span>
                          <a title href="#">Find Us</a>
                          <i>on Google plus</i>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="detail-meta">
                  <h2>The Nike Air Zoom Pegasus 33 Print Big Kids' Running Shoe</h2>
                  <div className="post-time">
                    <div className="author-thumb">
                      <img src="images/resources/chatlist2.jpg" alt />
                      <span><a href="#" title>by daniel</a></span>
                    </div>
                    <span className="post-date">
                      <i className="fa fa-calendar" />
                      <a title href="#">12 July 2016</a>
                    </span>
                    <span className="coments">
                      <i className="fa fa-comments" />
                      <a title href="#">25</a>
                    </span>
                  </div>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years  Wick is forced back associate plotting. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.
                  </p>
                  <blockquote>
                    <p>
                      “  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolore magna aliqua. ”
                    </p>
                  </blockquote>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.
                  </p>
                  <figure className="alignright">
                    <img src="images/resources/blog-detail2.jpg" alt />
                  </figure>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipi slabore et dolore magna aliqua. Ut enim ad minim irure dolor in reprehenderit.
                  </p>
                  <ul>
                    <li>Integer at diam gravida fringilla Nibh preti purus</li>
                    <li>Mauris laoreet, nisl id faucibus pellentesque, mi mi</li>
                    <li>Vivamus accumsan nisl id massa finibus aliquet</li>
                    <li>justo accumsan nisi, non congue metus</li>
                    <li>velit id metus ullamcorper tristique</li>
                    <li>Nisi rutrum, eu ornare augue tristique.</li>
                  </ul>
                  <div className="tag-n-cat">
                    <div className="tags">
                      <span><i className="fa fa-tags" /> Post Tags:</span>
                      <a href="#" title>News</a>
                      <a href="#" title>ideas</a>
                      <a href="#" title>collection</a>
                      <a href="#" title>exclusive</a>
                      <a href="#" title>features</a>
                    </div>
                    <div className="tags">
                      <span><i className="fa fa-filter" /> Post Categories:</span>
                      <a href="#" title>News</a>
                      <a href="#" title>ideas</a>
                      <a href="#" title>collection</a>
                      <a href="#" title>exclusive</a>
                      <a href="#" title>features</a>
                    </div>
                  </div>
                  <div className="gap-60">
                    <div className="site-admin">
                      <div className="admin-avatar">
                        <img src="images/resources/admin4.jpg" alt />
                      </div>
                      <div className="admin-postmeta">
                        <h4>Sarah William</h4>
                        <span>Web Developer, Online Instructor</span>
                        <p>
                          I always loved computers and technology in general. In 2011 I was lucky enough to be invited.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="gap-60 no-top">
                    <div className="comment-area">
                      <h4 className="comment-title">{nbrcomments} comments</h4>
                    <ul className="comments">
                      {comments.map(comment =>( 
                        <Comment name={comment}></Comment>
                      
                       ))}
                        
              
                     </ul>
                    </div>
                  </div>{/* comments sec */}
                  <div className="gap-60 no-gap">
                    <h4 className="comment-title">Leave a Comment</h4>
                    <div className="contact-form">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">	
                          <input type="text" required="required"{...register('subject',{required:{value:true,message:"subject is required"}})} />
                          <label className="control-label"   htmlFor="input">Subject</label><i className="mtrl-select" />
                        </div>
                        <div className="form-group">	
                          <textarea rows={4} id="textarea"  {...register('message',{required:{value:true,message:"message is required"}})} required="required" defaultValue={""} />
                          <label className="control-label" htmlFor="textarea">Message</label><i className="mtrl-select" />
                        </div>
                        <div className="submit-btns">
                          <button className="mtr-btn signup" type="submit"><i>Submit</i></button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="gap no-gap bluesh high-opacity btm-mockup">
        <div className="content-bg-wrap" style={{background: 'url(images/resources/btm-banner.png)'}} />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="btm-baner">
                <div className="baner-mockup">
                  <img src="images/resources/btm-baner-avatar.png" alt />
                </div>
                <div className="baner-inf">
                  <span>wana more friends?</span>
                  <a href="#" title>Start Now</a>
                </div>
              </div>	
            </div>
          </div>
        </div>
      </div>
    </section>{/* footer top */}
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="widget">
              <div className="foot-logo">
                <div className="logo">
                  <a href="index-2.html" title><img src="images/logo.png" alt /></a>
                </div>	
                <p>
                  The trio took this simple idea and built it into the world’s leading carpooling platform.
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
              <div className="widget-title"><h4>follow</h4></div>
              <ul className="list-style">
                <li><i className="fa fa-facebook-square" /> <a href="https://web.facebook.com/shopcircut/" title>facebook</a></li>
                <li><i className="fa fa-twitter-square" /><a href="https://twitter.com/login?lang=en" title>twitter</a></li>
                <li><i className="fa fa-instagram" /><a href="https://www.instagram.com/?hl=en" title>instagram</a></li>
                <li><i className="fa fa-google-plus-square" /> <a href="https://plus.google.com/discover" title>Google+</a></li>
                <li><i className="fa fa-pinterest-square" /> <a href="https://www.pinterest.com/" title>Pintrest</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-4">
            <div className="widget">
              <div className="widget-title"><h4>Navigate</h4></div>
              <ul className="list-style">
                <li><a href="about.html" title>about us</a></li>
                <li><a href="contact.html" title>contact us</a></li>
                <li><a href="terms.html" title>terms &amp; Conditions</a></li>
                <li><a href="#" title>RSS syndication</a></li>
                <li><a href="sitemap.html" title>Sitemap</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-4">
            <div className="widget">
              <div className="widget-title"><h4>useful links</h4></div>
              <ul className="list-style">
                <li><a href="#" title>leasing</a></li>
                <li><a href="#" title>submit route</a></li>
                <li><a href="#" title>how does it work?</a></li>
                <li><a href="#" title>agent listings</a></li>
                <li><a href="#" title>view All</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-4">
            <div className="widget">
              <div className="widget-title"><h4>download apps</h4></div>
              <ul className="colla-apps">
                <li><a href="https://play.google.com/store?hl=en" title><i className="fa fa-android" />android</a></li>
                <li><a href="https://www.apple.com/lae/ios/app-store/" title><i className="ti-apple" />iPhone</a></li>
                <li><a href="https://www.microsoft.com/store/apps" title><i className="fa fa-windows" />Windows</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>{/* footer */}
    <div className="bottombar">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <span className="copyright"><a target="_blank" href="https://www.templateshub.net">Templates Hub</a></span>
            <i><img src="images/credit-cards.png" alt /></i>
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
        <label htmlFor="nightmode1" data-on-label="ON" data-off-label="OFF" />
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
        <label htmlFor="switch101" data-on-label="ON" data-off-label="OFF" />
      </div>
      <div className="setting-row">
        <span>Expose author name</span>
        <input type="checkbox" id="switch111" /> 
        <label htmlFor="switch111" data-on-label="ON" data-off-label="OFF" />
      </div>
    </form>
  </div>{/* side panel */}
</div>

        </div>
    );
}

export default BlogDetail;
