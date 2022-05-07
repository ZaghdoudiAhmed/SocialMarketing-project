import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import Article from "./Article";
import wordsToNumbers from "words-to-numbers";
import Header from "../EcommerceComponent/Header"
function Articles(props) {
  const [newArticles, setnewArticle] = useState([]);
  useEffect(() => {
    alanBtn({
      key: "63c1bd3705e137b759cdff76327d501d2e956eca572e1d8b807a3e2338fdd0dc/testing",
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setnewArticle(articles);
        }
        if (command == "open") {
          setnewArticle(articles);
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          console.log(articles[parsedNumber - 1]);
        }
      },
    });
  }, []);
  return (
    
    <div>
      <Header></Header>
      <div>
        <div className="theme-layout">
          <div className="responsive-header">
            <div className="mh-head first Sticky">
              <span className="mh-btns-left">
                <a href="#menu">
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
          <main>
            <section className="site-title pi">
              <div
                className="site-background"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <h3>Artciles &amp; Brands</h3>
                <h1>Amazing Articles around the world</h1>
                <button className="btn">Explore</button>
              </div>
            </section>
            <section className="container">
              <div className="site-content">
                <div className="posts">
                  {newArticles.length > 0 ? (
                    newArticles.map((article, index) => {
                      return (
                        <Article key={index} newarticle={article}>
                          {" "}
                          <hr />
                        </Article>
                      );
                    })
                  ) : (
                    <div>
                      Speak with alan to get the latest articles around the
                      world
                    </div>
                  )}
                </div>
                <aside className="sidebar">
                  <div className="category">
                    <h2>Category</h2>
                    <ul className="category-list">
                      <li
                        className="list-items"
                        data-aos="fade-left"
                        data-aos-delay={100}
                      >
                        <a href="#">Software</a>
                        <span>(05)</span>
                      </li>
                      <li
                        className="list-items"
                        data-aos="fade-left"
                        data-aos-delay={200}
                      >
                        <a href="#">Techonlogy</a>
                        <span>(02)</span>
                      </li>
                      <li
                        className="list-items"
                        data-aos="fade-left"
                        data-aos-delay={300}
                      >
                        <a href="#">Lifestyle</a>
                        <span>(07)</span>
                      </li>
                      <li
                        className="list-items"
                        data-aos="fade-left"
                        data-aos-delay={400}
                      >
                        <a href="#">Shopping</a>
                        <span>(01)</span>
                      </li>
                      <li
                        className="list-items"
                        data-aos="fade-left"
                        data-aos-delay={500}
                      >
                        <a href="#">Food</a>
                        <span>(08)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="popular-post">
                    <h2>Popular Post</h2>
                    <div
                      className="post-content"
                      data-aos="flip-up"
                      data-aos-delay={200}
                    >
                      <div className="post-image">
                        <div>
                          <img
                            src="assets/popular-post/m-blog-1.jpg"
                            className="img2"
                            alt="blog1"
                          />
                        </div>
                        <div className="post-info flex-row">
                          <span>
                            <i className="fas fa-calendar-alt text-gray" />
                            &nbsp;&nbsp;January 14, 2019
                          </span>
                          <span>2 Commets</span>
                        </div>
                      </div>
                      <div className="post-title">
                        <a href="#">
                          New data recording system to better analyse road
                          accidents
                        </a>
                      </div>
                    </div>
                    <div
                      className="post-content"
                      data-aos="flip-up"
                      data-aos-delay={300}
                    >
                      <div className="post-image">
                        <div>
                          <img
                            src="assets/popular-post/m-blog-2.jpg"
                            className="img2"
                            alt="blog1"
                          />
                        </div>
                        <div className="post-info flex-row">
                          <span>
                            <i className="fas fa-calendar-alt text-gray" />
                            &nbsp;&nbsp;January 14, 2019
                          </span>
                          <span>2 Commets</span>
                        </div>
                      </div>
                      <div className="post-title">
                        <a href="#">
                          New data recording system to better analyse road
                          accidents
                        </a>
                      </div>
                    </div>
                    <div
                      className="post-content"
                      data-aos="flip-up"
                      data-aos-delay={400}
                    >
                      <div className="post-image">
                        <div>
                          <img
                            src="assets/popular-post/m-blog-3.jpg"
                            className="img2"
                            alt="blog1"
                          />
                        </div>
                        <div className="post-info flex-row">
                          <span>
                            <i className="fas fa-calendar-alt text-gray" />
                            &nbsp;&nbsp;January 14, 2019
                          </span>
                          <span>2 Commets</span>
                        </div>
                      </div>
                      <div className="post-title">
                        <a href="#">
                          New data recording system to better analyse road
                          accidents
                        </a>
                      </div>
                    </div>
                    <div
                      className="post-content"
                      data-aos="flip-up"
                      data-aos-delay={500}
                    >
                      <div className="post-image">
                        <div>
                          <img
                            src="assets/popular-post/m-blog-4.jpg"
                            className="img2"
                            alt="blog1"
                          />
                        </div>
                        <div className="post-info flex-row">
                          <span>
                            <i className="fas fa-calendar-alt text-gray" />
                            &nbsp;&nbsp;January 14, 2019
                          </span>
                          <span>2 Commets</span>
                        </div>
                      </div>
                      <div className="post-title">
                        <a href="#">
                          New data recording system to better analyse road
                          accidents
                        </a>
                      </div>
                    </div>
                    <div
                      className="post-content"
                      data-aos="flip-up"
                      data-aos-delay={600}
                    >
                      <div className="post-image">
                        <div>
                          <img
                            src="assets/popular-post/m-blog-5.jpg"
                            className="img2"
                            alt="blog1"
                          />
                        </div>
                        <div className="post-info flex-row">
                          <span>
                            <i className="fas fa-calendar-alt text-gray" />
                            &nbsp;&nbsp;January 14, 2019
                          </span>
                          <span>2 Commets</span>
                        </div>
                      </div>
                      <div className="post-title">
                        <a href="#">
                          New data recording system to better analyse road
                          accidents
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className="newsletter"
                    data-aos="fade-up"
                    data-aos-delay={300}
                  >
                    <h2>Newsletter</h2>
                    <div className="form-element">
                      <input
                        type="text"
                        className="input-element"
                        placeholder="Email"
                      />
                      <button className="btn form-btn">Subscribe</button>
                    </div>
                  </div>
                  <div className="popular-tags">
                    <h2>Popular Tags</h2>
                    <div className="tags flex-row">
                      <span
                        className="tag"
                        data-aos="flip-up"
                        data-aos-delay={100}
                      >
                        Software
                      </span>
                      <span
                        className="tag"
                        data-aos="flip-up"
                        data-aos-delay={200}
                      >
                        technology
                      </span>
                      <span
                        className="tag"
                        data-aos="flip-up"
                        data-aos-delay={300}
                      >
                        travel
                      </span>
                      <span
                        className="tag"
                        data-aos="flip-up"
                        data-aos-delay={400}
                      >
                        illustration
                      </span>
                      <span
                        className="tag"
                        data-aos="flip-up"
                        data-aos-delay={500}
                      >
                        design
                      </span>
                      <span
                        className="tag"
                        data-aos="flip-up"
                        data-aos-delay={600}
                      >
                        lifestyle
                      </span>
                      <span
                        className="tag"
                        data-aos="flip-up"
                        data-aos-delay={700}
                      >
                        love
                      </span>
                      <span
                        className="tag"
                        data-aos="flip-up"
                        data-aos-delay={800}
                      >
                        project
                      </span>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
            {/* -----------x---------- Site Content -------------x----------*/}
          </main>
          <section>
            <div className="gap100 pattern">
              <div className="bg-image">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="news-letter">
                        <h2>
                          Newsletter <span>Signup</span>
                        </h2>
                        <span>
                          Shortest Way To Explore What Will Happen On Enternity
                        </span>
                        <form method="post">
                          <input
                            type="text"
                            placeholder="Please Type Email Id"
                            className="emails"
                          />
                          <button>Subscribe Now</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* news letter */}
          <section>
            <div className="gap100 no-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-heading">
                      <h2>Our Team</h2>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="our-teambox">
                      <figure>
                        <img src="images/resources/team1.jpg" alt="true" />
                      </figure>
                      <div className="team-info">
                        <h4>Sara Grey</h4>
                        <span>Designer</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="our-teambox">
                      <figure>
                        <img src="images/resources/team2.jpg" alt="true" />
                      </figure>
                      <div className="team-info">
                        <h4>Peeter Paker</h4>
                        <span>Developer</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="our-teambox">
                      <figure>
                        <img src="images/resources/team3.jpg" alt="true" />
                      </figure>
                      <div className="team-info">
                        <h4>Amy watson</h4>
                        <span>Support</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="our-teambox">
                      <figure>
                        <img src="images/resources/team4.jpg" alt="true" />
                      </figure>
                      <div className="team-info">
                        <h4>jaison born</h4>
                        <span>Operations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* our team */}
          <section>
            <div className="getquot-baner">
              <span>
                Get our weekly Quotaion for Porviding the best Services
              </span>
              <a title="true" href="#">
                Get a Quote
              </a>
            </div>
          </section>
          {/* get a quote */}
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
                        <a
                          href="https://twitter.com/login?lang=en"
                          title="true"
                        >
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
      </div>
      <section>
        <div className="blog">
          <div className="container">
            <div className="owl-carousel owl-theme blog-post">
              <div
                className="blog-content"
                data-aos="fade-right"
                data-aos-delay={200}
              >
                <img src="assets/Blog-post/post-1.jpg" alt="post-1" />
                <div className="blog-title">
                  <h3>London Fashion week's continued the evolution</h3>
                  <button className="btn btn-blog">Fashion</button>
                  <span>2 minutes</span>
                </div>
              </div>
              <div
                className="blog-content"
                data-aos="fade-in"
                data-aos-delay={200}
              >
                <img src="assets/Blog-post/post-3.jpg" alt="post-1" />
                <div className="blog-title">
                  <h3>London Fashion week's continued the evolution</h3>
                  <button className="btn btn-blog">Fashion</button>
                  <span>2 minutes</span>
                </div>
              </div>
              <div
                className="blog-content"
                data-aos="fade-left"
                data-aos-delay={200}
              >
                <img src="assets/Blog-post/post-2.jpg" alt="post-1" />
                <div className="blog-title">
                  <h3>London Fashion week's continued the evolution</h3>
                  <button className="btn btn-blog">Fashion</button>
                  <span>2 minutes</span>
                </div>
              </div>
              <div
                className="blog-content"
                data-aos="fade-right"
                data-aos-delay={200}
              >
                <img src="assets/Blog-post/post-5.png" alt="post-1" />
                <div className="blog-title">
                  <h3>London Fashion week's continued the evolution</h3>
                  <button className="btn btn-blog">Fashion</button>
                  <span>2 minutes</span>
                </div>
              </div>
            </div>
            <div className="owl-navigation">
              <span className="owl-nav-prev">
                <i className="fas fa-long-arrow-alt-left" />
              </span>
              <span className="owl-nav-next">
                <i className="fas fa-long-arrow-alt-right" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Articles;
