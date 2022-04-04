import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import NavCart from './NavCart';
import { useParams } from 'react-router-dom';
import Paypal from './Paypal';

import PaymentDataService from "../services/Payment.service"
import { useDispatch, useSelector } from 'react-redux';
export default function CheckoutCart() {
  let dispatch = useDispatch()

    let {cart} = useSelector((state) => state)
    const params = useParams();
    const [loadPrix, setLoadPrix] = useState("");
    
    useEffect(() => {

        console.log(params.prix);
    }, [params.prix])

    const transactionSuccess =async(payment)=>{
      const {paymentID, address} = payment;
      console.log(payment)
      // await axios.post('/api/payment', {cart, paymentID, address}
      // //, {headers: {Authorization: token}}
      // )
      PaymentDataService.createPayment(cart,paymentID, address)
      .then(response =>{
        console.log(response.data);
        alert("You have successfully placed an order.")

      })
      .catch(e => {
        console.log(e);
      });
      

    }
    
    const transactionError =()=>{

        console.log('paypal error');
    }
    const transactionCanceled =()=>{

        console.log('paypal canceled');
    }
  return (
    <>
    <div class="theme-layout">
        <NavCart></NavCart>
        <section>
  <div className="gap100">
    <div className="container">
      <div className="row">
        <div className="col-lg-7 col-sm-12">
          <div className="checkout-meta">
            <h4>Billing Details</h4>
            <form method="post" className="c-form">
              <div className="row">
                <div className="col-lg-12 col-sm-12">
                  <input type="text" placeholder="Complete Name" required />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <input type="text" placeholder="Email Address" required />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <input type="text" placeholder="Phone" required />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <input type="text" placeholder="Company Name" required />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <input type="text" placeholder="Country" required />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <input type="text" placeholder="Address1" required />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <input type="text" placeholder="Address2" required />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <input type="text" placeholder="Town / City" required />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <input type="text" placeholder="State" required />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <input type="text" placeholder="Postcode / ZIP" required />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <div className="additional">
                    <h4>Additional Information</h4>
                    <textarea placeholder="Order Note" rows={12} defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-12">
                  <input type="checkbox" required />
                  <label>I Accept The <a title href="#"> Privacy Policy</a> and <a title href="#"> Terms of Service </a></label>
                </div>
              </div></form>
          </div>	
        </div>
        <div className="col-lg-5 col-sm-12">
          <div className="checkout-total">
            <h4>Order Totals</h4>
            <div className="total-box">
              <ul>
                <li>Cart Subtotal <span>${params.prix}</span></li>
                <li>Shipping &amp; Handling <span>$0</span></li>
                
                <li className="final-total">Order Total <span>${params.prix}</span></li>
              </ul>
            </div>
          </div>
          <div className="payment-method">
            <div className="payment-method">
              <div className="form-radio">
                <div className="radio">
                  <label>
                    <input type="radio" name="radio" defaultChecked="checked" /><i className="check-box" />
                    Direct Bank Transfer
                  </label>
                  <p>Lorem ipsum dolor sit amet, consectetur cing elit, sed do eiusmod tempor incididunt ut la etere dolore magna aliqua.</p>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="radio" /><i className="check-box" />
                    Cheque Payment
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="radio" /><i className="check-box" />
                    Paypal
                  </label>
                </div>
              </div>
              <Paypal 
                toPay={params.prix}
                transactionSuccess={transactionSuccess}
                // transactionError={transactionError}
                // transactionCanceled={transactionCanceled}
              />
            </div>
          </div>
          <button className="submit-checkout" type="submit">Place Order</button>
        </div>
      </div>
    </div>
  </div>
</section>


        <Footer ></Footer>
    </div>
    </>
  );
}
