import { React, useState, useEffect, useRef } from "react";
import { format } from "timeago.js";
import moment from "moment";
import Swal from "sweetalert2";
import { FacebookShareButton, FacebookIcon } from "react-share";

import axios from "axios";
import "./post.css";
import Comment from "../comment/comment";
import CommentForm from "../comment/commentForm";

function Post({ post, socket, currentUser, friends }) {
  const [likes, setLikes] = useState(post?.Likes);
  const [dislike, setDislike] = useState(post?.Dislikes);
  const [comments, setComments] = useState();
  const [nbrcomments, setnbrcomments] = useState(post?.Nbr_comments);

  const hasLikedPost = likes.find((like) => like === currentUser._id);
  const hasDislikedPost = dislike.find(
    (dislike) => dislike === currentUser._id
  );

  const shareUrl = "https://www.youtube.com/watch?v=9WzIACv_mxs";
  const yourPost = currentUser._id === post.Creator._id;
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
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
      userId: currentUser._id,
    };
    const text = currentUser.name + " liked your post ";

    axios
      .put("http://localhost:2600/posts/" + post._id + "/like", user)
      .then((res) => {
        if (hasLikedPost) {
          setLikes(post.Likes.filter((id) => id !== currentUser._id));
        } else if (hasDislikedPost) {
          setDislike(post.Dislikes.filter((id) => id !== currentUser._id));
          setLikes([...post?.Likes, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you liked the post ",
          });
          const notification = {
            text: text,
            sender: currentUser._id,
            receiver: post.Creator._id,
          };

          if (
            notification.sender !== notification.receiver &&
            currentUser._id !== post.Creator._id
          ) {
            const notif = axios.post(
              "http://localhost:2600/notifications",
              notification
            );
            socket?.emit("sendNotification", {
              senderId: currentUser._id,
              receiverId: post.Creator._id,
              text: text,
            });
          }
        } else {
          setLikes([...post?.Likes, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you liked the post ",
          });

          const notification = {
            text: text,
            sender: currentUser._id,
            receiver: post.Creator._id,
          };

          if (
            notification.sender !== notification.receiver &&
            currentUser._id !== post.Creator._id
          ) {
            const notif = axios.post(
              "http://localhost:2600/notifications",
              notification
            );
            socket?.emit("sendNotification", {
              senderId: currentUser._id,
              receiverId: post.Creator._id,
              text: text,
            });
          }
        }
      });
  };

  const getComments = async () => {
    try {
      await axios
        .get("http://localhost:2600/comments/post/" + post._id)
        .then((res) => {
          setComments(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handledilike = async () => {
    const user = {
      userId: currentUser._id,
    };

    const text = currentUser.name + " disliked your post ";

    axios
      .put("http://localhost:2600/posts/" + post._id + "/dislike", user)
      .then((res) => {
        if (hasDislikedPost) {
          setDislike(post.Dislikes.filter((id) => id !== currentUser._id));
        } else if (hasLikedPost) {
          setLikes(post.Likes.filter((id) => id !== currentUser._id));

          setDislike([...post?.Dislikes, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you disliked the post ",
          });
          const notification = {
            text: text,
            sender: currentUser._id,
            receiver: post.Creator._id,
          };

          if (
            notification.sender !== notification.receiver &&
            currentUser._id !== post.Creator._id
          ) {
            const notif = axios.post(
              "http://localhost:2600/notifications",
              notification
            );
            socket.emit("sendNotification", {
              senderId: currentUser._id,
              receiverId: post.Creator._id,
              text: text,
            });
          }
        } else {
          setDislike([...post?.Dislikes, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you dislike the post ",
          });
          const notification = {
            text: text,
            sender: currentUser._id,
            receiver: post.Creator._id,
          };

          if (
            notification.sender !== notification.receiver &&
            currentUser._id !== post.Creator._id
          ) {
            const notif = axios.post(
              "http://localhost:2600/notifications",
              notification
            );
            socket.emit("sendNotification", {
              senderId: currentUser._id,
              receiverId: post.Creator._id,
              text: text,
            });
          }
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

  const handleComment = (body, type) => {
    const comment = {
      Body: body,
      Creator: currentUser._id,
    };
    axios
      .post(
        "http://localhost:2600/comments/post/" + post._id + "/comment",
        comment
      )
      .then((res) => {
        setComments([...comments, res.data]);
        setnbrcomments(nbrcomments + 1);

        const text = currentUser.name + " commented your post ";

        const notification = {
          text: text,
          sender: currentUser._id,
          receiver: post.Creator._id,
        };

        if (
          notification.sender !== notification.receiver &&
          currentUser._id !== post.Creator._id
        ) {
          const notif = axios.post(
            "http://localhost:2600/notifications",
            notification
          );
          socket.emit("sendNotification", {
            senderId: currentUser._id,
            receiverId: post.Creator._id,
            text: text,
          });
        }

        Toast.fire({
          icon: "success",
          title: "Your comment a post ",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeletePost = () => {
    Swal.fire({
      title: "Are you sure to delete your post ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("http://localhost:2600/posts/delete/" + post._id)
          .then((res) => {});

        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    getComments();
    setLikes(post.Likes);
    setDislike(post.Dislikes);
  }, []);

  return (
    <>
      <div className="central-meta post item">
        <div className="user-post">
          <div className="friend-info ">
            <figure>
              <img src="/images/resources/friend-avatar10.jpg" alt />
            </figure>
            <div className="friend-name">
              <ins>{post.Creator.name}</ins>
              <span>
                {"published: "}
                {moment(post.Date_creation).format("MMMM Do YYYY")}
                <br />

                {format(post.Date_creation)}
              </span>
              {yourPost && (
                <div className="dropdown d-flex flex-justify-content">
                  <a data-toggle="dropdown" style={{ color: "#088dcd" }}>
                    <i class="bi bi-three-dots-vertical"></i>
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item">
                      <i className="ti-pencil-alt" href="/" /> Edit
                    </a>
                    <a className="dropdown-item" href="/">
                      <i className="fa fa-trash" /> Delete
                    </a>
                  </div>
                </div>
              )}
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
                      onClick={handlelike}
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
                  <li>
                    <FacebookShareButton url={shareUrl}>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
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
                />
              ))}
              <CommentForm
                post={post}
                handleComment={handleComment}
                currentUser={currentUser}
                friends={friends}
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
