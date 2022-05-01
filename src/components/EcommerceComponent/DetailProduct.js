import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';
import NavDetail from './NavDetail';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ProductDataService from "../services/Product.service";
import RelatedProduct from './RelatedProduct';
import { addToCart } from '../../cartmanagment';
import styled from "styled-components";
import { large, medium } from "../../responsive"
export default function DetailProduct() {
    const MainContainer = styled.div`
  background-color: whitesmoke;
`;
const ContainerTo = styled.div`
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
const Container = styled.div`
  margin: 2rem 8rem;
  display: flex;
  gap: 2rem;
  justify-content: center;

`;

const ImageContainer = styled.div`
  padding: 10px;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 5px;
`;
const DetailContainer = styled.div`
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 1px;
`;
const CartButton = styled.div`
  background-color: #4e4a4a;
  padding: 5px 30px;
  display: flex;
  align-items: center;
  color: white;
  font-weight: 600;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  border: none;
  cursor: pointer;
  height: 100%;
`;
const ProductName = styled.div``;
const ProductBrand = styled.div``;
const ProductPrice = styled.div``;
const ProductDesc = styled.div``;
    const dispatch = useDispatch()
    
    
    const [detailProduct, setdetailProduct] = useState();
    const [loadProduct, setLoadProduct] = useState("");
    const [categoryName,setCategoryName] =useState("");
    const[RelatedProduct,setRelatedProd]=useState();
    const params = useParams();
    //console.log(params)
    

    const retrieveProductByID = (id) => {
        ProductDataService.getProductById(id)
            .then(response => {
             
                console.log(response.data);
             //console.log(detailProduct)

             //setCategoryName(detailProduct.data.productCategory);

            })
            .catch(e => {
                console.log(e);
            });

    }

    
    useEffect(() => {
     
            ProductDataService.getProductById(params.id)
            .then(response => {
                // console.log(response.data)
                setdetailProduct(response.data);
                

                setCategoryName(response.data.data.productCategory);
            
               ProductDataService.retrieveProductByCateg(response.data.data.productCategory.toLowerCase())
                .then(response =>{
                console.log(response.data)
               
                setRelatedProd(response.data.data)
               


                })
               .catch(e => {
               console.log(e);
               })

            })
            .catch(e => {
                console.log(e);
            });

        //retrieveProductByID(params.id)
        
        
        
        
    }, []);
    //  console.log(RelatedProduct)
   
   
     
    
    return (
        <>
            <div class="theme-layout">
                <NavDetail></NavDetail>
               
                <section>
                    <div class="gap100">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="prod-detail">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <ImageContainer>
                                                {/* <div className="prod-avatar"> */}
                                                <img src={detailProduct?.data.ProductImage} alt="product"
                                                                style={{ objectFit: "contain" }}
                                                                width="350px"
                                                                height="500px"/>
{/* 
                                                    <ul className="slider-for-gold">
                                                        <li>
                                                        </li>

                                                    </ul>
                                                     */}

                                                {/* </div> */}
                                                </ImageContainer>

                                            </div>
                                            
                                            <div className="col-lg-6">
                                                {detailProduct ? (
                                                    <div className="full-postmeta">
                                                      
                                                        {/* title */}
                                                        <ProductName><h4> {detailProduct?.data.productName}</h4></ProductName>
                                                        <div>{categoryName}</div>
                                                        <span className="cat-heading"> Price:
                                                            <a href="#" title>${detailProduct?.data.productPrice}</a>
                                                        </span>
                                                        <i>INSPIRED LIVING</i>
                                                        <ProductDesc>
                                                            <p style={{ color: "grey" }}>  {detailProduct?.data.productDesc}</p>
                                                         </ProductDesc>
                                                        <p>
                                                            {detailProduct?.data.productDesc}
                                                        </p>
                                                        
                                                        <Link className="shopnow" title   onClick={(e)=>{
                                                            e.preventDefault(); addToCart(detailProduct?.data,dispatch)}} to={'/cart'}
                                                        >Add To Cart</Link>
                                                           
                                                       
                                                        <a className="add_to_wishlist" href="#" title><i className="fa fa-heart-o" /></a>
                                                        <div className="prod categories">
                                                            <span className="cat-heading">Categories:
                                                                <a href="#" title> {detailProduct?.data.productCategory}</a>

                                                            </span>
                                                        </div>

                                                        <div className="share">
                                                            <span>share</span>
                                                            <a href="#" title><i className="fa fa-facebook-square" /></a>
                                                            <a href="#" title><i className="fa fa-twitter-square" /></a>
                                                            <a href="#" title><i className="fa fa-google-plus-square" /></a>
                                                        </div>
                                                        <div className="extras">
                                                        <Link className="strip btn2"  to={'/shop'}>
                                                        <i className="fa fa-play-circle" />Back to shop
                                                        </Link>
                                                           
                                                        </div>{/* back to shop  */}
                                                       
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <br></br>
                                                        <p>please !!</p>
                                                    </div>

                                                )}
                                            </div>
                                       
                                            <div className="gap no-bottom">
                                                <div className="section-heading">
                                                    <h2>Related Products</h2>
                                                </div>
                                               
                                                <div className="row remove-ext-50">
                                                     {RelatedProduct?.map((item , i ) => {
                                                        return(
                                                            
                                                            
                                                            <div className=" col-6" key={i}>
                                                            <div class="col-5">
                                                            <div class="product-box">
                                                                <figure>
                                                                    <span class="new">New</span>
                                                                    <img 
                                                                      className="mt-0"
                                                                      src={item?.ProductImage}  alt="product"
                                                                      
                                                                      width="200px"
                                                                      height="200px" /> 
                                                                    <ul class="cart-optionz">
                                                                    <li><a title="Add Cart" data-toggle="tooltip"  onClick={(e)=>{
                                                           e.preventDefault(); addToCart(item,dispatch)}}><i className="ti-shopping-cart"/></a></li>
                                                                        <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
                                                                        
                                                                    </ul>
                                                                </figure>
                                                                <div class="product-name">
                                                                    <h5><a href="#" title="">{item.productName}</a></h5>
                                                                  
                                                                    <div class="prices">
                                                                        <ins>${item.productPrice}</ins>
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                
                                                   
                                                    
                                                       
            


                                                        )
                                                       
                                                    
       
                                                    } )} 
                                                 
                                                 </div>    
                                                            
                                                           
                                                  
                                                
                                            </div>{/* related products */}
                                          



                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                                                  


                <Footer></Footer>
            </div>
        </>
    );
}
