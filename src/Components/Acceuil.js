import React from 'react';
import { Outlet, Link ,route,Routes,useLocation } from "react-router-dom";

function Acceuil(props) {

    return (  
      <div>
              
        <div>
     
        <div className="theme-layout">
          <div className="responsive-header">
            <div className="mh-head first Sticky">
        
              <span className="mh-btns-left">
                <a className="true"href="#menu"><i className="fa fa-align-justify" /></a>
              </span>
              <span className="mh-text">
                <a href="newsfeed.html" title="true"><img src="images/logo2.png" alt="true" /></a>
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
                    <li><a href="index-2.html" title="true">Home Social</a></li>
                    <li><a href="index2.html" title="true">Home Social 2</a></li>
                    <li><a href="index-company.html" title="true">Home Company</a></li>
                    <li><a href="landing.html" title="true">Login page</a></li>
                    <li><a href="logout.html" title="true">Logout Page</a></li>
                    <li><a href="newsfeed.html" title="true">news feed</a></li>
                  </ul>
                </li>
                <li><span>Time Line</span>
                  <ul>
                    <li><a href="time-line.html" title="true">timeline</a></li>
                    <li><a href="timeline-friends.html" title="true">timeline friends</a></li>
                    <li><a href="timeline-groups.html" title="true">timeline groups</a></li>
                    <li><a href="timeline-pages.html" title="true">timeline pages</a></li>
                    <li><a href="timeline-photos.html" title="true">timeline photos</a></li>
                    <li><a href="timeline-videos.html" title="true">timeline videos</a></li>
                    <li><a href="fav-page.html" title="true">favourit page</a></li>
                    <li><a href="groups.html" title="true">groups page</a></li>
                    <li><a href="page-likers.html" title="true">Likes page</a></li>
                    <li><a href="people-nearby.html" title="true">people nearby</a></li>
                  </ul>
                </li>
                <li><span>Account Setting</span>
                  <ul>
                    <li><a href="create-fav-page.html" title="true">create fav page</a></li>
                    <li><a href="edit-account-setting.html" title="true">edit account setting</a></li>
                    <li><a href="edit-interest.html" title="true">edit-interest</a></li>
                    <li><a href="edit-password.html" title="true">edit-password</a></li>
                    <li><a href="edit-profile-basic.html" title="true">edit profile basics</a></li>
                    <li><a href="edit-work-eductation.html" title="true">edit work educations</a></li>
                    <li><a href="messages.html" title="true">message box</a></li>
                    <li><a href="inbox.html" title="true">Inbox</a></li>
                    <li><a href="notifications.html" title="true">notifications page</a></li>
                  </ul>
                </li>
                <li><span>forum</span>
                  <ul>
                    <li><a href="forum.html" title="true">Forum Page</a></li>
                    <li><a href="forums-category.html" title="true">Fourm Category</a></li>
                    <li><a href="forum-open-topic.html" title="true">Forum Open Topic</a></li>
                    <li><a href="forum-create-topic.html" title="true">Forum Create Topic</a></li>
                  </ul>
                </li>
                <li><span>Our Shop</span>
                  <ul>
                    <li><a href="shop.html" title="true">Shop Products</a></li>
                    <li><a href="shop-masonry.html" title="true">Shop Masonry Products</a></li>
                    <li><a href="shop-single.html" title="true">Shop Detail Page</a></li>
                    <li><a href="shop-cart.html" title="true">Shop Product Cart</a></li>
                    <li><a href="shop-checkout.html" title="true">Product Checkout</a></li>
                  </ul>
                </li>
                <li><span>Our Blog</span>
                  <ul>
                    <li><a href="blog-grid-wo-sidebar.html" title="true">Our Blog</a></li>
                    <li><a href="blog-grid-right-sidebar.html" title="true">Blog with R-Sidebar</a></li>
                    <li><a href="blog-grid-left-sidebar.html" title="true">Blog with L-Sidebar</a></li>
                    <li><a href="blog-masonry.html" title="true">Blog Masonry Style</a></li>
                    <li><a href="blog-list-wo-sidebar.html" title="true">Blog List Style</a></li>
                    <li><a href="blog-list-right-sidebar.html" title="true">Blog List with R-Sidebar</a></li>
                    <li><a href="blog-list-left-sidebar.html" title="true">Blog List with L-Sidebar</a></li>
                    <li><a href="blog-detail.html" title="true">Blog Post Detail</a></li>
                  </ul>
                </li>
                <li><span>Portfolio</span>
                  <ul>
                    <li><a href="portfolio-2colm.html" title="true">Portfolio 2col</a></li>
                    <li><a href="portfolio-3colm.html" title="true">Portfolio 3col</a></li>
                    <li><a href="portfolio-4colm.html" title="true">Portfolio 4col</a></li>
                  </ul>
                </li>
                <li><span>Support &amp; Help</span>
                  <ul>
                    <li><a href="support-and-help.html" title="true">Support &amp; Help</a></li>
                    <li><a href="support-and-help-detail.html" title="true">Support &amp; Help Detail</a></li>
                    <li><a href="support-and-help-search-result.html" title="true">Support &amp; Help Search Result</a></li>
                  </ul>
                </li>
                <li><span>More pages</span>
                  <ul>
                    <li><a href="careers.html" title="true">Careers</a></li>
                    <li><a href="career-detail.html" title="true">Career Detail</a></li>
                    <li><a href="404.html" title="true">404 error page</a></li>
                    <li><a href="404-2.html" title="true">404 Style2</a></li>
                    <li><a href="faq.html" title="true">faq's page</a></li>
                    <li><a href="insights.html" title="true">insights</a></li>
                    <li><a href="knowledge-base.html" title="true">knowledge base</a></li>
                  </ul>
                </li>
                <li><a href="about.html" title="true">about</a></li>
                <li><a href="about-company.html" title="true">About Us2</a></li>
                <li><a href="contact.html" title="true">contact</a></li>
                <li><a href="contact-branches.html" title="true">Contact Us2</a></li>
                <li><a href="widgets.html" title="true">Widgts</a></li>
              </ul>
            </nav>
            <nav id="shoppingbag">
              <div>
                <div className="true">
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
          <div className="topbar stick">
            <div className="logo">
              <a title="true"href="newsfeed.html"><img src="images/logo.png" alt="true" /></a>
            </div>
            <div className="top-area">
              <div className="top-search">
                <form method="post" className="true">
                  <input type="text" placeholder="Search Friend" />
                  <button data-ripple><i className="ti-search" /></button>
                </form>
              </div>
              <ul className="setting-area">
                <li><a href="newsfeed.html" title="Home" data-ripple><i className="ti-home" /></a></li>
                <li>
                  <a href="#" title="Notification" data-ripple>
                    <i className="ti-bell" /><span>20</span>
                  </a>
                  <div className="dropdowns">
                    <span>4 New Notifications</span>
                    <ul className="drops-menu">
                      <li>
                        <a href="notifications.html" title="true">
                          <img src="images/resources/thumb-1.jpg" alt="true" />
                          <div className="mesg-meta">
                            <h6>sarah Loren</h6>
                            <span>Hi, how r u dear ...?</span>
                            <i>2 min ago</i>
                          </div>
                        </a>
                        <span className="tag green">New</span>
                      </li>
                      <li>
                        <a href="notifications.html" title="true">
                          <img src="images/resources/thumb-2.jpg" alt="true" />
                          <div className="mesg-meta">
                            <h6>Jhon doe</h6>
                            <span>Hi, how r u dear ...?</span>
                            <i>2 min ago</i>
                          </div>
                        </a>
                        <span className="tag red">Reply</span>
                      </li>
                      <li>
                        <a href="notifications.html" title="true">
                          <img src="images/resources/thumb-3.jpg" alt="true" />
                          <div className="mesg-meta">
                            <h6>Andrew</h6>
                            <span>Hi, how r u dear ...?</span>
                            <i>2 min ago</i>
                          </div>
                        </a>
                        <span className="tag blue">Unseen</span>
                      </li>
                      <li>
                        <a href="notifications.html" title="true">
                          <img src="images/resources/thumb-4.jpg" alt="true" />
                          <div className="mesg-meta">
                            <h6>Tom cruse</h6>
                            <span>Hi, how r u dear ...?</span>
                            <i>2 min ago</i>
                          </div>
                        </a>
                        <span className="tag">New</span>
                      </li>
                      <li>
                        <a href="notifications.html" title="true">
                          <img src="images/resources/thumb-5.jpg" alt="true" />
                          <div className="mesg-meta">
                            <h6>Amy</h6>
                            <span>Hi, how r u dear ...?</span>
                            <i>2 min ago</i>
                          </div>
                        </a>
                        <span className="tag">New</span>
                      </li>
                    </ul>
                    <a href="notifications.html" title="true"className="more-mesg">view more</a>
                  </div>
                </li>
                <li>
                  <a href="#" title="Messages" data-ripple><i className="ti-comment" /><span>12</span></a>
                  <div className="dropdowns">
                    <span>5 New Messages</span>
                    <ul className="drops-menu">
                      <li>
                        <a href="notifications.html" title="true">
                          <img src="images/resources/thumb-1.jpg" alt="true" />
                          <div className="mesg-meta">
                            <h6>sarah Loren</h6>
                            <span>Hi, how r u dear ...?</span>
                            <i>2 min ago</i>
                          </div>
                        </a>
                        <span className="tag green">New</span>
                      </li>
                      <li>
                        <a href="notifications.html" title="true">
                          <img src="images/resources/thumb-2.jpg" alt="true" />
                          <div className="mesg-meta">
                            <h6>Jhon doe</h6>
                            <span>Hi, how r u dear ...?</span>
                            <i>2 min ago</i>
                          </div>
                        </a>
                        <span className="tag red">Reply</span>
                      </li>
                      <li>
                        <a href="notifications.html" title="true">
                          <img src="images/resources/thumb-3.jpg" alt="true" />
                          <div className="mesg-meta">
                            <h6>Andrew</h6>
                            <span>Hi, how r u dear ...?</span>
                            <i>2 min ago</i>
                          </div>
                        </a>
                        <span className="tag blue">Unseen</span>
                      </li>
                      <li>
                        <a href="notifications.html" title="true">
                          <img src="images/resources/thumb-4.jpg" alt="true" />
                          <div className="mesg-meta">
                            <h6>Tom cruse</h6>
                            <span>Hi, how r u dear ...?</span>
                            <i>2 min ago</i>
                          </div>
                        </a>
                        <span className="tag">New</span>
                      </li>
                      <li>
                        <a href="notifications.html" title="true">
                          <img src="images/resources/thumb-5.jpg" alt="true" />
                          <div className="mesg-meta">
                            <h6>Amy</h6>
                            <span>Hi, how r u dear ...?</span>
                            <i>2 min ago</i>
                          </div>
                        </a>
                        <span className="tag">New</span>
                      </li>
                    </ul>
                    <a href="messages.html" title="true"className="more-mesg">view more</a>
                  </div>
                </li>
              
                <li><a href="#" title="Languages" data-ripple><i className="fa fa-globe" /></a>
                  <div className="dropdowns languages">
                    <a href="#" title="true"><i className="ti-check" />English</a>
                    <a href="#" title="true">Arabic</a>
                    <a href="#" title="true">Dutch</a>
                    <a href="#" title="true">French</a>
                  </div>
                </li>
              </ul> 
                 <Link to="/Profil" title="true">view profile</Link> 
              <div className="user-img">
          
                <img src="images/resources/admin.jpg" alt="true" />
                <span className="status f-online" />
                <div className="user-setting " >

                  <a href="#" title="true"><span className="status f-online" />online</a>
                  <a href="www.google.com" title="true"><span className="status f-away" />away</a>
                  <a href="#" title="true"><span className="status f-off" />offline</a>
                  <Link to="/Profil" title="true">view profile</Link> 
                  <a href="#" title="true"><i className="ti-pencil-alt=" />edit profile</a>
                  <a href="#" title="true"><i className="ti-target" />activity log</a>
                  <a href="#" title="true"><i className="ti-settings" />account setting</a>
                  <a href="#" title="true"><i className="ti-power-off" />log out</a>
                </div>
              </div>
              <span className="ti-menu main-menu" data-ripple />
            </div>
          </div>
          <div className="fixed-sidebar right">
            <div className="chat-friendz">
              <ul className="chat-users">
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend1.jpg" alt="" />
                    <span className="status f-online" />
                  </div>
                </li>
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend2.jpg" alt="" />
                    <span className="status f-away" />
                  </div>
                </li>
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend3.jpg" alt="" />
                    <span className="status f-online" />
                  </div>
                </li>
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend4.jpg" alt="" />
                    <span className="status f-offline" />
                  </div>
                </li>
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend5.jpg" alt="" />
                    <span className="status f-online" />
                  </div>
                </li>
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend6.jpg" alt="" />
                    <span className="status f-online" />
                  </div>
                </li>
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend7.jpg" alt="" />
                    <span className="status f-offline" />
                  </div>
                </li>
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend8.jpg" alt="" />
                    <span className="status f-online" />
                  </div>
                </li>
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend9.jpg" alt="" />
                    <span className="status f-away" />
                  </div>
                </li>
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend10.jpg" alt="" />
                    <span className="status f-away" />
                  </div>
                </li>
                <li>
                  <div className="author-thmb">
                    <img src="images/resources/side-friend8.jpg" alt="" />
                    <span className="status f-online" />
                  </div>
                </li>
              </ul>
              <div className="chat-box">
                <div className="chat-head">
                  <span className="status f-online" />
                  <h6>Bucky Barnes</h6>
                  <div className="more">
                    <span className="more-optns"><i className="ti-more-alt" />
                      <ul>
                        <li>block chat</li>
                        <li>unblock chat</li>
                        <li>conversation</li>
                      </ul>
                    </span>
                    <span className="close-mesage"><i className="ti-close" /></span>
                  </div>
                </div>
                <div className="chat-list">
                  <ul>
                    <li className="me">
                      <div className="chat-thumb"><img src="images/resources/chatlist1.jpg" alt="true" /></div>
                      <div className="notification-event">
                        <span className="chat-message-item">
                          Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                        </span>
                        <span className="notification-date"><time dateTime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                      </div>
                    </li>
                    <li className="you">
                      <div className="chat-thumb"><img src="images/resources/chatlist2.jpg" alt="true" /></div>
                      <div className="notification-event">
                        <span className="chat-message-item">
                          Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                        </span>
                        <span className="notification-date"><time dateTime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                      </div>
                    </li>
                    <li className="me">
                      <div className="chat-thumb"><img src="images/resources/chatlist1.jpg" alt="true" /></div>
                      <div className="notification-event">
                        <span className="chat-message-item">
                          Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                        </span>
                        <span className="notification-date"><time dateTime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                      </div>
                    </li>
                  </ul>
                  <form className="text-box">
                    <textarea placeholder="Post enter to post..." defaultValue={""} />
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
          </div>{/* right sidebar user chat */}
          <div className="fixed-sidebar left">
            <div className="menu-left">
              <ul className="left-menu">
                <li><a href="newsfeed.html" title="Newsfeed Page" data-toggle="tooltip" data-placement="right"><i className="ti-magnet" /></a></li>
                <li><a href="fav-page.html" title="favourit page" data-toggle="tooltip" data-placement="right"><i className="fa fa-star-o" /></a></li>
                <li><a href="insights.html" title="Account Stats" data-toggle="tooltip" data-placement="right"><i className="ti-stats-up" /></a></li>
                <li><a href="inbox.html" title="inbox" data-toggle="tooltip" data-placement="right"><i className="ti-import" /></a></li>
                <li><a href="messages.html" title="Messages" data-toggle="tooltip" data-placement="right"><i className="ti-comment-alt" /></a></li>
                <li><a href="edit-account-setting.html" title="Setting" data-toggle="tooltip" data-placement="right"><i className="ti-panel" /></a></li>
                <li><a href="faq.html" title="Faq's" data-toggle="tooltip" data-placement="right"><i className="ti-light-bulb" /></a></li>
                <li><a href="timeline-friends.html" title="Friends" data-toggle="tooltip" data-placement="right"><i className="ti-themify-favicon" /></a></li>
                <li><a href="widgets.html" title="Widgets" data-toggle="tooltip" data-placement="right"><i className="ti-eraser" /></a></li>
                <li><a href="notifications.html" title="Notification" data-toggle="tooltip" data-placement="right"><i className="ti-bookmark-alt=" /></a></li>
              </ul>
            </div>
          </div>{/* left sidebar menu */}
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
                                <a href="newsfeed.html" title="true">News feed</a>
                              </li>
                              <li>
                                <i className="ti-mouse-alt=" />
                                <a href="inbox.html" title="true">Inbox</a>
                              </li>
                              <li>
                                <i className="ti-files" />
                                <a href="fav-page.html" title="true">My pages</a>
                              </li>
                              <li>
                                <i className="ti-user" />
                                <a href="timeline-friends.html" title="true">friends</a>
                              </li>
                              <li>
                                <i className="ti-image" />
                                <a href="timeline-photos.html" title="true">images</a>
                              </li>
                              <li>
                                <i className="ti-video-camera" />
                                <a href="timeline-videos.html" title="true">videos</a>
                              </li>
                              <li>
                                <i className="ti-comments-smiley" />
                                <a href="messages.html" title="true">Messages</a>
                              </li>
                              <li>
                                <i className="ti-bell" />
                                <a href="notifications.html" title="true">Notifications</a>
                              </li>
                              <li>
                                <i className="ti-share" />
                                <a href="people-nearby.html" title="true">People Nearby</a>
                              </li>
                              <li>
                                <i className="fa fa-bar-chart-o" />
                                <a href="insights.html" title="true">insights</a>
                              </li>
                              <li>
                                <i className="ti-power-off" />
                                <a href="landing.html" title="true">Logout</a>
                              </li>
                            </ul>
                          </div>{/* Shortcuts */}
                          <div className="widget">
                            <h4 className="widget-title">Recent Activity</h4>
                            <ul className="activitiez">
                              <li>
                                <div className="activity-meta">
                                  <i>10 hours Ago</i>
                                  <span><a href="#" title="true">Commented on Video posted </a></span>
                                  <h6>by <a href="time-line.html">black demon.</a></h6>
                                </div>
                              </li>
                              <li>
                                <div className="activity-meta">
                                  <i>30 Days Ago</i>
                                  <span><a href="#" title="true">Posted your status. “Hello guys, how are you?”</a></span>
                                </div>
                              </li>
                              <li>
                                <div className="activity-meta">
                                  <i>2 Years Ago</i>
                                  <span><a href="#" title="true">Share a video on her timeline.</a></span>
                                  <h6>"<a href="#">you are so funny mr.been.</a>"</h6>
                                </div>
                              </li>
                            </ul>
                          </div>{/* recent activites */}
                          <div className="widget stick-widget">
                            <h4 className="widget-title">Who's follownig</h4>
                            <ul className="followers">
                              <li>
                                <figure><img src="images/resources/friend-avatar2.jpg" alt="true" /></figure>
                                <div className="friend-meta">
                                  <h4><a href="time-line.html" title="true">Kelly Bill</a></h4>
                                  <a href="#" title="true"className="underline">Add Friend</a>
                                </div>
                              </li>
                              <li>
                                <figure><img src="images/resources/friend-avatar4.jpg" alt="true" /></figure>
                                <div className="friend-meta">
                                  <h4><a href="time-line.html" title="true">Issabel</a></h4>
                                  <a href="#" title="true"className="underline">Add Friend</a>
                                </div>
                              </li>
                              <li>
                                <figure><img src="images/resources/friend-avatar6.jpg" alt="true" /></figure>
                                <div className="friend-meta">
                                  <h4><a href="time-line.html" title="true">Andrew</a></h4>
                                  <a href="#" title="true"className="underline">Add Friend</a>
                                </div>
                              </li>
                              <li>
                                <figure><img src="images/resources/friend-avatar8.jpg" alt="true" /></figure>
                                <div className="friend-meta">
                                  <h4><a href="time-line.html" title="true">Sophia</a></h4>
                                  <a href="#" title="true"className="underline">Add Friend</a>
                                </div>
                              </li>
                              <li>
                                <figure><img src="images/resources/friend-avatar3.jpg" alt="true" /></figure>
                                <div className="friend-meta">
                                  <h4><a href="time-line.html" title="true">Allen</a></h4>
                                  <a href="#" title="true"className="underline">Add Friend</a>
                                </div>
                              </li>
                            </ul>
                          </div>{/* who's following */}
                        </aside>
                      </div>{/* sidebar */}
                      <div className="col-lg-6">
                        <div className="central-meta">
                          <div className="new-postbox">
                            <figure>
                              <img src="images/resources/admin2.jpg" alt="true" />
                            </figure>
                            <div className="newpst-input">
                              <form method="post">
                                <textarea rows={2} placeholder="write something" defaultValue={""} />
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
                                        <input type="file" />
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
                                      <button type="submit">Post</button>
                                    </li>
                                  </ul>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>{/* add post new box */}
                        <div className="loadMore">
                          <div className="central-meta item">
                            <div className="user-post">
                              <div className="friend-info">
                                <figure>
                                  <img src="images/resources/friend-avatar10.jpg" alt="true" />
                                </figure>
                                <div className="friend-name">
                                  <ins><a href="time-line.html" title="true">Janice Griffith</a></ins>
                                  <span>published: june,2 2018 19:PM</span>
                                </div>
                                <div className="post-meta">
                                  <img src="images/resources/user-post.jpg" alt="true" />
                                  <div className="we-video-info">
                                    <ul>
                                      <li>
                                        <span className="views" data-toggle="tooltip" title="views">
                                          <i className="fa fa-eye" />
                                          <ins>1.2k</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="comment" data-toggle="tooltip" title="Comments">
                                          <i className="fa fa-comments-o" />
                                          <ins>52</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="like" data-toggle="tooltip" title="like">
                                          <i className="ti-heart" />
                                          <ins>2.2k</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="dislike" data-toggle="tooltip" title="dislike">
                                          <i className="ti-heart-broken" />
                                          <ins>200</ins>
                                        </span>
                                      </li>
                                      <li className="social-media">
                                        <div className="menu">
                                          <div className="btn trigger"><i className="fa fa-share-alt=" /></div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-html5" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-facebook" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-google-plus" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-twitter" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-css3" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-instagram" /></a>
                                            </div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-dribbble" /></a>
                                            </div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-pinterest" /></a>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="description">
                                    <p>
                                      World's most beautiful car in Curabitur <a href="#" title="true">#test drive booking !</a> the most beatuiful car available in america and the saudia arabia, you can book your test drive by our official website
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="coment-area">
                                <ul className="we-comet">
                                  <li>
                                    <div className="comet-avatar">
                                      <img src="images/resources/comet-1.jpg" alt="true" />
                                    </div>
                                    <div className="we-comment">
                                      <div className="coment-head">
                                        <h5><a href="time-line.html" title="true">Jason borne</a></h5>
                                        <span>1 year ago</span>
                                        <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply" /></a>
                                      </div>
                                      <p>we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post</p>
                                    </div>
                                    <ul>
                                      <li>
                                        <div className="comet-avatar">
                                          <img src="images/resources/comet-2.jpg" alt="true" />
                                        </div>
                                        <div className="we-comment">
                                          <div className="coment-head">
                                            <h5><a href="time-line.html" title="true">alexendra dadrio</a></h5>
                                            <span>1 month ago</span>
                                            <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply" /></a>
                                          </div>
                                          <p>yes, really very awesome car i see the features of this car in the official website of <a href="#" title="true">#Mercedes-Benz</a> and really impressed :-)</p>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="comet-avatar">
                                          <img src="images/resources/comet-3.jpg" alt="true" />
                                        </div>
                                        <div className="we-comment">
                                          <div className="coment-head">
                                            <h5><a href="time-line.html" title="true">Olivia</a></h5>
                                            <span>16 days ago</span>
                                            <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply" /></a>
                                          </div>
                                          <p>i like lexus cars, lexus cars are most beautiful with the awesome features, but this car is really outstanding than lexus</p>
                                        </div>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <div className="comet-avatar">
                                      <img src="images/resources/comet-1.jpg" alt="true" />
                                    </div>
                                    <div className="we-comment">
                                      <div className="coment-head">
                                        <h5><a href="time-line.html" title="true">Donald Trump</a></h5>
                                        <span>1 week ago</span>
                                        <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply" /></a>
                                      </div>
                                      <p>we are working for the dance and sing songs. this video is very awesome for the youngster. please vote this video and like our channel
                                        <i className="em em-smiley" />
                                      </p>
                                    </div>
                                  </li>
                                  <li>
                                    <a href="#" title="true"className="showmore underline">more comments</a>
                                  </li>
                                  <li className="post-comment">
                                    <div className="comet-avatar">
                                      <img src="images/resources/comet-1.jpg" alt="true" />
                                    </div>
                                    <div className="post-comt-box">
                                      <form method="post">
                                        <textarea placeholder="Post your comment" defaultValue={""} />
                                        <div className="add-smiles">
                                          <span className="em em-expressionless" title="add icon" />
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
                                  <img src="images/resources/nearly1.jpg" alt="true" />
                                </figure>
                                <div className="friend-name">
                                  <ins><a href="time-line.html" title="true">Sara Grey</a></ins>
                                  <span>published: june,2 2018 19:PM</span>
                                </div>
                                <div className="post-meta">
                                  <iframe width="true" height={315} src="https://www.youtube.com/embed/5JJ_jqqpTMY" allow="autoplay;" allowFullScreen />
                                  <div className="we-video-info">
                                    <ul>
                                      <li>
                                        <span className="views" data-toggle="tooltip" title="views">
                                          <i className="fa fa-eye" />
                                          <ins>1.2k</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="comment" data-toggle="tooltip" title="Comments">
                                          <i className="fa fa-comments-o" />
                                          <ins>52</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="like" data-toggle="tooltip" title="like">
                                          <i className="ti-heart" />
                                          <ins>2.2k</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="dislike" data-toggle="tooltip" title="dislike">
                                          <i className="ti-heart-broken" />
                                          <ins>200</ins>
                                        </span>
                                      </li>
                                      <li className="social-media">
                                        <div className="menu">
                                          <div className="btn trigger"><i className="fa fa-share-alt=" /></div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-html5" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-facebook" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-google-plus" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-twitter" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-css3" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-instagram" /></a>
                                            </div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-dribbble" /></a>
                                            </div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-pinterest" /></a>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="description">
                                    <p>
                                      Lonely Cat Enjoying in Summer Curabitur <a href="#" title="true">#mypage</a> ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="coment-area">
                                <ul className="we-comet">
                                  <li>
                                    <div className="comet-avatar">
                                      <img src="images/resources/comet-1.jpg" alt="true" />
                                    </div>
                                    <div className="we-comment">
                                      <div className="coment-head">
                                        <h5><a href="time-line.html" title="true">Jason borne</a></h5>
                                        <span>1 year ago</span>
                                        <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply" /></a>
                                      </div>
                                      <p>we are working for the dance and sing songs. this video is very awesome for the youngster. please vote this video and like our channel</p>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="comet-avatar">
                                      <img src="images/resources/comet-2.jpg" alt="true" />
                                    </div>
                                    <div className="we-comment">
                                      <div className="coment-head">
                                        <h5><a href="time-line.html" title="true">Sophia</a></h5>
                                        <span>1 week ago</span>
                                        <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply" /></a>
                                      </div>
                                      <p>we are working for the dance and sing songs. this video is very awesome for the youngster.
                                        <i className="em em-smiley" />
                                      </p>
                                    </div>
                                  </li>
                                  <li>
                                    <a href="#" title="true"className="showmore underline">more comments</a>
                                  </li>
                                  <li className="post-comment">
                                    <div className="comet-avatar">
                                      <img src="images/resources/comet-2.jpg" alt="true" />
                                    </div>
                                    <div className="post-comt-box">
                                      <form method="post">
                                        <textarea placeholder="Post your comment" defaultValue={""} />
                                        <div className="add-smiles">
                                          <span className="em em-expressionless" title="add icon" />
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
                                  <img src="images/resources/nearly6.jpg" alt="true" />
                                </figure>
                                <div className="friend-name">
                                  <ins><a href="time-line.html" title="true">Sophia</a></ins>
                                  <span>published: january,5 2018 19:PM</span>
                                </div>
                                <div className="post-meta">
                                  <div className="post-map">
                                    <div className="nearby-map">
                                      <div id="map-canvas" />
                                    </div>
                                  </div>{/* near by map */}
                                  <div className="we-video-info">
                                    <ul>
                                      <li>
                                        <span className="views" data-toggle="tooltip" title="views">
                                          <i className="fa fa-eye" />
                                          <ins>1.2k</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="comment" data-toggle="tooltip" title="Comments">
                                          <i className="fa fa-comments-o" />
                                          <ins>52</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="like" data-toggle="tooltip" title="like">
                                          <i className="ti-heart" />
                                          <ins>2.2k</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="dislike" data-toggle="tooltip" title="dislike">
                                          <i className="ti-heart-broken" />
                                          <ins>200</ins>
                                        </span>
                                      </li>
                                      <li className="social-media">
                                        <div className="menu">
                                          <div className="btn trigger"><i className="fa fa-share-alt=" /></div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-html5" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-facebook" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-google-plus" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-twitter" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-css3" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-instagram" /></a>
                                            </div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-dribbble" /></a>
                                            </div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-pinterest" /></a>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="description">
                                    <p>
                                      Curabitur Lonely Cat Enjoying in Summer <a href="#" title="true">#mypage</a> ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="coment-area">
                                <ul className="we-comet">
                                  <li>
                                    <div className="comet-avatar">
                                      <img src="images/resources/comet-1.jpg" alt="true" />
                                    </div>
                                    <div className="we-comment">
                                      <div className="coment-head">
                                        <h5><a href="time-line.html" title="true">Jason borne</a></h5>
                                        <span>1 year ago</span>
                                        <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply" /></a>
                                      </div>
                                      <p>we are working for the dance and sing songs. this video is very awesome for the youngster. please vote this video and like our channel</p>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="comet-avatar">
                                      <img src="images/resources/comet-2.jpg" alt="true" />
                                    </div>
                                    <div className="we-comment">
                                      <div className="coment-head">
                                        <h5><a href="time-line.html" title="true">Sophia</a></h5>
                                        <span>1 week ago</span>
                                        <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply" /></a>
                                      </div>
                                      <p>we are working for the dance and sing songs. this video is very awesome for the youngster.
                                        <i className="em em-smiley" />
                                      </p>
                                    </div>
                                  </li>
                                  <li>
                                    <a href="#" title="true"className="showmore underline">more comments</a>
                                  </li>
                                  <li className="post-comment">
                                    <div className="comet-avatar">
                                      <img src="images/resources/comet-2.jpg" alt="true" />
                                    </div>
                                    <div className="post-comt-box">
                                      <form method="post">
                                        <textarea placeholder="Post your comment" defaultValue={""} />
                                        <div className="add-smiles">
                                          <span className="em em-expressionless" title="add icon" />
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
                                  <img alt="true" src="images/resources/friend-avatar10.jpg" />
                                </figure>
                                <div className="friend-name">
                                  <ins><a title="true"href="time-line.html">Janice Griffith</a></ins>
                                  <span>published: june,2 2018 19:PM</span>
                                </div>
                                <div className="description">
                                  <p>
                                    Curabitur World's most beautiful car in <a title="true"href="#">#test drive booking !</a> the most beatuiful car available in america and the saudia arabia, you can book your test drive by our official website
                                  </p>
                                </div>
                                <div className="post-meta">
                                  <div className="linked-image align-left">
                                    <a title="true"href="#"><img alt="true" src="images/resources/page1.jpg" /></a>
                                  </div>
                                  <div className="detail">
                                    <span>Love Maid - ChillGroves</span>
                                    <p>Lorem ipsum dolor sit amet, consectetur ipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua... </p>
                                    <a title="true"href="#">www.sample.com</a>
                                  </div>		
                                  <div className="we-video-info">
                                    <ul>
                                      <li>
                                        <span className="views" data-toggle="tooltip" title="views">
                                          <i className="fa fa-eye" />
                                          <ins>1.2k</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="comment" data-toggle="tooltip" title="Comments">
                                          <i className="fa fa-comments-o" />
                                          <ins>52</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="like" data-toggle="tooltip" title="like">
                                          <i className="ti-heart" />
                                          <ins>2.2k</ins>
                                        </span>
                                      </li>
                                      <li>
                                        <span className="dislike" data-toggle="tooltip" title="dislike">
                                          <i className="ti-heart-broken" />
                                          <ins>200</ins>
                                        </span>
                                      </li>
                                      <li className="social-media">
                                        <div className="menu">
                                          <div className="btn trigger"><i className="fa fa-share-alt=" /></div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-html5" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-facebook" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-google-plus" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-twitter" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-css3" /></a></div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-instagram" /></a>
                                            </div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-dribbble" /></a>
                                            </div>
                                          </div>
                                          <div className="rotater">
                                            <div className="btn btn-icon"><a href="#" title="true"><i className="fa fa-pinterest" /></a>
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
                      </div>{/* centerl meta */}
                      <div className="col-lg-3">
                        <aside className="sidebar static right">
                          <div className="widget">
                            <h4 className="widget-title">Your page</h4>	
                            <div className="your-page">
                              <figure>
                                <a href="#" title="true"><img src="images/resources/friend-avatar9.jpg" alt="true" /></a>
                              </figure>
                              <div className="page-meta">
                                <a href="#" title="true"className="underline">My page</a>
                                <span><i className="ti-comment" /><a href="insight.html" title="true">Messages <em>9</em></a></span>
                                <span><i className="ti-bell" /><a href="insight.html" title="true">Notifications <em>2</em></a></span>
                              </div>
                              <div className="page-likes">
                                <ul className="nav nav-tabs likes-btn">
                                  <li className="nav-item"><a className="active" href="#link1" data-toggle="tab">likes</a></li>
                                  <li className="nav-item"><a className="true"href="#link2" data-toggle="tab">views</a></li>
                                </ul>
                                {/* Tab panes */}
                                <div className="tab-content">
                                  <div className="tab-pane active fade show " id="link1">
                                    <span><i className="ti-heart" />884</span>
                                    <a href="#" title="weekly-likes">35 new likes this week</a>
                                    <div className="users-thumb-list">
                                      <a href="#" title="Anderw" data-toggle="tooltip">
                                        <img src="images/resources/userlist-1.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="frank" data-toggle="tooltip">
                                        <img src="images/resources/userlist-2.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="Sara" data-toggle="tooltip">
                                        <img src="images/resources/userlist-3.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="Amy" data-toggle="tooltip">
                                        <img src="images/resources/userlist-4.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="Ema" data-toggle="tooltip">
                                        <img src="images/resources/userlist-5.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="Sophie" data-toggle="tooltip">
                                        <img src="images/resources/userlist-6.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="Maria" data-toggle="tooltip">
                                        <img src="images/resources/userlist-7.jpg" alt="true" />  
                                      </a>  
                                    </div>
                                  </div>
                                  <div className="tab-pane fade" id="link2">
                                    <span><i className="ti-eye" />440</span>
                                    <a href="#" title="weekly-likes">440 new views this week</a>
                                    <div className="users-thumb-list">
                                      <a href="#" title="Anderw" data-toggle="tooltip">
                                        <img src="images/resources/userlist-1.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="frank" data-toggle="tooltip">
                                        <img src="images/resources/userlist-2.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="Sara" data-toggle="tooltip">
                                        <img src="images/resources/userlist-3.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="Amy" data-toggle="tooltip">
                                        <img src="images/resources/userlist-4.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="Ema" data-toggle="tooltip">
                                        <img src="images/resources/userlist-5.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="Sophie" data-toggle="tooltip">
                                        <img src="images/resources/userlist-6.jpg" alt="true" />  
                                      </a>
                                      <a href="#" title="Maria" data-toggle="tooltip">
                                        <img src="images/resources/userlist-7.jpg" alt="true" />  
                                      </a>  
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>{/* page like widget */}
                          <div className="widget">
                            <div className="banner medium-opacity bluesh">
                              <div className="bg-image" style={{backgroundImage: 'url(images/resources/baner-widgetbg.jpg)'}} />
                              <div className="baner-top">
                                <span><img alt="true" src="images/book-icon.png" /></span>
                                <i className="fa fa-ellipsis-h" />
                              </div>
                              <div className="banermeta">
                                <p>
                                  create your own favourit page.
                                </p>
                                <span>like them all</span>
                                <a data-ripple title="true"href="#">start now!</a>
                              </div>
                            </div>											
                          </div>
                          <div className="widget stick-widget">
                            <h4 className="widget-title">Profile intro</h4>
                            <ul className="short-profile">
                              <li>
                                <span>about</span>
                                <p>Hi, i am jhon kates, i am 32 years old and worked as a web developer in microsoft </p>
                              </li>
                              <li>
                                <span>fav tv show</span>
                                <p>Sacred Games, Spartcus Blood, Games of Theron </p>
                              </li>
                              <li>
                                <span>favourit music</span>
                                <p>Justin Biber, Shakira, Nati Natasah</p>
                              </li>
                            </ul>
                          </div>
                        </aside>
                      </div>{/* sidebar */}
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
                  <span className="copyright"><a target="_blank" href="https://www.templateshub.net">Templates Hub</a></span>
                  <i><img src="images/credit-cards.png" alt="true" /></i>
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
        <Outlet/>	
         


      </div>
      <script data-cfasync="false" src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script src="js/main.min.js"></script>
	<script src="js/script.js"></script>
	<script src="js/map-init.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8c55_YHLvDHGACkQscgbGLtLRdxBDCfI"></script>
    </div>
    );
}

export default Acceuil;