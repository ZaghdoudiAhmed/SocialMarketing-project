const Payment =require('../models/paymentModel')
const Product = require('../models/productModel')

const paymentCtrl ={
    getPayments: async(req, res) =>{
        try {
            const payments = await Payment.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {
            let newPayment = new Payment();
            newPayment.userName= req.body.userName;
            newPayment.userEmail= req.body.userEmail;
            newPayment.paymentID= req.body.paymentID;
            newPayment.totalPrice= req.body.totalPrice;
            newPayment.status= req.body.status;
            await newPayment.save();
            res.json({
                successMessage: `${req.body.paymentID} was created`,
                newPayment,
            });
        
            // const { paymentID} = req.body;
            // console.log(req.body);
            // const {user_id, name, email} = user;

            // const payment = new Payment({
            //     user_id: _id, name, email, cart, paymentID, address
            // })
            // await payment.save();
            // console.log(payment)
            // res.json({msg: "Payment Succes!"})

            // cart.filter(item => {
            //     return sold(item._id, item.quantity, item.sold)
            // })

            
          
            
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({msg: err.message})
        }
    }
}
const sold = async (id, quantity, oldSold) =>{
    await Product.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}


module.exports = paymentCtrl