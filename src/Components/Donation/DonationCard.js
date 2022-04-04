import React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import  {format } from "timeago.js";
import { useNavigate } from "react-router-dom";
function DonationCard(props) {
  let navigate = useNavigate();
  return (
    <div className="l-post">
      <figure>
        <img className="img_position" src={props.name.image} alt="true" />
      </figure>
      <div className="l-post-meta">
        <h4>
          <a
            onClick={() => {
              navigate("/Donationdetails", { state: props.name });
            }}
          >
            {props.name.title}
          </a>
        </h4>
        <div className="l-post-ranking">
          <a className="admin" href="#" title="true">
            {" "}
            {props.name.location}
          </a>
          <div className="posit">
            <p className="pos">{format(props.name.datecre)} </p>
            <Chip
              avatar={
                <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
              }
              label="Avatar"
              variant="outlined"
              className="posi"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DonationCard;
