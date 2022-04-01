import React,{useEffect,useState} from 'react';
import { Outlet, Link ,route,Routes,useLocation ,useNavigate,useParams} from "react-router-dom";
import {useForm,useFormState} from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from "axios";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const Comment = (props) => {
    var i =0;
   //// console.log(props)
    const {register,handleSubmit,reset,formState: { errors },control }=useForm();
    const [replies , setreplies]=useState([])
    const [state , setstate]=useState(false) ;
    const [statedelete , setstatedelete]=useState(false) ;
    const onSubmit = async (e) => {
      const  result =[];
        result.push(e)   ;
        result.push(props.name._id)   ;
          axios.post('http://localhost:2600/reply/addreply/',result).catch((err) => {console.log(err);}).then(() => {

               fetchdata();
         reset();
          }
       
        
          );
         //const sel = document.getElementById("replybox");
        /// sel.style.visibility="hidden";
        
     };
     
    async function fetchdata(){
     await axios.get('http://localhost:2600/reply/getreply/'+`${props.name._id}`).then(result => {
     /// console.log(result.data);
      setreplies(result.data);
       })
      } 
      useEffect(() => {
      fetchdata();
     },[])
     const replybox = (i)=>{  
         setstate(true);
        // var test =document.getElementById('replybox');
       /// test.style.visibility="visible";
     }
     
     const deletecomment=(i)=>{
       
       axios.delete('http://localhost:2600/reply/deletecomment/'+`${props.name._id}`).then(result => {
        /// console.log(result.data);
      console.log("dele")
          })
          setstatedelete(true);

     }
    return (
 <div>
   {statedelete == false?   <li > 
          <div><span id="comment-box">
                     <div  className="comment-box">
                            <div className="commenter-photo">
                              <img alt src="images/resources/commenter-1.jpg" />
                            </div>
                            <div className="commenter-meta">
                              <div className="comment-titles">
                                <h6 className="pad">{props.name.publisher.name}</h6>
                                <span>12 june 2017</span>
                                <a  title onClick ={(i)=>{replybox(props.name._id)}} className="btn reply">reply</a>  
                                <a  title onClick ={(i)=>{deletecomment(props.name._id)}} className="btn reply">delete</a>    
                         </div>
                              <p>
                             {props.name.desciption} 
                              </p>
                            </div>
                          </div>              
         
                                   
 

           </span>
     
                <ul className="paddleft"> {    
                                    replies.map(reply => (
                         ///               onSubmit={handleSubmit(onSubmit)}   
                            <li>
                              <div className="comment-box">
                                <div className="commenter-photo">
                                  <img alt src="images/resources/commenter-2.jpg" />
                                </div>
                                <div className="commenter-meta">
                                  <div className="comment-titles">
                                    <h6>{reply.user.name}</h6>
                                    <span>22 july 2017</span>
                               
                                  </div>
                              <p>  {reply.desciption}      </p>  
                                  
                                </div>
                              </div>	
                            </li>
                       
                                   
                                    ))   
                                }</ul>
                  { state==true &&(
                          <form onSubmit={handleSubmit(onSubmit)} id="lol"className=" paddi text-box">
      <input type="text"name= "post" className="replybox" id="replybox`${i}`"  defaultValue={""}  {...register('post')} placeholder="Reply to this comment..." />
      
    </form>    
   ) }              
     </div>
      </li>  
    :(<i></i>)
      }
 </div>    


      
        
                      
      
    );
}

export default Comment;
