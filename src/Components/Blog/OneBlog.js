import React,{useState,useEffect} from 'react';
import { Outlet, Link ,route,Routes,useLocation ,useNavigate} from "react-router-dom";
import axios from "axios";

const Oneblog = (props) => {
  let navigate = useNavigate();
    const [data,setdata]= useState([])
    ///console.log(props.name)
    const [nbrcomments,setsnbrcomments] = useState(0)
    const [likes,setlikes]= useState(0)
    const [likesaffiche,setlikesaffiche]=useState(0)
    const[state,setstate]=useState(true)
    const fetchcommentstotal=async()=>{

       await axios.get('http://localhost:2600/comment/getcommentcount/'+`${props.name._id}`).then(result => {
        ///console.log(result.data);
        setsnbrcomments(result.data.nbrcomment);
         })
   
    }
    const fetchtotallikes=async()=>{

      await axios.get('http://localhost:2600/comment/totallikes/'+`${props.name._id}`).then(result => {

      setlikes(result.data[0].likes);
        })
   
   }
    const change=  ()=>{
       axios.post('http://localhost:2600/comment/updatelikes/'+`${props.name._id}`).then(result => {
        ///console.log(result.data);
      
         })   
   fetchtotallikes();
   setstate(false)
    }
    useEffect(() => {
      fetchcommentstotal();
      fetchtotallikes();
          setdata(props.name)
    },[])
    return (

                    <div className="col-lg-4 col-sm-6">
                  <div className="g-post-classic">
                    <figure>
                      <img alt src="images/resources/bloggrid-6.jpg" />
                      <i className="fa fa-video-camera" />
                    </figure>
                    <div className="g-post-meta">
                      <div className="post-title">
                      <h4>     <a  style={{color: 'black'}}  onClick={() => {
            navigate("/Blogdetail",{state :data}); }} >{data.title}</a></h4>
                        <span className="p-date">by <a href="#" title>JACK Sparo</a> - 12 hours ago </span>
                      </div>	
                      <div className="g-post-ranking">
                        {state==true ? <a title onClick={() => {change()}} className="likes"><i id="fa" className="fa fa-heart-o" />{likes} likes</a>:(
                          <a title  className="likes"><i id="fa" className="fa fa-heart" />{likes} likes</a>
                        )}
                       
                        <a title onClick={() => {
            navigate("/Blogdetail",{state :data}); }} className="coments"><i  className="fa fa-comment-o" />{nbrcomments} comments</a>
                      </div>
                    </div>
                  </div>
                </div>
    
    );
}

export default Oneblog;
