import React, { useEffect ,useState} from "react";
import axios from "axios";
import Member from "./Member"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
const Compaign = (props) => {
   const [statu ,setstatu] = useState(true);
  useEffect(() => {

   //// console.log(props)
  }, [statu]);
  const change=()=>{
    setstatu(false)
    console.log(statu)
  }
  const prev=()=>{
    setstatu(true)
  }
  return (
      <li>
          {statu==true ? (
           <div className="nearly-pepls">
          <figure>
            <a  title>
              <img src={props.state.image} alt />
            </a>
          </figure>
          <div className="pepl-info">
            <h4>
              <a  title>
              {props.state.title}
              </a>
            </h4>
            <em>{props.state.members.length} Members</em>
            <a onClick={change} title className="add-butn" style= {{color: 'white',cursor: 'pointer'}} data-ripple>
             Participants
            </a>
          </div>
        </div>   
          ):statu==false &&(
            <div> <div>
              {props.state.members.map(member =>{
                return (
                  <Member state ={member}></Member>
                )
              })}
        
              </div> 
              <div>    
            <ArrowBackIcon style= {{cursor: 'pointer'}} onClick={prev} ></ArrowBackIcon>
            </div>
            </div>
             
             
          )}
        
      </li>

  );
};

export default Compaign;
