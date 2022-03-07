import { React, useState, useEffect } from "react";
import { format } from "timeago.js";
import moment from "moment";
import Swal from "sweetalert2";

import axios from "axios";
import "./post.css";

function Post({ post }) {
  const [postid, setPostId] = useState("");
  const [likes, setLikes] = useState(post.Likes);
  const [dislike, setDislike] = useState(post.Dislikes);
  const [comments, setComments] = useState([]);
  const [bodycomment, setBodyComment] = useState("");

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

  const getComments = async () => {
    try {
      await axios
        .get("http://localhost:3000/comments/post/" + post._id)
        .then((res) => {
          setComments(res.data);
        });
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

  const handleComment = async (e) => {
    e.preventDefault();
    const comment = {
      Body: bodycomment,
    };
    axios
      .post(
        "http://localhost:3000/comments/post/" + post._id + "/comment",
        comment
      )
      .then((res) => {
        Swal.fire(
          "Good job!",
          "Your comment is added successfully!",
          "success"
        );
        setBodyComment("");

        //   setComments([...comments, res.data]);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getComments();
    setPostId(post._id);

    setLikes(post.Likes);
    setDislike(post.Dislikes);
  }, []);
  return (
    <>
      <div className="central-meta item">
        <div className="user-post">
          <div className="friend-info">
            <figure>
              <img src="images/resources/friend-avatar10.jpg" alt />
            </figure>
            <div className="friend-name">
              <ins>
                <a href="time-line.html" title>
                  Ahmed ZAGHDOUDI
                </a>
              </ins>
              <span>
                {"published: "}
                {moment(post.Date_creation).format("MMMM Do YYYY")}
                <br />

                {format(post.Date_creation)}
              </span>
            </div>
            <div className="post-meta">
              <img src={"http://127.0.0.1:5500/server/uploads/" + post.Photo} />
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
            <ul className="we-comet comment-box">
              {comments.map((c) => (
                <li key={c} className="user-comment-box">
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
                      <span>{format(c.Date_creation)}</span>
                      <a className="we-reply" href="#" title="Reply">
                        <i className="fa fa-reply" />
                      </a>
                    </div>
                    <p>{c.Body}</p>
                  </div>
                  <ul>
                    {c.comments.map((p) => (
                      <li key={p}>
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
                            <span>{format(p.Date_creation)}</span>
                            <a className="we-reply" href="#" title="Reply">
                              <i className="fa fa-reply" />
                            </a>
                          </div>
                          <p>{p.Body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li>
                <a title className="showmore underline">
                  more comments
                </a>
              </li>
              <li className="post-comment">
                <div className="comet-avatar">
                  <img src="images/resources/comet-1.jpg" alt />
                </div>
                <div className="post-comt-box">
                  <form method="post">
                    <textarea
                      placeholder="Post your comment"
                      defaultValue={""}
                      onChange={(e) => setBodyComment(e.target.value)}
                      value={bodycomment}
                    />
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
                    <button onClick={handleComment} type="submit" />
                  </form>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
