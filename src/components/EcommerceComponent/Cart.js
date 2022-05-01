import React , { useState, useEffect } from 'react';
import Footer from './Footer';
import NavCart from './NavCart';
import styled from "styled-components";
import {useDispatch,useSelector} from 'react-redux';
import { deleteFromCart,addToCart } from '../../cartmanagment';
import { Link  } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { large, medium,small  } from "../../responsive.js";
export default function Cart() {
  const TopButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 8rem;
  ${medium({ margin: "2rem 1rem" })}
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
const Container = styled.div`
  margin: 2rem 8rem;
  display: flex;
  gap: 2rem;
  ${large({ margin: "2rem 1rem", gap: "0" })}
  ${medium({ flexDirection: "column" })}
`;
const CartContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 4rem;
  padding: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: white;
  border: none;
  border-bottom: 2px solid #888;
  ${medium({ gap: "2rem" })}
  ${small({ flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  width: 100px;
  display: flex;
  height: 150px;
  object-fit: cover;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: whitesmoke;
`;
const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 75%;
  height: 100%;
  gap: 2rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  ${medium({ width: "100%" })}
`;
const SummaryContainer = styled.div`
  background-color: white;
  padding: 18px;
  width: 25%;
  height: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  ${medium({ width: "100%" })}
`;
const SummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
const ShadeSingle = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  background-color: ${(props) => props.hexValue};
  border-radius: 50%;
  border: 1px solid black;
  cursor: pointer;
`;
const QuantityContainer = styled.div`
  margin-left: auto;
  min-width: 11rem;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-around;
  ${small({ marginLeft: "0" })}
`;
const Button = styled.button`
  border: none;
  background-color: #4dc52f;
  border-radius: 5px;
  color: white;
  font-weight: 700;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 5px 15px;
`;
    let dispatch = useDispatch()
  let [qte , setQte] = useState()
    const {cart} = useSelector((state) => state)
   
    const [ShopCart , SetShopCart] = useState()
    const [totalPrice , setTotalPrice] = useState()
    const [totalParProd , setTotalParProd] = useState()
    const [loadShopCart , SetLoad] = useState() 
    const [loadTotalPrice , SetLoadTotalPrice] = useState()
    
    useEffect(() => {
        SetShopCart(localStorage.getItem('shopping-cart'))
        SetLoad('Done')
        dispatch({type:"INIT_CART"})
    }, [loadShopCart])
    useEffect(()=>{
        
        

        
        const getTotal=()=>{
            const totalPrice =cart.reduce((prev,item)=>{
                const total=  prev + (item.product.productPrice * item.quantity)
                //console.log(total)
                return total
                 
            },0)
            setTotalPrice(totalPrice)
        }
       
       
        getTotal()
    
       SetLoadTotalPrice('done!')

   },[loadTotalPrice])
  
  // { cart?.map((item,i) =>{
  //   console.log(item.product.productPrice)

  // })}
//   const increment =() =>{
//     cart.forEach(item => {
      
//           item.quantity += 1
//           console.log(item.quantity)
      
    
//   })

//   // SetShopCart([...cart])
//   // addToCart(cart)
// }
// const decrement  =() =>{
//   cart.forEach(item => {
    
//     item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
//     console.log(item.quantity)
    
  
// })

// // SetShopCart([...cart])
// // addToCart(cart)
// }
let handlequantitychange = (e , item) => {
  console.log(item);
  console.log(e.target.value);
  dispatch ({
    type:"SET_QUANTITY" , 
    payload : {id : item.product._id , quantity : parseInt(e.target.value)}
  })
  SetLoadTotalPrice('he')
}
let deleteItemFromcart = async(product) => {
  console.log(product._id);
  dispatch({
    type:'REMOVE_FROM_CART',
    payload : {id : product._id}
  })
  SetLoadTotalPrice('he')
}
  return (
    <>
    <div class="theme-layout">
        <NavCart></NavCart>

      <section>
    
       
  <div className="gap100">
  <TopButtons>
      
      <Link  to={"/shop"}><ButtonBack>Continue To Shop</ButtonBack></Link>
   
    
</TopButtons>
    <Container>
    
      
    {/* <div className="container"> */}
      {/* <div className="row"> */}
        {/* <div className="col-lg-12"> */}
          {/* <div className="cart-sec"> */}
         <OrderContainer>
            {/* <table >
            <tbody> */}
            {/* <tr>
            
                  <th>Product name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total price</th>
                </tr> */}
                <OuterContainer>
              
                { cart?.map((item,i) =>{
                  return(
                    <CartContainer >
                      <ImageContainer>
                      <img src={item?.product.ProductImage} 
                      width="150rem"
                         
                         style={{ objectFit: "cover" }} />
                      </ImageContainer>
                      <DetailsContainer>
                      <div><h2>{item?.product.productName}</h2></div>
                      <div>
                      <p>{item?.product.productDesc}</p>
                      </div>
                       
                      
                      </DetailsContainer>
                      <QuantityContainer>
                        <div>
                        <h4 style={{ display: "inline-block" }}>Quantity:</h4>
                        <h4 style={{ display: "inline-block" }}>
                        <input type='number' className='form-control' value={item?.quantity} onChange={(event) => handlequantitychange(event , item)}></input>
                        </h4>
                        </div>
                        <div>
                        <h4 style={{ display: "inline-block" }}>Total Price:</h4>
                  <h3 style={{ marginLeft: "3.5rem", fontSize: "1.5rem" }}>
                  ${item.product.productPrice*item.quantity}
                  </h3>
                </div>
                <div className="mx-auto">
                  <Button
                    onClick={(event) => deleteItemFromcart(item?.product)}
                    
                  >
                    Remove
                  </Button>
                </div>
                     
                      </QuantityContainer>

                    </CartContainer>


                  )
                }
               
                // <tr>
                //   <td>
                //     <a  title className="delete-cart"
                //     // onClick={(e) =>{e.preventDefault(); deleteFromCart(item._id,dispatch)}}
                //     onClick={(event) => deleteItemFromcart(item?.product)}
                //     ><i className="ti-close" /></a>
                //     <div className="cart-avatar">
                //       <img src={item?.product.ProductImage} alt width={60} height={60} />
                //     </div>
                //     <div className="cart-meta">
                //       <span>{item?.product.productName}</span>
                //     </div>
                //   </td>
                //   <td>
                //     <span className="cart-prices"> 
                //       <del>
                //         <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>{item?.product.productPrice}</span>
                //       </del> 
                //       <ins>
                //         <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>{item?.product.productPrice}</span>
                //       </ins> 
                //     </span>
                //   </td>
                //   <td>
                //     <div className="cart-list-quantity">
                //       {/* <div className="amount">
                //         <button onClick={() => increment()}> + </button>
                      
                //         <span>
                //           {item?.quantity} 
                //         </span>
                //         <button onClick={() => decrement ()}> - </button>
                //       </div> */}
                //       <input type='number' className='form-control' value={item?.quantity} onChange={(event) => handlequantitychange(event , item)}></input>
                //     </div>
                //   </td>

                
     
                //   <td>
                
                    

                //      <span className="total-price">${item.product.productPrice*item.quantity}</span>
                  
                   
                //   </td>
                // </tr>
               )} 
              </OuterContainer>
{/*              
                 </tbody>
              </table> */}
              </OrderContainer>
          {/* </div>
          toto */}
        {/* </div> */}
        {/* ** */}
        {/* <div className="col-lg-6">
          <div className="amount-area">
            <Link  title className="update-cart" to={"/shop"}>Back To Shop</Link>
         
          </div>
        </div> */}
        <SummaryContainer>
        <div >
          <div >
            <ul>
              <li>
                <span>Cart Subtotal:</span>
                <i>${totalPrice}</i>
              </li>
              <li>
                <span>Shipping:</span>
                <i>Free</i>
              </li>
              <li className="order-total">
                <span>ORDER TOTAL:</span>
                <i>${totalPrice}</i>
              </li>
            </ul>
          </div>
          <div className="proceed">
                      
                    { cart?.length == 0 ?
                     (<button className="button" disabled> proceed to checkout 2 </button>) :
                     (<Link className="button"to={`/checkout/${totalPrice}`}>proceed to checkout</Link>)}
            
          </div>
           {/* { cart?.length == 0 ?
                     (<ButtonBack>proceed to checkout</ButtonBack>) :
                     (<Link className="ButtonBack"to={`/checkout/${totalPrice}`}>proceed to checkout</Link>)} */}
          
        </div>
        </SummaryContainer>
      {/* </div>	  */}
      {/* *** */}
     {/* </div> */}
    </Container>
    {/* ici */}
  </div>
  
  
</section>{/* CART SECTION */}


        <Footer></Footer>
    </div>
    
    </>
  );
}
