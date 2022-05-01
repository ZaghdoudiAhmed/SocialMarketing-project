import React , { useEffect, useState }from 'react';
import Footer from './Footer';
import Navbar from './NavBar';
import { DataGrid } from '@mui/x-data-grid';
import OrderService from '../services/Order.service';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from "styled-components";
import { large, medium  } from "../../responsive.js";
import { Link } from 'react-router-dom';







export default function Order() {
  const Container = styled.div`
  margin: 2rem 8rem;
  display: flex;
  gap: 2rem;
  ${large({ margin: "2rem 1rem", gap: "0" })}
  ${medium({ flexDirection: "column" })}
`;
const MainContainer = styled.div`
  background-color: whitesmoke;
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


  const [loadOrder,setLoadOrder]=useState("");
  const [orders,setOrder]=useState("");
  const [userName,setUserName]=useState("")
  const [idOrder,setIdOrder]=useState("")
  const [CreateDate,setDate]=useState("")
  const[paymentMode,setPaymentMode]=useState("")
  const [totalPrice,setTotalPrice]=useState("")
  const [OrderStatus,setOrderStatus]=useState("")
  const or=[]
  useEffect(() => {
    OrderService.getOrder()
    .then(response =>{
      console.log(response.data)
      setOrder(response.data)
      setLoadOrder("done!")
      { orders.data.forEach(function (item ){
        
        setDate(item.createdAt)
        setIdOrder(item._id)
        setPaymentMode(item.paymentMode)
        setTotalPrice(item.totalPrice)
        setOrderStatus(item.orderStatus[0].type)
  
        setUserName(item.userName)
        
       
     
     })
      }
      
    })
  }, [loadOrder])

  const getListOrder=(orders)=>{
    let content=[];
    for(var i=0;i<orders.length; i++){
      const item =orders[i];
      console.log(item)
    }
    return content;

  }
 

  

  return (
    <>
    <Navbar></Navbar>
   <MainContainer>
    <div className="checkout-total">
                      <h4>Order Details</h4>
   
    
    <div >
      <Container>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
    
                <thead>
                    <tr >
                        <th  scope="col">user Name </th>
                        {/* <th>order ID </th> */}
                        <th scope="col">Date of Purchased</th>
                        <th scope="col">Total Price</th>

                        <th scope="col">Payment Mode</th>
                        {/* <th scope="col">Order Status</th> */}
                        <th scope="col">Order Detail</th>
                    </tr>
                </thead>
               
                  
                     <TableBody>
                     {orders.data?.map((item,i)=>{
                       return (
                        <tr key={orders.data[i]._id} >
                                
                                
                                 
                        <td>{orders.data[i].userName}</td>
                        {/* <td>{idOrder}</td> */}
                        <td>{new Date(orders.data[i].createdAt).toLocaleDateString()}</td>
                        <td>{orders.data[i].totalPrice}</td>
                        <td>{orders.data[i].paymentMode}</td>
                        {/* <td>{orders.data[i].OrderStatus}</td> */}
                        <td><Link    to={`/detailorder/${orders.data[i]._id}`}><Button>view detail</Button></Link></td>
   
                        
                         </tr>
                       )
                     
                      })}
                      </TableBody>

                  
               
              
                    {/* {
                      orders?.map((item,i) =>
                       `/updateProd/${item?._id}`
                            <tr key={item._id}>
                                <td>{item.userName}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                
                            </tr>
                       
                       ) } */}
               
          
            </Table>
            </TableContainer>
            </Container>
            </div>
    </div>
    </MainContainer>
    <Footer></Footer>
    
    </>
  );
}
