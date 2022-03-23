import { useState, React } from "react";

import axios from "axios";

function CommentForm({ post, handleComment }) {
  const [bodycomment, setBodyComment] = useState("");

  const onClick = (e) => {
    e.preventDefault();
    handleComment(bodycomment);
    setBodyComment("");
  };
  return (
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
              onClick={onClick}
            >
              Button
            </button>
          </div>
        </form>
      </div>
    </li>
  );
}

export default CommentForm;
