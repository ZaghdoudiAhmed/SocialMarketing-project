const Order = require("../models/orderModel");
const Payment =require('../models/paymentModel');
const User =require('../models/user');
const Address = require("../models/address");
const orderCtrl={
    createOrder:async (req,res)=>{

        try{
          console.log(req.body)
            // req.body.orderStatus = [
            //     {
            //       type: "ordered",
            //       date: new Date(),
            //       isCompleted: true,
            //     },
            //     {
            //       type: "packed",
            //       isCompleted: false,
            //     },
            //     {
            //       type: "shipped",
            //       isCompleted: false,
            //     },
            //     {
            //       type: "delivered",
            //       isCompleted: false,
            //     },
            //   ];
            

            let newOrder= new Order(req.body);
           console.log(newOrder)
            await newOrder.save();
            res.json({
                successMessage: `order was created`,
                newOrder,
              });
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
       

        
    },
    getOrder:async (req,res)=>{
      try{
        const orders =await Order.find()
        .then(data =>{
          console.log(data)
          return res.json({data})
        })
      //   res.json({
      //     // status: 'success',
      //     // result: orders.length,
      //     // orders: orders
      //     orders
      // })

      } catch(err){
        return res.status(500).json({msg: err.message})

      }

    },
    getOrderById:async (req,res)=>{
      try{
        const id= req.params.id;
      
        await Order.findById(id)
        .then(data =>{
          // if(!data){
          //   return res.status(404).json({msg:'order is not found !'})
          // }else{
            return res.json({data})
          
        })

      }catch(err){
        return res.status(500).json({msg: err.message})
      }

    },
    retreiveOrderByUser:async (req,res)=>{
      try{
        const nomuser=req.params.name;
        await Order.find({userName:nomuser})
        .then(data =>{
          return res.json({data})
        })

      } catch(err){
        return res.status(500).json({msg: err.message})
      }
    },
    editOrderStatus:async(req,res)=>{
      try{
        
        const id =req.params.id;
        var nom=req.body.userName;
        console.log(nom)
        var data={
          "userName":req.body.userName,
          "userAddress":req.body.userAddress,
          "totalPrice":req.body.totalPrice,
          "OrderLine2":req.body.OrderLine2,
          "paymentMode":req.body.paymentMode,
          "shippmentMode":req.body.shippmentMode,
          "orderStatus":req.body.orderStatus
        }
        
       
        await Order.updateOne({ "_id": id },{ $set:data})
         console.log(data)
         res.json({
          successMessage: 'order successfully updated',
      }); 
      //  .then(data =>{
      //     console.log(orderstatus)
      //     return 
         
      //   })

      }catch(err){
        console.log(err)
        return res.status(500).json({msg: err.message})
      }
    },
    editStatus:async(req,res)=>{
      try{
        const id =req.params.id;
        var orderstatus=req.body.orderStatus;
        console.log(orderstatus)
        await Order.updateOne({ "_id": id },{ $set:{orderStatus:orderstatus}})
       .then(data =>{
         Order.findById(id)
        .then(data =>{
          return res.json({data})
        })
          
        })
    //     res.json({
    //       orderstatus
    //  }); 

      }catch(err){
        console.log(err)
        return res.status(500).json({msg: err.message})
      }
    }
}
module.exports=orderCtrl;