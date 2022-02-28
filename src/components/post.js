import { React, useState, useEffect } from "react";
import { format } from "timeago.js";
import axios from "axios";

function Post({ post }) {
  const [postid, setPostId] = useState("");
  const [likes, setLikes] = useState(post.Likes);
  const [dislike, setDislike] = useState(post.Dislikes);

  const handlelike = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/posts/like/" + postid
      );
      //  console.log(res);
      setLikes(post.Likes + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handledilike = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/posts/dislike/" + postid
      );
      setDislike(post.Dislikes + 1);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setPostId(post._id);
    setLikes(post.Likes);
    setDislike(post.Dislikes);
  }, []);
  return (
    <div className="central-meta item">
      <div className="user-post">
        <div className="friend-info">
          <figure>
            <img src="images/resources/friend-avatar10.jpg" alt />
          </figure>
          <div className="friend-name">
            <ins>
              <a href="time-line.html" title>
                Test
              </a>
            </ins>
            <span>{format(post.Date_creation)}</span>
          </div>
          <div className="post-meta">
            <img
              src={"http://127.0.0.1:5500/server/uploads/" + post.Photo}
              alt
            />
            <div className="we-video-info">
              <ul>
                <li>
                  <span className="views" data-toggle="tooltip" title="views">
                    <i className="fa fa-eye" />
                    <ins>1.2k</ins>
                  </span>
                </li>
                <li>
                  <span
                    className="comment"
                    data-toggle="tooltip"
                    title="Comments"
                  >
                    <i className="fa fa-comments-o" />
                    <ins>{post.Nbr_comments}</ins>
                  </span>
                </li>
                <li>
                  <span
                    className="like"
                    data-toggle="tooltip"
                    title="like"
                    onClick={handlelike}
                  >
                    <i className="ti-thumb-up" />
                    <ins>{likes}</ins>
                  </span>
                </li>
                <li>
                  <span className="like" data-toggle="tooltip" title="like">
                    <i className="ti-heart" />
                    <ins>{post.Love}</ins>
                  </span>
                </li>
                <li>
                  <span
                    className="dislike"
                    data-toggle="tooltip"
                    title="dislike"
                    onClick={handledilike}
                  >
                    <i className="ti-heart-broken" />
                    <ins>{dislike}</ins>
                  </span>
                </li>
                <li className="social-media">
                  <div className="menu">
                    <div className="btn trigger">
                      <i className="fa fa-share-alt" />
                    </div>
                    <div className="rotater">
                      <div className="btn btn-icon">
                        <a href="#" title>
                          <i className="fa fa-html5" />
                        </a>
                      </div>
                    </div>
                    <div className="rotater">
                      <div className="btn btn-icon">
                        <a href="#" title>
                          <i className="fa fa-facebook" />
                        </a>
                      </div>
                    </div>
                    <div className="rotater">
                      <div className="btn btn-icon">
                        <a href="#" title>
                          <i className="fa fa-google-plus" />
                        </a>
                      </div>
                    </div>
                    <div className="rotater">
                      <div className="btn btn-icon">
                        <a href="#" title>
                          <i className="fa fa-twitter" />
                        </a>
                      </div>
                    </div>
                    <div className="rotater">
                      <div className="btn btn-icon">
                        <a href="#" title>
                          <i className="fa fa-css3" />
                        </a>
                      </div>
                    </div>
                    <div className="rotater">
                      <div className="btn btn-icon">
                        <a href="#" title>
                          <i className="fa fa-instagram" />
                        </a>
                      </div>
                    </div>
                    <div className="rotater">
                      <div className="btn btn-icon">
                        <a href="#" title>
                          <i className="fa fa-dribbble" />
                        </a>
                      </div>
                    </div>
                    <div className="rotater">
                      <div className="btn btn-icon">
                        <a href="#" title>
                          <i className="fa fa-pinterest" />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="description">
              <p>{post.Description}</p>
            </div>
          </div>
        </div>
        <div className="coment-area">
          <ul className="we-comet">
            <li>
              <div className="comet-avatar">
                <img src="images/resources/comet-1.jpg" alt />
              </div>
              <div className="we-comment">
                <div className="coment-head">
                  <h5>
                    <a href="time-line.html" title>
                      Jason borne
                    </a>
                  </h5>
                  <span>1 year ago</span>
                  <a className="we-reply" href="#" title="Reply">
                    <i className="fa fa-reply" />
                  </a>
                </div>
                <p>
                  we are working for the dance and sing songs. this car is very
                  awesome for the youngster. please vote this car and like our
                  post
                </p>
              </div>
              <ul>
                <li>
                  <div className="comet-avatar">
                    <img src="images/resources/comet-2.jpg" alt />
                  </div>
                  <div className="we-comment">
                    <div className="coment-head">
                      <h5>
                        <a href="time-line.html" title>
                          alexendra dadrio
                        </a>
                      </h5>
                      <span>1 month ago</span>
                      <a className="we-reply" href="#" title="Reply">
                        <i className="fa fa-reply" />
                      </a>
                    </div>
                    <p>
                      yes, really very awesome car i see the features of this
                      car in the official website of{" "}
                      <a href="#" title>
                        #Mercedes-Benz
                      </a>{" "}
                      and really impressed :-)
                    </p>
                  </div>
                </li>
                <li>
                  <div className="comet-avatar">
                    <img src="images/resources/comet-3.jpg" alt />
                  </div>
                  <div className="we-comment">
                    <div className="coment-head">
                      <h5>
                        <a href="time-line.html" title>
                          Olivia
                        </a>
                      </h5>
                      <span>16 days ago</span>
                      <a className="we-reply" href="#" title="Reply">
                        <i className="fa fa-reply" />
                      </a>
                    </div>
                    <p>
                      i like lexus cars, lexus cars are most beautiful with the
                      awesome features, but this car is really outstanding than
                      lexus
                    </p>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <div className="comet-avatar">
                <img src="images/resources/comet-1.jpg" alt />
              </div>
              <div className="we-comment">
                <div className="coment-head">
                  <h5>
                    <a href="time-line.html" title>
                      Donald Trump
                    </a>
                  </h5>
                  <span>1 week ago</span>
                  <a className="we-reply" href="#" title="Reply">
                    <i className="fa fa-reply" />
                  </a>
                </div>
                <p>
                  we are working for the dance and sing songs. this video is
                  very awesome for the youngster. please vote this video and
                  like our channel
                  <i className="em em-smiley" />
                </p>
              </div>
            </li>
            <li>
              <a href="#" title className="showmore underline">
                more comments
              </a>
            </li>
            <li className="post-comment">
              <div className="comet-avatar">
                <img src="images/resources/comet-1.jpg" alt />
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
  );
}

export default Post;
