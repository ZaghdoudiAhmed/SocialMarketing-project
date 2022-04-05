import React, { useState } from "react";

import "./comment.css";
import { format } from "timeago.js";
import moment from "moment";
import CommentForm from "./commentForm";
import axios from "axios";
import Swal from "sweetalert2";

function Comment({ comment, replies, currentUser }) {
  const canReply = Boolean(currentUser);
  const [activeComment, setActiveComment] = useState(null);
  const [replyBody, setReplyBody] = useState("");
  const [repliies, setReplies] = useState(replies);
  const [likes, setLikes] = useState();
  const [dislike, setDislike] = useState();

  const hasLikedPost = true;
  const hasDislikedPost = true;
  // const hasLikedPost = likes.find((like) => like === currentUser._id);
  // const hasDislikedPost = dislike.find(
  //   (dislike) => dislike === currentUser._id
  // );

  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleReply = () => {
    const reply = {
      Body: replyBody,
      Creator: currentUser._id,
    };
    axios
      .post(
        "http://localhost:3000/comments/post/" +
          "6239d2e5b8d77b6ff995894d" +
          "/comment/" +
          comment._id,
        reply
      )
      .then((res) => {
        setReplyBody("");
        setReplies([...repliies, res.data]);
        Toast.fire({
          icon: "success",
          title: "You  replied to " + comment.Creator.name + " comment",
        });
        setActiveComment(null);
      });
  };

  return (
    <li key={comment._id} className="user-comment-box">
      <div className="comet-avatar">
        <img src="images/resources/comet-1.jpg" />
      </div>
      <div className="we-comment">
        <div className="coment-head ">
          <h5>
            <a href="time-line.html">{comment.Creator.name}</a>
          </h5>
          <span>{format(comment.Date_creation)}</span>
          {canReply && (
            <a
              className="we-reply"
              style={{ color: "#088dcd" }}
              onClick={() =>
                setActiveComment({ id: comment._id, type: "replying" })
              }
              title="Reply"
            >
              <i className="fa fa-reply" />
            </a>
          )}
        </div>
        <p>{comment.Body}</p>
        <div className="d-flex justify-content-end">
          <li className="angry">
            <span>
              {hasDislikedPost ? (
                <i class="bi bi-emoji-angry-fill"></i>
              ) : (
                <i class="bi bi-emoji-angry"></i>
              )}
              <sup>100</sup>
            </span>
          </li>
          <li className="love">
            <span>
              {hasLikedPost ? (
                <i class="bi bi-heart-fill"></i>
              ) : (
                <i class="bi bi-heart"></i>
              )}
              <sup>100</sup>
            </span>
          </li>
        </div>
      </div>

      <ul>
        {isReplying && (
          <li>
            <div className="comet-avatar">
              <img src="images/resources/comet-1.jpg" />
            </div>
            <div className="we-comment">
              <div className="coment-head">
                <h5>
                  <a href="time-line.html">{currentUser.name}</a>
                </h5>
              </div>
              <div className="newpst-input">
                <p>
                  <textarea
                    row={2}
                    onChange={(e) => setReplyBody(e.target.value)}
                    value={replyBody}
                  />
                </p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ color: "#088dcd" }}
                  style={{ text_decoration: "none" }}
                  onClick={handleReply}
                >
                  reply
                </button>
              </div>
              <i className="del fa fa-close" />
            </div>
          </li>
        )}
        {repliies?.map((p) => (
          <li key={p._id}>
            <div className="comet-avatar">
              <img src="images/resources/comet-1.jpg" />
            </div>
            <div className="we-comment">
              <div className="coment-head">
                <h5>
                  <a href="time-line.html">{p.Creator.name}</a>
                </h5>
                <span>{format(p.Date_creation)}</span>
              </div>
              <p>{p.Body}</p>
              <div className="d-flex justify-content-end">
                <li className="angry">
                  <span>
                    {hasDislikedPost ? (
                      <i class="bi bi-emoji-angry-fill"></i>
                    ) : (
                      <i class="bi bi-emoji-angry"></i>
                    )}
                    <sup>100</sup>
                  </span>
                </li>
                <li className="love">
                  <span>
                    {hasLikedPost ? (
                      <i class="bi bi-heart-fill"></i>
                    ) : (
                      <i class="bi bi-heart"></i>
                    )}
                    <sup>100</sup>
                  </span>
                </li>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Comment;
