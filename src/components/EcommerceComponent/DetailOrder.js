import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './NavBar';
import OrderService from '../services/Order.service';
import ProductService from '../services/Product.service'
import { useParams } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import styled from "styled-components";
import { large, medium,small } from "../../responsive";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { map } from 'leaflet';
import Chat from "../chat";
import {BiBot,BiUser} from 'react-icons/bi';
import SendIcon from "@mui/icons-material/Send";

import Avatar from "@mui/material/Avatar";
import axios from 'axios'
export default function DetailOrder() {
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
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
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
///////////
const [chat,setChat] = useState([]);
const [inputMessage,setInputMessage] = useState('');
const [botTyping,setbotTyping] = useState(false);
const [m,setx]=useState(null)
const [y,sety]=useState(null)
const getimage =() =>{
axios.get('http://127.0.0.1:8000/hub/takeimage').then((res)=>{
console.log(res.data)
setx(res.data['pred'])
sety(res.data['bar'])
})
}
useEffect(()=>{



},[chat])

const close = () => {
    var elts = document.getElementsByClassName("chat-box");
    elts[0].classList.remove("show");
  };
  const change = () => {
    var elts = document.getElementsByClassName("chat-box");
    elts[0].classList.add("show");
  };

const handleSubmit=(evt)=>{
    evt.preventDefault();
    const name = "shreyas";
    const request_temp = {sender : "user", sender_id : name , msg : inputMessage};
    
    if(inputMessage !== ""){
        
        setChat(chat => [...chat, request_temp]);
        setbotTyping(true);
        setInputMessage('');
        rasaAPI(name,inputMessage);
    }
    else{
        window.alert("Please enter valid message");
    }
    
}

const rasaAPI = async function handleClick(name,msg) {

    //chatData.push({sender : "user", sender_id : name, msg : msg});
    

      await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'charset':'UTF-8',
        },
        credentials: "same-origin",
        body: JSON.stringify({ "sender": name, "message": msg }),
    })
    .then(response => response.json())
    .then((response) => {
        if(response){
            const temp = response[0];
            const recipient_id = temp["recipient_id"];
            const recipient_msg = temp["text"];        


            const response_temp = {sender: "bot",recipient_id : recipient_id,msg: recipient_msg};
            setbotTyping(false);
            
            setChat(chat => [...chat, response_temp]);
           // scrollBottom();

        }
    }) 
}
/////////////
    let dispatch = useDispatch()
    let {ProductLine} = useSelector((state)=>state)
    const[orderdetail,setOrderdetail]= useState("");
    const[loaddetail,setLoadDetail] = useState("");
    const[loadprod,setLoadProd] = useState("");
    const [prod,setProduct]=useState("");
    const [idProd,setIdProd]=useState("");
    const [OrderStatus, setOrderStatus] = useState("");
    const [userName,setUserName]= useState("");
    const [userAddress,setUserAddress]= useState("");
    
    const [paymentMode,setPaymentMode]=useState("");
    const [shippmentMode,setShippmentMode]=useState("");
    const [totalPrice,setTotalPrice]=useState("");
    const [Orderd, setOrderd] = useState("");
    const [OrderLine2,setOrderLine]=useState();
    const [test,setTest]=useState();
    var products=[];
    var idProduits=[];
    let x = 0 
   
    const params = useParams();
    const [open, setOpen] = React.useState(false);
    let handleNameChange=(e) =>{
        setOrderStatus(e.target.value)
       
      }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
  
    const retrieveProductByID=(idProd)=>{
        ProductService.getProductById(idProd)
        .then(response =>{
           
                // products[response.data.data._id]= response.data.data
              products.push({
                  id : response.data.data._id,
                  data : response.data.data
              }) 
              dispatch({
                  type:'ADDProd',
                  payload : response.data.data
              })
              setTest({
                id : response.data.data._id,
                data : response.data.data
            }) 
            console.log(response.data.data)
            setProduct(response.data.data)
            
        })
        .catch(e => {
            console.log(e);
        });     


    }
    
    useEffect(() => {
        dispatch({
            type:'LoadIT'
        })
        OrderService.getOrderById(params.id)
        .then(response => {
            console.log(response.data)
            setOrderdetail(response.data)
            setUserName(response.data.data.userName)
            setUserAddress(response.data.data.userAddress)
            setPaymentMode(response.data.data.paymentMode)
            setShippmentMode(response.data.data.shippmentMode)
            setTotalPrice(response.data.data.totalPrice)
            setOrderStatus(response.data.data.orderStatus)
             
          

            setOrderLine(response.data.data.OrderLine2)
            // console.log(response.data.data.OrderLine2)
            
            for(var i=0;i<(response.data.data.OrderLine2).length;i++){
                    const item=(response.data.data.OrderLine2);
                    // console.log(item);
                    
                    idProduits.push(item[i].product)
                    //retrieveProductByID(idProduits[i])
                    // console.log(prod);
                   
                    
            
                }

        //    console.log(idProduits)
           let x = 0
           for(var i=0;i<idProduits.length;i++){
               const item =idProduits;
            //    console.log(item[i]);
               retrieveProductByID(idProduits[i])
            //    products.push(prod)
            console.log(prod)
            // x = x + 1 
            //     products.push(x , prod)

           }
           console.log("********************")

           console.log(ProductLine);
      
           
           



        })
        .catch(e => {
            console.log(e);
        });

      
    }, [])

    useEffect(() => {
        if(test){
            console.log("----------------------------");
            console.log(test)
        }
    },[])

    const handleEdit= () => {
       
        // let formData = new FormData(); 
        
        // var formData = new FormData();
        // formData.append("username", "Groucho");
        // formData.append("accountnum", 123456);
        // // console.log(formData.get()) 
        // formData.append('userAddress',userAddress)
        // formData.append('totalPrice',totalPrice)
        // formData.push({'OrderLine2':OrderLine})
        // formData.push({'paymentMode':paymentMode})
        // formData.push({'shippmentMode':shippmentMode})
        // formData.push({'orderStatus':OrderStatus})
        // var formData = new FormData();
        // formData.append('orderStatus',OrderStatus)
        var data={
           
            "orderStatus":OrderStatus

        }
        console.log( data);
        //formData.get('orderStatus')
        
        OrderService.editOrder(params.id, data)
        .then(response =>{
            console.log(response)
            console.log(response.data.data.orderStatus);
            setOrderStatus(response.data.data.orderStatus)
       if(response.data.data.orderStatus=="shipped"){
           change();
       }
          
           })
        .catch(e => {
             console.log(e);
        });
        // // setOrderStatus(data)

        setOpen(false);
      };

   

    const getOrderStat =(OrderStatus)=>{
        let content=[];
        for( var i=0;i<OrderStatus.length;i++){
            const item=OrderStatus[i];
            console.log(item)
            content.push(<li key={item._id}>{item.type}</li>)
          
        }
        return content;


    }
   

    
    
  return (
    <>
        <section>
          <div className="ext-gap bluesh high-opacity">
            <div
              className="content-bg-wrap"

            />
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="top-banner">
                    <h1>Donation</h1>
                    <nav className="breadcrumb">
                      <a className="breadcrumb-item" href="/">
                        Shop
                      </a>
                      <span className="breadcrumb-item active">Orders</span>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>





          <div className="gap100">
              {/* <div className="container">
                  <div className="row">
                      <div className="col-lg-7 col-lg-12">
                          <div className="checkout-meta"> */}
                          <Container>
                              
                              <CartContainer>
                              <h4>Detail Order </h4>

                             
                                  {orderdetail ? (
                                      <div className="full-postmeta">
                                           <TableContainer component={Paper}>
                                                                 <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                             <thead>
                                                                 <tr >
                                                                 <th  scope="col">User name :</th>
                                                                 <th  scope="col">Date of Purchased :</th>
                                                                 
                                                                 <th  scope="col">Total price :</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                           
                                                                  <tr  >
                                                                  <td>{orderdetail.data.userName}</td>
                                                                  <td>{new Date(orderdetail.data.createdAt).toLocaleDateString()}</td>
                                                                  <td>{orderdetail.data.totalPrice}</td>
                                                          
                                                         </tr>
                     

                                                            </tbody>
                                                             </Table>
                                                             </TableContainer>
                                         


                                         


                                         
                                          <span className="cat-heading">	*
                                          <a href="#" title>ITEMS IN YOUR ORDER :</a>
                                          <div >
                                                          <div className="full-postmeta">
                                                           
                                                              {/* <TableContainer component={Paper}>
                                                                 <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                             <thead>
                                                                 <tr >
                                                                 <th  scope="col">Product Name:</th>
                                                                
                                                                 
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                               
                                                            {products.map((item,i) => {
                                                                 return(
                                                            
                                           
                                                               <tr key={item[i]._id} >
                                                                  <td>{item[i].productName}</td>
                                                         
                                                             </tr>
                                                              )
                                                             
            
                                         
                                            
                                                            })}

                     

                                                            </tbody>
                                                             </Table>
                                                             </TableContainer> */}
                                                          </div>

                                                      </div>
                                    {ProductLine?.map((item,i) => 
                                           
                                            <div key={i}>
                                            
                                        
                                               <div className="col-lg-12">
                                                  <div className="full-postmeta">
                                                      <span className="cat-heading"> Product Name:
                                                          <a href="#" title>{item.productName}</a>
                                                      </span>
                                                  </div>
                                                </div>

                                                <div className="col-lg-12">
                                                  <div className="full-postmeta">
                                                      <span className="cat-heading"> Product Img:
                                                          {/* <a href="#" title>{item.ProductImage}</a> */}
                                                          <div className="cart-avatar">
                                                 <img src={item.ProductImage} alt width={60} height={60} />
                                                    </div>
                                                      </span>
                                                  </div>
                                                </div>

                                                <div className="full-postmeta">
                                                      <span className="cat-heading"> Product Price:
                                                          <a href="#" title>${item.productPrice}</a>
                                                      </span>
                                                </div>
                                                {/* <div className="full-postmeta">
                                                      <span className="cat-heading"> Quantity: 
                                                           <a href="#" title>{orderdetail?.data.orderline[0].quantity}</a> 
                                                       </span>
                                                  </div> */}

                                                </div>
                                                  )}
                                                        {/* <div>
                                                  <div className="prod-avatar">

                                                      <ul className="slider-for-gold">
                                                          <li><img src={item.ProductImage} alt height={50} /></li>

                                                      </ul>

                                                  </div>

                                              </div> */}
                                                        {/* <div className="full-postmeta">
                                                      <span className="cat-heading"> Product Price:
                                                          <a href="#" title>${item .productPrice}</a>
                                                      </span>
                                                  </div> */}
                                                  {/* <div className="full-postmeta">
                                                      <span className="cat-heading"> Quantity: */}
                                                          {/* <a href="#" title>{orderdetail?.data.orderline[0].quantity}</a> */}
                                                      {/* </span>
                                                  </div>
                                              </div>
                                              </div> */}

                                              
    
                                       
                                          </span> 

                                          <div >
                                              <div >
                                                  <span className="cat-heading">Payment :
                                                      <div >
                                                          <div className="full-postmeta">
                                                           
                                                              <TableContainer component={Paper}>
                                                                 <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                             <thead>
                                                                 <tr >
                                                                 <th  scope="col">Payment Mode:</th>
                                                                
                                                                 
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                            
                                           
                                                                  <tr key={orderdetail.data._id} >
                                                                  <td>{orderdetail?.data.paymentMode}</td>
                                                         
                                                         </tr>
                     

                                                            </tbody>
                                                             </Table>
                                                             </TableContainer>
                                                          </div>

                                                      </div>

                                                  </span>
                                              </div>
                                              <div>
                                                  <span >	<span className="cat-heading">Shippment:</span>
                                                      
                                                          <div className="full-postmeta">
                                                          <TableContainer component={Paper}>
                                                                 <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                             <thead>
                                                                 <tr >
                                                                 <th  scope="col">Shippment Mode:</th>
                                                                 <th  scope="col">Shippment Address:</th>
                                                                 
                                                                 
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                            
                                           
                                                                  <tr key={orderdetail.data._id} >
                                                                  <td>{orderdetail?.data.shippmentMode}</td>
                                                                  <td>{orderdetail?.data.userAddress}</td>
                                
                                
                                 
                                                             
                       
                        
                                                         </tr>
                     

                                                            </tbody>
                                                             </Table>
                                                             </TableContainer>

                                                             
                                                          
                                                          

                                                      </div>

                                                  </span>
                                              </div>
                                              <div >
                                                  <span ><span className="cat-heading">order Status:</span>
                                                      <div >
                                                          <div className="full-postmeta">
 
                                                                  {/* <ul>{getOrderStat(orderdetail?.data.orderStatus)}</ul> */}
                                                                  <TableContainer component={Paper}>
                                                                 <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                             <thead>
                                                                 <tr >
                                                                 <th  scope="col">Date:</th>
                                                                 <th  scope="col">type:</th>
                                                                 
                                                                 <th  scope="col">
                                                                      <Button onClick={handleClickOpen}>Edit</Button>
                                                                      <Dialog open={open} onClose={handleClose}>
                                                                          <DialogTitle>Edit Order Status</DialogTitle>
                                                                          <DialogContent>
                                                                              <DialogContentText>
      
                                                                                  To edit order status, please enter your order status ("ordered", "packed", "shipped", "delivered") here. We
                                                                                  will send updates occasionally.
                                                                              </DialogContentText>
                                                                              <TextField
                                                                                  autoFocus
                                                                                  margin="dense"
                                                                                  id="orderStatus"
                                                                                  label="order Status:"
                                                                                  type="name"
                                                                                  value={OrderStatus}
                                                                                  name="orderStatus"
                                                                                  onChange={(e) => handleNameChange(e)}
                                                                                  fullWidth
                                                                                  variant="standard"
                                                                              />
                                                                          </DialogContent>
                                                                          <DialogActions>
                                                                              <Button onClick={handleClose}>Cancel</Button>
                                                                              <Button onClick={handleEdit}>save</Button>
                                                                          </DialogActions>
                                                                      </Dialog>
                                                                </th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                            
                                           
                                                                  
                                                              
                                                                  
                                                                   <tr  >
                                                                  <td>{new Date(orderdetail.data.createdAt).toLocaleDateString()}</td>
                                                                   <td>{OrderStatus}</td>
                                                                   </tr>
                                                                 
                                                                  
                                                                   
                                
                                
                                 
                                                             
                       
                        
                                                         
                     

                                                            </tbody>
                                                             </Table>
                                                             </TableContainer>

                                         
                                                          </div>
                                                          


                                                      </div>

                                                  </span>
                                              </div>

                                          </div>





                                      </div>
                                  ) : (
                                      <div>
                                          <br></br>
                                          <p>please !!</p>
                                      </div>

                                  )}

                            
                              </CartContainer>
                              </Container>
                    



                          {/* </div>
                      </div>
                  </div>
              </div> */}
              
          </div>




          <div className="chat-box">
        <div className="chat-head">
        <h5>AI Assistant</h5>
              <span className="status f-online" />
              <h6>Ahmed Chokri</h6>
           <div className="more">
                <span>
                  <i className="ti-more-alt" />
                </span>
                <span className="close-mesage">
                  <i className="ti-close" onClick={close} />
                </span>
              </div>
              {botTyping ? <h6>Bot Typing....</h6> : null}
            </div>
            <div className="chat-list">
              <ul className="scroll">   {chat.map((user,key) => (
                                <div key={key}>
                                    {user.sender==='bot' ?
                                        (
                                            <div>
                                            <div className= 'msgalignstart'>
                                                <BiBot className="botIcon"  /><h6 className="botmsg">{user.msg}</h6>
                                              
                                            
                                            </div>
                                            <div>
                                          {user.msg==="what is your feedback on the product received  ?"&&(
                                                  <div>
                                                      <button onClick={getimage} name="Click the Photo" defaultValue="Click an Image" className="btn btn-outline-primary" >
                                                        Take a photo
                                                        </button>
                                                <img className="mto"alt =""src={"data:image/jpeg;base64,"+m}></img>
                                                <img alt=""src={"data:image/jpeg;base64,"+y}></img>
                                                </div>
                                                )
                                              }
                                           </div>
                                           </div>
                                        )

                                        :(
                                            <div className= 'msgalignend'>
                                                <h6 className="usermsg">{user.msg}</h6><BiUser className="userIcon" />
                                            </div>
                                        )
                                    }
                                </div>
                            ))}
                </ul>
         </div>
              <form className="text-box" onSubmit={handleSubmit}>
                <textarea
                  onChange={e => setInputMessage(e.target.value)} value={inputMessage} type="text"
                />
                <Button type="submit">
                  <SendIcon></SendIcon>{" "}
                </Button>
              </form>
            </div>
          <Footer></Footer>
    
    </>
  );
}
