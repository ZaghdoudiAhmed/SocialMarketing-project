import React , { useEffect, useState } from 'react';

import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import{
  Paper ,Grid, makeStyles,Typography,Slider,TextField,FormControl,RadioGroup,FormControlLabel,Button,Radio, Card, CircularProgress, Container }from "@material-ui/core";

import { Link , useNavigate,useParams } from "react-router-dom";
import Loading from './utils/loading/Loading';
import styled from "styled-components";
import ProductDataService from "../services/Product.service";
import UserService from "../services/User.service";
import { addToCart } from '../../cartmanagment';
import Fab from '@mui/material/Fab';
import StarRatings from "react-star-ratings";
import Navbar from './NavBar';
import Footer from './Footer';
import MultiRangeSlider from "multi-range-slider-react";
import { large, medium,small  } from "../../responsive.js";
import Userproduct from './UserProduct';
import AddIcon from '@mui/icons-material/Add';
export default function  HomeShop() {
  let isMounted = true;
    const Container = styled.div`
    padding: 15px;
  `;
  const OuterCard = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
  `;
  const Card = styled.div`
    background-color: white;
    height: 450px;
    cursor: pointer;
    width: 14.5rem;
    padding: 15px;
    gap: 1rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s linear;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    border-radius: 8px;
    /* overflow: hidden; */
    /* hover */
    &:hover {
      transform: scale(0.95);
      box-shadow: rgb(38, 57, 77) 0px 20px 10px -10px;
    }
  `;
  const MainContainer = styled.div`
  background-color: whitesmoke;
`;



  const [loading, setLoading] = useState(false)

  const [product, setProduct] =useState();
  const [currentUser, setCurrentUser] = useState("");
  const currentUserId = localStorage.getItem("currentUser");
  const [UserName,setUserName]= useState("");
  const navigate = useNavigate()
 
  useEffect(() => {
      
    UserService.getUserById(currentUserId)
    .then(response => {
             
    //   console.log(response.data);
    //   console.log(response.data.name);
      ProductDataService.retrieveProductByUser(response.data.name)
      .then(response =>{
      console.log(response.data.data)
      console.log(typeof(response.data.data))
      setProduct(response.data.data)
      { Object.keys(response.data.data)?.map((item,i)=>{
        console.log(response.data.data[item])
      })}
     
     })
      .catch(e => {
      console.log(e);
   });
   

    })
    .catch(e => {
      console.log(e);
   });
   setLoading('done !');


    
  }, [loading])

 
  return (
    <>
   <div className="theme-layout">
    <Navbar></Navbar>
          
  
   
    
    <section>
      <div className="gap100">
        <div className="container mi">
          <div className="row">  
         <div className="nu"><Fab onClick={() =>{navigate('/addProd')}}><AddIcon color="primary" fontSize="large" /></Fab> </div> 
            <div className="col-lg-12">
                 <div class="shop-page">
    <div class="row">
    {product?.map((item,i) => (
                    <div className="col-lg-3 col-sm-6">
  <div className="product-box">
    <figure>
      <span className="new">New</span>
      <img src={item?.ProductImage} />
      <ul className="cart-optionz">
      <li><Link  to={`/detailProduct/${item?._id}`}><i className="ti-eye" /></Link></li>
                  <li><a href="#" title="Wishlist" data-toggle="tooltip" ><i className="ti-heart" /></a></li> 
                  <li><Link  to={`/updateProd/${item?._id}`}><i className="ti-split-v-alt" /></Link></li>
      </ul>
    </figure>
    <div className="product-name">
      <h5><a href="#" title={item?.productName}>{item?.productName}</a></h5>
      <ul className="starz">
        <li><i className="fa fa-star" /></li>
        <li><i className="fa fa-star" /></li>
        <li><i className="fa fa-star" /></li>
        <li><i className="fa fa-star" /></li>
        <li><i className="fa fa-star" /></li>
      </ul>
      <div className="prices">
        <ins>{item?.productPrice} DT</ins>
      </div>
    </div>
  </div>
</div>    
         
    ))}
      </div>  
</div>
   
              </div>
        </div>
        </div>
      </div>
      </section>
      
    
    <Footer></Footer>
   
  </div>
    
<script src="js/main.min.js"></script>
<script src="js/script.js"></script>
    
    </>
  );
}
