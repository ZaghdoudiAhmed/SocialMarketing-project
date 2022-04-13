import React , { useState, useEffect } from 'react';
import Footer from './Footer';
import NavCart from './NavCart';
import {useDispatch,useSelector} from 'react-redux';
import { deleteFromCart,addToCart } from '../../cartmanagment';
import { Link  } from "react-router-dom";
export default function Cart() {
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
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="cart-sec">
            <table className="table table-responsive">
            <tbody>
            <tr>
            
                  <th>Product name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total price</th>
                </tr>
              
                { cart?.map((item,i) =>
               
                <tr>
                  <td>
                    <a  title className="delete-cart"
                    // onClick={(e) =>{e.preventDefault(); deleteFromCart(item._id,dispatch)}}
                    onClick={(event) => deleteItemFromcart(item?.product)}
                    ><i className="ti-close" /></a>
                    <div className="cart-avatar">
                      <img src={item?.product.ProductImage} alt width={60} height={60} />
                    </div>
                    <div className="cart-meta">
                      <span>{item?.product.productName}</span>
                    </div>
                  </td>
                  <td>
                    <span className="cart-prices"> 
                      <del>
                        <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>{item?.product.productPrice}</span>
                      </del> 
                      <ins>
                        <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>{item?.product.productPrice}</span>
                      </ins> 
                    </span>
                  </td>
                  <td>
                    <div className="cart-list-quantity">
                      {/* <div className="amount">
                        <button onClick={() => increment()}> + </button>
                      
                        <span>
                          {item?.quantity} 
                        </span>
                        <button onClick={() => decrement ()}> - </button>
                      </div> */}
                      <input type='number' className='form-control' value={item?.quantity} onChange={(event) => handlequantitychange(event , item)}></input>
                    </div>
                  </td>

                
     
                  <td>
                
                    

                     <span className="total-price">${item.product.productPrice*item.quantity}</span>
                  
                   
                  </td>
                </tr>
               )} 
             
                 </tbody>
              </table>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="amount-area">
            <Link  title className="update-cart" to={"/shop"}>Back To Shop</Link>
         
          </div>
        </div>
        <div className="col-lg-6">
          <div className="total-area">
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
        </div>
      </div>	
    </div>
  </div>
</section>{/* CART SECTION */}


        <Footer></Footer>
    </div>
    
    </>
  );
}
