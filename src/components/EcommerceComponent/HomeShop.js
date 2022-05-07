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

import StarRatings from "react-star-ratings";
import Navbar from './NavBar';
import Footer from './Footer';
import MultiRangeSlider from "multi-range-slider-react";
import { large, medium,small  } from "../../responsive.js";
import Userproduct from './UserProduct';


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
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop-page">
                <div className="shop-filter-sec">
                
              
   
                
      
    <Container>  
     
    <Link className="btn btn-primary"  to="/addProd">
     Add New Product
     </Link>
          <OuterCard>
                { product?.map((item , i ) => {  
                return(
       
          <div className="col-lg-3 col-sm-6" key={i}>
          <Card>
            <div className="product-box">
              <figure>
                <span className="new">New</span>
                   <img 
                   className="mt-0"
                   src={item?.ProductImage}  alt="product"
                   style={{ objectFit: "cover" }}
                   width="170px"
                   height="150px" /> 
                
                
                <ul className="cart-optionz">
                  {/* <li><a title="Add Cart" data-toggle="tooltip"  onClick={(e)=>{
                  e.preventDefault(); addToCart(item,dispatch)}}><i className="ti-shopping-cart"/></a></li> */}
                  <li><Link  to={`/detailProduct/${item?._id}`}><i className="ti-eye" /></Link></li>
                  <li><a href="#" title="Wishlist" data-toggle="tooltip" ><i className="ti-heart" /></a></li> 
                  <li><Link  to={`/updateProd/${item?._id}`}><i className="ti-split-v-alt" /></Link></li>
                  
                </ul> 
             </figure>
              <ul className="product-name">
            
                <h2 title={item?.productName}>{item?.productName}</h2>
              
                <div className="prices">
                  <span>{item?.productPrice} DT</span>
                </div>
                <div className="description">
                  <p>{item?.productDesc}</p>
                </div>
                <div>
                    <StarRatings
                      // rating={item.rating}
                      starRatedColor="gold"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  </div>
              </ul>
              {/* <div className='row_btn'>
                 <button className="btn btn-primary" >Delete Product</button> 
                <Link className="btn btn-primary" to="#"> Buy</Link> 
                 <Link className="btn btn-primary" to={'/detailProduct/${item?._id}'}> view</Link> 

              </div> */}
            </div>
          </Card>
          </div>
         
         )}) }   
                </OuterCard>
                 </Container> 
        
             
         
             
               
       
         
              
                
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
