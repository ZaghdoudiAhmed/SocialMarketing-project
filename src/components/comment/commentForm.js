import { useState, React } from "react";

import axios from "axios";
import AddCommentIcon from '@mui/icons-material/AddComment';
function CommentForm({ post, handleComment, currentUser, friends }) {
  const [bodycomment, setBodyComment] = useState("");
  const renderSuggestions = (entry) => {
    return <span>{entry.name}</span>;
  };

  const onClick = (e) => {
    e.preventDefault();
    handleComment(bodycomment, 2);
    setBodyComment("");
  };

  return (
    <li className="post-comment">
      <div className="comet-avatar">
        <img
          width="45"
          height="45"
          src={"/uploads/users/" + currentUser.profilepic}
          alt
        />
      </div>
      <div className="post-comt-box">
        <form method="post" style = {{display:"flex"}}>
          <textarea
            placeholder="Post your comment"
            onChange={(e) => setBodyComment(e.target.value)}
            value={bodycomment}
            markup="@[__name__](___id__)"
          ></textarea>
        
            <AddCommentIcon
  className="ui"
            onClick={onClick}
          >
            Button
          </AddCommentIcon>
        </form>
      </div>
    </li>
  );
}

export default CommentForm;
