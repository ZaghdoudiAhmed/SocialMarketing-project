import React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import { Outlet, Link ,route,Routes,useLocation ,useNavigate} from "react-router-dom";
function DonationCard(props) {
   /// console.log(props.name.description);
    let test = new Date();
    let date =new Date(props.name.date);
    const diffTime = Math.abs(test - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const months = Math.ceil(diffDays /30); 
    let navigate = useNavigate();
  //  console.log(date);
   // console.log(diffTime+"seconds");
   // console.log(diffDays+"days");
   // console.log(months+" months");
    return (
      
        <div className="l-post">
        <figure>
          <img className="img_position"src={props.name.image} alt="true" />
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
            <a className="admin" href="#" title="true"> {props.name.location }</a>
            <div className="posit">
<p className="pos">{months} months ago </p>
    <Chip
  avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
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