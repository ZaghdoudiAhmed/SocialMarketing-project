import React , { useEffect, useState } from 'react';
import { Link , useNavigate,useParams } from "react-router-dom";
import Loading from './utils/loading/Loading';
import styled from "styled-components";
import ProductDataService from "../services/Product.service";
import UserService from "../services/User.service";


import StarRatings from "react-star-ratings";


import { large, medium,small  } from "../../responsive.js";


export default function Userproduct() {
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
  const ButtonBack = styled.div`
  border: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  background-color: #464141;
  color: white;
  border-radius: 7px;
  padding: 10px;
  cursor: pointer;
  margin: 1rem;
  font-weight: 700;
  transition: 0.3s ease;
  &:hover {
    background-color: #000;
    color: #fff;
    box-shadow: rgb(38, 57, 77) 0px 20px 20px -10px;
  }
  &:focus {
    color: #0f0;
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
    <Link  to="/addProd">
     <ButtonBack> Add New Product</ButtonBack>
     </Link>
     <Container> 
     
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
    
    </>
  );
}
