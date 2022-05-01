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

import { map } from 'leaflet';

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
    let dispatch = useDispatch()
    let {ProductLine} = useSelector((state)=>state)
    const[orderdetail,setOrderdetail]= useState("");
    const[loaddetail,setLoadDetail] = useState("");
    const[loadprod,setLoadProd] = useState("");
    const [prod,setProduct]=useState("");
    const [idProd,setIdProd]=useState("");
    const [OrderStatus, setOrderStatus] = useState("");
    const [Orderd, setOrderd] = useState("");
    const [OrderLine,setOrderLine]=useState();
    const [test,setTest]=useState();
    var products=[];
    var idProduits=[];
    let x = 0 
    const params = useParams();
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
            setOrderStatus(response.data.data.orderStatus)
            console.log(response.data.data.orderStatus)

            setOrderLine(response.data.data.OrderLine2)
            console.log(response.data.data.OrderLine2)
            
            for(var i=0;i<(response.data.data.OrderLine2).length;i++){
                    const item=(response.data.data.OrderLine2);
                    console.log(item);
                    
                    idProduits.push(item[i].product)
                    //retrieveProductByID(idProduits[i])
                    // console.log(prod);
                   
                    
            
                }

           console.log(idProduits)
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
        //    let arr = Object.keys(products)
        // console.log(typeof products)
        // console.log(products.length)
        // console.log(typeof products)
        // for (const key of products.keys()) {
        //     console.log(key);
        //   }
        //  console.log("before map")
        //  products.map((item,i)=>{
              
        //         console.log(products[item], item)
              
        //   })
        //  console.log("after map")
        //  console.log(products[0])
         // products.forEach(function(item, index, array) {
        //     console.log("ha")
        //     console.log(item, index);
        //   });
        //    products?.forEach(element => {
        //        console.log(element)
        //    });
        //    setTest(products)
        //    console.log(products.length)
        //    for(var i=0;i<products.length;i++){
        //     const item =products;
        //     // console.log(item[i]);
            
        //}

            
           
           



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
          <Navbar></Navbar>





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
                                                                 
                                                                 <th  scope="col"><Button>Edit</Button></th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                            
                                           
                                                                  <tr  >
                                                                 {/* <td>{new Date(OrderStatus[0].date).toLocaleDateString()}</td>
                                                                  <td>{OrderStatus[0].type}</td>
                                                                   */}
                                
                                
                                 
                                                             
                       
                        
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





          <Footer></Footer>
    
    </>
  );
}
