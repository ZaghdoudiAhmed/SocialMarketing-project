import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import NavCart from './NavCart';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Paypal from './Paypal';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PaymentDataService from "../services/Payment.service";
import UserService from "../services/User.service";
import AddressService from '../services/Address.service';
import OrderService from '../services/Order.service';
import { useDispatch, useSelector } from 'react-redux';
export default function CheckoutCart(props) {

  let dispatch = useDispatch();
  const navigate = useNavigate();

  let { cart } = useSelector((state) => state)
  const params = useParams();

  const [open, setOpen] = React.useState(false);

  const [loadPrix, setLoadPrix] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const currentUserId = localStorage.getItem("currentUser");
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const [locality, setLocality] = useState('');
  const [cityDistrictTown, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [addressType, setAddressType] = useState("");
  const [shippmentMode, setShippmentMode] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  const initialAddressState = {
    userName,
    userPhone,
    userAddress,

    pinCode: "",
    locality: "",
    cityDistrictTown: "",
    state: "",
    addressType: ""
  }
  const [address, setAddress] = useState(initialAddressState);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
    ///console.log(name)
  };
  const [detailAddress, setDetailAddress] = useState();
  const [loadAddress, setLoadAddress] = useState("");
  const [loadTotalPrice, SetLoadTotalPrice] = useState();
  const [orderline, setOrderline] = useState();
  const [Product, setProduct] = useState("")
  const [Quantity, setQuantity] = useState(0)
  const [orderStatus, setOrderStatus] = useState();


  const [order, setOrder] = useState();
  let handleNameChange = (e) => {
    setUserName(e.target.value)

  }
  let handleEmailChange = (e) => { setUserName(e.target.value) }
  let handlePhoneChange = (e) => { setUserPhone(e.target.value) }
  let handleAddressChange = (e) => { setUserAddress(e.target.value) }

  let handleCountryChange = (e) => { setLocality(e.target.value) }
  let handelCityChange = (e) => { setCity(e.target.value) }
  let handelStateChange = (e) => { setState(e.target.value) }
  let handelCodeChange = (e) => { setPinCode(e.target.value) }
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('items'));
  //    if (items) {
  //    console.log(items);
  //     }
  // }, []);
  useEffect(() => {


    // console.log(params.prix);
    if (localStorage.getItem('shopping-cart')) {
      let LScart = JSON.parse(localStorage.getItem('shopping-cart'))
      //console.log(LScart)
    }





  }, [params.prix])


  useEffect(() => {

    UserService.getUserById(currentUserId)
      .then(response => {
        console.log(response.data)
        setUserName(response.data.name)
        setUserEmail(response.data.email)
        setUserPhone(response.data.phone)
        setUserAddress(response.data.address)




      })
      .catch(e => {
        console.log(e);
      });

  }, [currentUserId]);



  const transactionError = () => {

    console.log('paypal error');
  }
  const transactionCanceled = () => {

    console.log('paypal canceled');
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let handlequantitychange = (e, item) => {
    console.log(item);
    console.log(e.target.value);
    dispatch({
      type: "SET_QUANTITY",
      payload: { id: item.product._id, quantity: parseInt(e.target.value) }
    })
    SetLoadTotalPrice('hey')
  }



  const transactionSuccess = async (payment) => {
    const { paymentID, paid } = payment;
    console.log(payment);

    const totalPrice = params.prix;
    console.log(paymentID)
    console.log(paid)
    console.log(userName)
    console.log(userEmail)
    console.log(totalPrice)


    const data = {
      paymentID,
      paid,
      userName,
      userEmail,
      totalPrice


    }
    console.log(data)


    PaymentDataService.createPayment(data)
      .then(response => {
        console.log(response.data);
        alert("You have successfully placed an order.")

      })
      .catch(e => {
        console.log(e);
      });


  }
  let [RemplieOrderLine, setRemplie] = useState('false')
  const passOrder = async () => {
    const totalPrice = params.prix;
    if (localStorage.getItem('shopping-cart')) {
      const OrderLine2 = JSON.parse(localStorage.getItem('shopping-cart'))


      console.log(OrderLine2)
      setOrderline(OrderLine2)
      setRemplie('true')






      console.log(RemplieOrderLine)
      const data = {
        userName,
        userAddress,
        totalPrice,
        shippmentMode,
        paymentMode,
        OrderLine2,
        orderStatus




      }
      console.log(data)




      OrderService.createOrder(data)
        .then(response => {
          console.log(response.data)
          setOrder(response.data)
          localStorage.removeItem('shopping-cart');
          dispatch({ type: 'INIT_CART' })
          navigate("/order")

        })
        .catch(e => {
          console.log(e);
        });

    }



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
                    <h4>1.Address: </h4>


                    <form method="post" className="c-form">
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <input type="text"
                            id="name"
                            required="required"
                            value={userName}
                            onChange={(e) => handleNameChange(e)}
                            name="userName"
                          />
                          {/* <label className="control-label" htmlFor="input">Product name </label><i className="mtrl-select" /> */}
                        </div>
                        {/* <div className="col-lg-12 col-sm-12">
                       <input type="text" placeholder="Complete Name" required />
                      </div> */}
                        <div className="col-lg-6 col-sm-12">
                          <input type="text"
                            id="email"
                            required="required"
                            value={userEmail}
                            onChange={(e) => handleEmailChange(e)}
                            name="userEmail"
                          />
                          {/* <input type="text" placeholder="Email Address" required /> */}
                        </div>
                        <div className="col-lg-6 col-sm-12">
                          <input type="text"
                            id="phone"
                            required="required"
                            value={userPhone}
                            onChange={(e) => handlePhoneChange(e)}
                            name="userPhone"
                          />
                          {/* <input type="text" placeholder="Phone" required /> */}
                        </div>


                        <div className="col-lg-12 col-sm-12">
                          <input type="text"
                            id="address"
                            required="required"
                            value={userAddress}
                            onChange={(e) => handleAddressChange(e)}
                            name="userAddress"
                          />
                          {/* <input type="text" placeholder="Address1" required /> */}
                        </div>

                        {/* <div className="col-lg-12 col-sm-12">
                            <div className="additional">


                              <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
                                Add adress detail
                              </Button>
                              <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>add address details</DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                                    please enter your  address detail here.
                                  </DialogContentText>
                                  <TextField autoFocus margin="dense" type="text"
                                    id="name"
                                    required="required"
                                    value={userName}
                                    onChange={handleInputChange}
                                    label="userName"
                                    fullWidth
                                  />
                                  <TextField autoFocus margin="dense" type="text"
                                    id="phone"
                                    required="required"
                                    value={userPhone}
                                    onChange={(e) => handlePhoneChange(e)}
                                    label="userPhone"
                                    fullWidth
                                  />
                                  <TextField autoFocus margin="dense" type="text"
                                    id="address"
                                    required="required"
                                    value={userAddress}
                                    onChange={(e) => handleAddressChange(e)}
                                    label="userAddress"
                                    fullWidth
                                  />


                                  <TextField
                                    autoFocus margin="dense" type="text"
                                    id="locality"
                                    required="required"
                                    value={locality}
                                    onChange={(e) => handleCountryChange(e)}
                                    label="Country"
                                    fullWidth
                                  />
                                  <TextField
                                    autoFocus margin="dense" type="text"
                                    id="cityDistrictTown"
                                    required="required"
                                    value={cityDistrictTown}
                                    onChange={(e) => handelCityChange(e)}
                                    label="city"
                                    fullWidth
                                  />
                                  <TextField
                                    autoFocus margin="dense" type="text"
                                    id="state"
                                    required="required"
                                    value={state}
                                    onChange={(e) => handelStateChange(e)}
                                    label="state"
                                    fullWidth
                                  />

                                  <TextField
                                    autoFocus margin="dense" type="text"
                                    id="pinCode"
                                    required="required"
                                    value={pinCode}
                                    onChange={(e) => handelCodeChange(e)}
                                    label="Postcode"
                                    fullWidth
                                  />
                                  <DialogContentText>
                                    Address Type
                                    <div class="form-radio">
                                      <div class="radio">
                                        <label>
                                          <input type="radio" checked="checked" onClick={() => setAddressType("home")}
                                            name="addressType"
                                            value="home" /><i class="check-box"></i>Home
                                        </label>
                                      </div>
                                      <div class="radio">
                                        <label>
                                          <input type="radio" onClick={() => setAddressType("work")}
                                            name="addressType"
                                            value="work" /><i class="check-box"></i>Work
                                        </label>
                                      </div>
                                    </div>
                                  </DialogContentText>



                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose}>Cancel</Button>
                                  <Button onClick={saveAddress}>Save</Button>
                                </DialogActions>
                              </Dialog>

                            </div>
                          </div> */}


                        <div>



                        </div>
                        <div className="col-lg-12 col-sm-12">

                          <div className="additional">
                            <h4>2. MODE DE LIVRAISON {RemplieOrderLine} :</h4>
                            <div className="col-lg-12 col-sm-12">
                              <label className="control-label" >shippment Mode: </label><i className="mtrl-select" />
                              <div class="form-radio">
                                <div class="radio">
                                  <label>
                                    <input type="radio" checked="checked" onClick={() => setShippmentMode("domicile")}
                                      name="shippmentMode"
                                      value="home" /><i class="check-box"></i>domicile
                                  </label>
                                </div>
                                <div class="radio">
                                  <label>
                                    <input type="radio" onClick={() => setShippmentMode("point relais")}
                                      name="shippmentMode"
                                      value="work" /><i class="check-box"></i>point relais
                                  </label>
                                </div>
                              </div>

                            </div>

                          </div>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                          <div className="additional">
                            <h4>3. MODE DE PAIEMENT  :</h4>

                            <div className="col-lg-12 col-sm-12">

                              <div className="payment-method">
                                <div className="payment-method">


                                  <label className="control-label" >payment Mode: </label><i className="mtrl-select" />
                                  <Paypal
                                    toPay={params.prix}
                                    transactionSuccess={transactionSuccess}
                                  // transactionError={transactionError}
                                  // transactionCanceled={transactionCanceled}
                                  />
                                  <div class="form-radio">
                                    <div class="radio">
                                      <label>
                                        <input type="radio" checked="checked" onClick={() => setPaymentMode("paid")}
                                          name="paymentMode"
                                          value="paid" /><i class="check-box"></i>paid
                                      </label>
                                    </div>
                                    <div class="radio">
                                      <label>
                                        <input type="radio" onClick={() => setPaymentMode("cancelled")}
                                          name="paymentMode"
                                          value="cancelled" /><i class="check-box"></i>cancelled
                                      </label>
                                    </div>
                                  </div>

                                </div>

                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </form>
                  </div>

                </div>

                <div className="col-lg-5 col-sm-12">
                  <div className="checkout-total">
                    <h4>Order Totals</h4>
                    <div className="total-box">
                      <ul>
                        {cart?.map((item, i) =>

                          <tr>
                            <td>

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

                                <input type='number' className='form-control' value={item?.quantity}
                                ></input>
                              </div>
                            </td>
                            <td>



                              <span className="total-price">${item.product.productPrice * item.quantity}</span>


                            </td>
                          </tr>

                        )}
                        <li>Cart Subtotal <span>${params.prix}</span></li>
                        <li>Shipping &amp; Handling <span>$0</span></li>

                        <li className="final-total">Order Total <span>${params.prix}</span></li>
                      </ul>
                    </div>
                  </div>

                  <button className="submit-checkout" type="submit" onClick={passOrder}>Place Order</button>
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
