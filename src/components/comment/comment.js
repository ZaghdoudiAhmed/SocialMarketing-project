import React from "react";

import { format } from "timeago.js";
import moment from "moment";
import CommentForm from "./commentForm";

function Comment({
  comment,
  replies,
  currentUser,
  activeComment,
  setActiveComment,
}) {
  const canReply = Boolean(currentUser);
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";

  return (
    <li key={comment._id} className="user-comment-box">
      <div className="comet-avatar">
        <img src="images/resources/comet-1.jpg" />
      </div>
      <div className="we-comment">
        <div className="coment-head">
          <h5>
            <a href="time-line.html">Ahmed ZAGHDOUDI</a>
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
      </div>

      {isReplying && <h2>test</h2>}
      {replies?.length > 0 && (
        <ul>
          {replies?.map((p) => (
            <li key={p._id}>
              <div className="comet-avatar">
                <img src="images/resources/comet-1.jpg" />
              </div>
              <div className="we-comment">
                <div className="coment-head">
                  <h5>
                    <a href="time-line.html">Ahmed ZAGHDOUDI</a>
                  </h5>
                  <span>{format(p.Date_creation)}</span>
                  {canReply && (
                    <a
                      className="we-reply"
                      style={{ color: "#088dcd" }}
                      title="Reply"
                    >
                      <i className="fa fa-reply" />
                    </a>
                  )}
                </div>
                <p>{p.Body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
