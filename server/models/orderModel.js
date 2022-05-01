const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema(
{
    userName: {
        type: String,
        
        required: true,
    },
    userAddress: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref:"Address",
        type: String,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      OrderLine2: [
        {

            product: {
              type: String,
              required: true,
            },
        
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      paymentMode: {
        type: String,
        enum: [ "paid", "cancelled"],
        required: true,
      },
      
      shippmentMode:{
          type: String,
          required: true,
          enum: ["domicile", "point relais"],
          required: true,

      },
      orderStatus: [
        {
          type: {
            type: String,
            enum: ["ordered", "packed", "shipped", "delivered"],
            default: "ordered",
          },
          date: {
            type: Date,
          },
          isCompleted: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    { timestamps: true }


);
module.exports = mongoose.model("Order", orderSchema)