import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';
import NavDetail from './NavDetail';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ProductDataService from "../services/Product.service";
import RelatedProduct from './RelatedProduct';
import { addToCart } from '../../cartmanagment';

export default function DetailProduct() {
    const dispatch = useDispatch()
    const [product, setProduct] = useState();
    const [detailProduct, setdetailProduct] = useState();
    const [loadProduct, setLoadProduct] = useState("")
    const params = useParams();
    console.log(params)
    useEffect(() => {
        retrieveProductByID(params.id)
        retrieveAllProducts();
        console.log(product);
    }, [params.id,loadProduct]);

    const retrieveProductByID = (id) => {
        ProductDataService.getProductById(id)
            .then(response => {
                console.log(response.data)
                setdetailProduct(response.data);



            })
            .catch(e => {
                console.log(e);
            });

    }
    const retrieveAllProducts=() =>{
        ProductDataService.getAllProducts()
        
        .then(response =>{
          console.log(response.data.products)
          setProduct(response.data.products);
        
        })
        .catch(e => {
          console.log(e);
        });
      }
      {product?.map((item , i ) => {
        
        console.log(item?.category);
        // console.log(item?.product_id+item?.images?.name)
       } )}
    
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
                                                <div className="prod-avatar">

                                                    <ul className="slider-for-gold">
                                                        <li><img src={detailProduct?.data.ProductImage} alt /></li>

                                                    </ul>
                                                    

                                                </div>

                                            </div>
                                            <div className="col-lg-6">
                                                {detailProduct ? (
                                                    <div className="full-postmeta">
                                                        <span className="cat-heading"> Price:
                                                            <a href="#" title>{detailProduct.data.productPrice}</a>
                                                        </span>
                                                        {/* title */}
                                                        <h4> {detailProduct.data.productName}</h4>
                                                        <i>INSPIRED LIVING</i>
                                                        <p>
                                                            {detailProduct.data.productDesc}
                                                        </p>
                                                        
                                                        <Link className="shopnow" title   onClick={(e)=>{
                                                            e.preventDefault(); addToCart(detailProduct.data,dispatch)}} to={'/cart'}
                                                        >Add To Cart</Link>
                                                        <div className="delivery-guide">
                                                            <a href="#" title>Size Guide</a>
                                                            <a href="#" title>Delivery &amp; Return</a>
                                                        </div>
                                                        <a className="add_to_wishlist" href="#" title><i className="fa fa-heart-o" /></a>
                                                        <div className="prod categories">
                                                            <span className="cat-heading">Categories:
                                                                <a href="#" title> {detailProduct.data.productCategory}</a>

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
                                                        <div className="extras">
                                                            <a href="https://www.youtube.com/watch?v=MIbbtEjdYrc" title data-strip-group="mygroup" className="strip btn2" data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"><i className="fa fa-play-circle" />Watch video</a>
                                                        </div>{/* play video btn */}
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
                                                    <div className="col-lg-3 col-sm-6">
                                                      
                                                       
                                                            
                                                           
                                                    </div>
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
