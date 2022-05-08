import React, { useState, useEffect } from "react";
import ReplyIcon from '@mui/icons-material/Reply';
import "./comment.css";
import { format } from "timeago.js";
import moment from "moment";
import CommentForm from "./commentForm";
import axios from "axios";
import Swal from "sweetalert2";
import Fab from '@mui/material/Fab';
function Comment({ comment, replies, currentUser, socket }) {
  const canReply = Boolean(currentUser);
  const [activeComment, setActiveComment] = useState(null);
  const [replyBody, setReplyBody] = useState("");
  const [repliies, setReplies] = useState(replies);
  const [loves, setLoves] = useState(comment?.Loves);
  const [angrys, setAngrys] = useState(comment?.Angrys);

  const hasLovedComment = loves.find((love) => love === currentUser._id);
  const hasAngryComment = angrys.find((angry) => angry === currentUser._id);

  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 2600,
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
        "http://localhost:2600/comments/post/" +
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

  const handleLove = async () => {
    const user = {
      userId: currentUser._id,
    };
    const text = currentUser.name + " Loved your comment ";

    axios
      .put("http://localhost:2600/comments/" + comment._id + "/love", user)
      .then((res) => {
        if (hasLovedComment) {
          setLoves(comment.Loves.filter((id) => id !== currentUser._id));
        } else if (hasAngryComment) {
          setAngrys(comment.Angrys.filter((id) => id !== currentUser._id));
          setLoves([...comment?.Loves, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you loved the comment of " + comment.Creator.name,
          });
          const notification = {
            text: text,
            sender: currentUser._id,
            receiver: comment.Creator._id,
          };

          if (
            notification.sender !== notification.receiver &&
            currentUser._id !== comment.Creator._id
          ) {
            const notif = axios.post(
              "http://localhost:2600/notifications",
              notification
            );
            socket?.emit("sendNotification", {
              senderId: currentUser._id,
              receiverId: comment.Creator._id,
              text: text,
            });
          }
        } else {
          setLoves([...comment?.Loves, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you loved the comment ",
          });

          const notification = {
            text: text,
            sender: currentUser._id,
            receiver: comment.Creator._id,
          };

          if (
            notification.sender !== notification.receiver &&
            currentUser._id !== comment.Creator._id
          ) {
            const notif = axios.post(
              "http://localhost:2600/notifications",
              notification
            );
            socket?.emit("sendNotification", {
              senderId: currentUser._id,
              receiverId: comment.Creator._id,
              text: text,
            });
          }
        }
      });
  };

  const handleAngry = async () => {
    const user = {
      userId: currentUser._id,
    };

    const text = currentUser.name + " Angry your comment ";

    axios
      .put("http://localhost:2600/comments/" + comment._id + "/angry", user)
      .then((res) => {
        if (hasAngryComment) {
          setAngrys(comment.Angrys.filter((id) => id !== currentUser._id));
        } else if (hasLovedComment) {
          setLoves(comment.Loves.filter((id) => id !== currentUser._id));

          setAngrys([...comment?.Angrys, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you angry the comment of  " + comment.Creator.name,
          });
          const notification = {
            text: text,
            sender: currentUser._id,
            receiver: comment.Creator._id,
          };

          if (
            notification.sender !== notification.receiver &&
            currentUser._id !== comment.Creator._id
          ) {
            const notif = axios.post(
              "http://localhost:2600/notifications",
              notification
            );
            socket.emit("sendNotification", {
              senderId: currentUser._id,
              receiverId: comment.Creator._id,
              text: text,
            });
          }
        } else {
          setAngrys([...comment?.Angrys, currentUser._id]);
          Toast.fire({
            icon: "success",
            title: "you angry the comment ",
          });
          const notification = {
            text: text,
            sender: currentUser._id,
            receiver: comment.Creator._id,
          };

          if (
            notification.sender !== notification.receiver &&
            currentUser._id !== comment.Creator._id
          ) {
            const notif = axios.post(
              "http://localhost:2600/notifications",
              notification
            );
            socket.emit("sendNotification", {
              senderId: currentUser._id,
              receiverId: comment.Creator._id,
              text: text,
            });
          }
        }
      });
  };

  useEffect(() => {
    setLoves(comment.Loves);
    setAngrys(comment.Angrys);
  }, []);

  return (
    <li key={comment._id} className="user-comment-box">
      <div className="comet-avatar">
        <img
          width="45"
          height="45"
          src={"/uploads/users/" + comment.Creator.profilepic}
        />
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
              <i className="fa fa-reply" style={{cursor: "pointer"}}/>
            </a>
          )}
        </div>
        <p>{comment.Body}</p>
        <div className="d-flex justify-content-end">
          <li className="angry">
            <span onClick={handleAngry} data-toggle="tooltip">
              {hasAngryComment ? (
                <i class="bi bi-emoji-angry-fill"></i>
              ) : (
                <i class="bi bi-emoji-angry"></i>
              )}
              <sup>{angrys.length}</sup>
            </span>
          </li>
          <li className="love">
            <span onClick={handleLove} data-toggle="tooltip">
              {hasLovedComment ? (
                <i class="bi bi-heart-fill"></i>
              ) : (
                <i class="bi bi-heart"></i>
              )}
              <sup>{loves.length}</sup>
            </span>
          </li>
        </div>
      </div>

      <ul>
        {isReplying && (
          <li>
            <div className="comet-avatar">
              <img
                width="45"
                height="45"
                src={"/uploads/users/" + currentUser.profilepic}
              />
            </div>
            <div className="we-comment">
              <div className="coment-head">
                <h5>
                  <a href="/">{currentUser.name}</a>
                </h5>
              </div>
              <div className="newpst-input" style={{display: 'flex'}}>
                <p>
                  <textarea
                    row={2}
                    onChange={(e) => setReplyBody(e.target.value)}
                    value={replyBody}
                  />
                </p>
                  <ReplyIcon   className="prof" onClick={handleReply}   style={{ color: "#088dcd",cursor : "pointer" }}></ReplyIcon>

              </div>
            </div>
          </li>
        )}
        {repliies?.map((p) => (
          <li key={p._id}>
            <div className="comet-avatar">
              <img
                width="45"
                height="45"
                src={"/uploads/users/" + p.Creator.profilepic}
              />
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
                    {hasAngryComment ? (
                      <i class="bi bi-emoji-angry-fill"></i>
                    ) : (
                      <i class="bi bi-emoji-angry"></i>
                    )}
                    <sup>{p.Angrys.length}</sup>
                  </span>
                </li>
                <li className="love">
                  <span>
                    {hasLovedComment ? (
                      <i class="bi bi-heart-fill"></i>
                    ) : (
                      <i class="bi bi-heart"></i>
                    )}
                    <sup>{p.Loves.length}</sup>
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
