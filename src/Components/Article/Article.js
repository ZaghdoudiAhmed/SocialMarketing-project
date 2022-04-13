import React, { useEffect } from "react";
function Article(props) {
  useEffect(() => {
    return () => {};
  });
  return (
    <div className="post-content" data-aos="zoom-in" data-aos-delay={200}>
      <div className="post-image">
        <div>
          <img src={props.newarticle.urlToImage} className="img1" alt="blog1" />
        </div>
        <div className="post-info flex-row">
          <span>
            <i className="fas fa-user text-gray" />
            &nbsp;&nbsp;{props.newarticle.author}
          </span>
          <span>
            <i className="fas fa-calendar-alt text-gray" />
            &nbsp;&nbsp;{props.newarticle.publishedAt}
          </span>
        </div>
      </div>
      <div className="post-title">
        <a href="#">{props.newarticle.title}</a>
        <p>{props.newarticle.description}</p>
        <button className="btn post-btn">
          Read More &nbsp; <i className="fas fa-arrow-right" />
        </button>
      </div>
    </div>
  );
}
export default Article;
