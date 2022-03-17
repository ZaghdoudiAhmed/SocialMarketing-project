import { React, useState, useEffect, useRef } from "react";
import { format } from "timeago.js";
import moment from "moment";
import Swal from "sweetalert2";

import axios from "axios";
import "./post.css";

function Post({ post, socket, user }) {
  const [postid, setPostId] = useState("");
  const [likes, setLikes] = useState(post?.Likes);
  const [dislike, setDislike] = useState(post?.Dislikes);
  const [comments, setComments] = useState([]);
  const [nbrcomments, setnbrcomments] = useState(post?.Nbr_comments);
  const [bodycomment, setBodyComment] = useState("");

  const hasLikedPost = likes.find((like) => like === "reirfrj45656rgrjyg5656");
  const hasDislikedPost = dislike.find(
    (dislike) => dislike === "reirfrj45656rgrjyg5656"
  );

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handlelike = async () => {
    const user = {
      userId: "reirfrj45656rgrjyg5656",
    };

    axios
      .put("http://localhost:3000/posts/" + postid + "/like", user)
      .then((res) => {
        if (hasLikedPost) {
          setLikes(post.Likes.filter((id) => id !== "reirfrj45656rgrjyg5656"));
        } else if (hasDislikedPost) {
          setDislike(
            post.Dislikes.filter((id) => id !== "reirfrj45656rgrjyg5656")
          );
          setLikes([...post?.Likes, "reirfrj45656rgrjyg5656"]);
          Toast.fire({
            icon: "success",
            title: "you liked this post ",
          });
        } else {
          setLikes([...post?.Likes, "reirfrj45656rgrjyg5656"]);
          Toast.fire({
            icon: "success",
            title: "you liked this post ",
          });
        }
      });
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

    const user = {
      userId: "reirfrj45656rgrjyg5656",
    };
    axios
      .put("http://localhost:3000/posts/" + postid + "/dislike", user)
      .then((res) => {
        if (hasDislikedPost) {
          setDislike(
            post.Dislikes.filter((id) => id !== "reirfrj45656rgrjyg5656")
          );
        } else if (hasLikedPost) {
          setLikes(post.Likes.filter((id) => id !== "reirfrj45656rgrjyg5656"));

          setDislike([...post?.Dislikes, "reirfrj45656rgrjyg5656"]);
          Toast.fire({
            icon: "success",
            title: "you disliked this post ",
          });
        } else {
          setDislike([...post?.Dislikes, "reirfrj45656rgrjyg5656"]);
          Toast.fire({
            icon: "success",
            title: "you dislike this post ",
          });
        }
      });
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
        setBodyComment("");
        setComments([...comments, res.data]);
        setnbrcomments(nbrcomments + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNotification = (type) => {
    socket.emit("sendNotification", {
      senderId: user,
      receiverId: user,
      type,
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
                  {/* <li>
                    <span className="views" data-toggle="tooltip" title="views">
                      <i className="fa fa-eye" />
                      <ins>1.2k</ins>
                    </span>
                  </li> */}
                  <li>
                    <span
                      className="comment"
                      data-toggle="tooltip"
                      title="Comments"
                    >
                      <i className="fa fa-comments-o" />
                      <ins>{nbrcomments}</ins>
                    </span>
                  </li>
                  <li>
                    <span
                      className="dislike"
                      data-toggle="tooltip"
                      title="dislike"
                      onClick={handledilike}
                    >
                      {hasDislikedPost ? (
                        <i className="bi bi-hand-thumbs-down-fill"></i>
                      ) : (
                        <i className="bi bi-hand-thumbs-down"></i>
                      )}
                      <ins>{dislike.length}</ins>
                    </span>
                  </li>
                  <li>
                    <span
                      className="like"
                      data-toggle="tooltip"
                      title="like"
                      onClick={() => {
                        handlelike();
                        handleNotification(1);
                      }}
                    >
                      {hasLikedPost ? (
                        <i className="bi bi-hand-thumbs-up-fill"></i>
                      ) : (
                        <i className="bi bi-hand-thumbs-up" />
                      )}

                      <ins>{likes.length}</ins>
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
              {comments?.map((c, i) => (
                <li key={i} className="user-comment-box">
                  <div className="comet-avatar">
                    <img src="images/resources/comet-1.jpg" />
                  </div>
                  <div className="we-comment">
                    <div className="coment-head">
                      <h5>
                        <a href="time-line.html">Ahmed ZAGHDOUDI</a>
                      </h5>
                      <span>{format(c.Date_creation)}</span>
                      <a
                        className="we-reply"
                        style={{ color: "#088dcd" }}
                        title="Reply"
                      >
                        <i className="fa fa-reply" />
                      </a>
                    </div>
                    <p>{c.Body}</p>
                    {/* <div className="react-comments">
                      <span className="like">
                        <i className="bi bi-hand-thumbs-up"></i>
                        <ins>1</ins>
                      </span>
                      <span className="dislike">
                        <i className="bi bi-hand-thumbs-down" />
                        <ins>1</ins>
                      </span>
                    </div> */}
                  </div>
                  <ul>
                    {c?.comments?.map((p, j) => (
                      <li key={j}>
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
              {/* <li>
                <a title className="showmore underline">
                  more comments
                </a>
              </li> */}
              <li className="post-comment">
                <div className="comet-avatar">
                  <img src="images/resources/comet-1.jpg" alt />
                </div>
                <div className="post-comt-box">
                  <form method="post">
                    <div className="input-group mb-3">
                      <textarea
                        placeholder="Post your comment"
                        onChange={(e) => setBodyComment(e.target.value)}
                        value={bodycomment}
                      />
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        id="button-addon2"
                        onClick={handleComment}
                      >
                        Button
                      </button>
                    </div>
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
