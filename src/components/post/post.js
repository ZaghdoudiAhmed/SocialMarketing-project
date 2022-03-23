import { React, useState, useEffect, useRef } from "react";
import { format } from "timeago.js";
import moment from "moment";
import Swal from "sweetalert2";

import axios from "axios";
import "./post.css";
import Comment from "../comment/comment";
import CommentForm from "../comment/commentForm";

function Post({ post, socket, currentUser }) {
  const [likes, setLikes] = useState(post?.Likes);
  const [dislike, setDislike] = useState(post?.Dislikes);
  const [comments, setComments] = useState();
  const [nbrcomments, setnbrcomments] = useState(post?.Nbr_comments);
  const [activeComment, setActiveComment] = useState(null);

  const hasLikedPost = likes.find((like) => like === currentUser._id);
  const hasDislikedPost = dislike.find(
    (dislike) => dislike === currentUser._id
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

  const handlelike = async (e) => {
    e.preventDefault();

    const user = {
      userId: currentUser._id,
    };
    axios
      .put("http://localhost:3000/posts/" + post._id + "/like", user)
      .then((res) => {
        if (hasLikedPost) {
          setLikes(post.Likes.filter((id) => id !== currentUser._id));
        } else if (hasDislikedPost) {
          setDislike(post.Dislikes.filter((id) => id !== currentUser._id));
          setLikes([...post?.Likes, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you liked this post ",
          });
        } else {
          setLikes([...post?.Likes, currentUser._id]);
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
      userId: currentUser._id,
    };

    axios
      .put("http://localhost:3000/posts/" + post._id + "/dislike", user)
      .then((res) => {
        if (hasDislikedPost) {
          setDislike(post.Dislikes.filter((id) => id !== currentUser._id));
        } else if (hasLikedPost) {
          setLikes(post.Likes.filter((id) => id !== currentUser._id));

          setDislike([...post?.Dislikes, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you disliked this post ",
          });
        } else {
          setDislike([...post?.Dislikes, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you dislike this post ",
          });
        }
      });
  };

  const handleNotification = (type) => {
    socket.emit("sendNotification", {
      senderId: currentUser._id,
      receiverId: post.Creator._id,
      senderName: currentUser.name,
      type,
    });
  };

  const handleComment = (body) => {
    const comment = {
      Body: body,
    };
    axios
      .post(
        "http://localhost:3000/comments/post/" + post._id + "/comment",
        comment
      )
      .then((res) => {
        setComments([...comments, res]);
        setnbrcomments(nbrcomments + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getComments();
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
              <ins>{post.Creator.name}</ins>
              <span>
                {"published: "}
                {moment(post.Date_creation).format("MMMM Do YYYY")}
                <br />

                {format(post.Date_creation)}
              </span>
            </div>
            <div className="post-meta">
              <div className="description">
                <p>{post.Description}</p>
              </div>
              <img src={"http://127.0.0.1:5500/server/uploads/" + post.Photo} />
              <div className="we-video-info">
                <ul>
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
                        <i className="bi bi-hand-thumbs-down-fill" />
                      ) : (
                        <i className="bi bi-hand-thumbs-down" />
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
            </div>
          </div>
          <div className="coment-area">
            <ul className="we-comet comment-box">
              {comments?.map((c) => (
                <Comment
                  key={c._id}
                  comment={c}
                  replies={c.comments}
                  currentUser={currentUser}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                />
              ))}
              <CommentForm post={post} handleComment={handleComment} />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
