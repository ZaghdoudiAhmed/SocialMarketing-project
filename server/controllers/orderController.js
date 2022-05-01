const Order = require("../models/orderModel");
const Payment =require('../models/paymentModel');
const User =require('../models/user');
const Address = require("../models/address");
const orderCtrl={
    createOrder:async (req,res)=>{

        try{
        //  console.log(req.body)
            req.body.orderStatus = [
                {
                  type: "ordered",
                  date: new Date(),
                  isCompleted: true,
                },
                {
                  type: "packed",
                  isCompleted: false,
                },
                {
                  type: "shipped",
                  isCompleted: false,
                },
                {
                  type: "delivered",
                  isCompleted: false,
                },
              ];
            

            const newOrder= new Order(req.body);
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

    }
}
module.exports=orderCtrl;