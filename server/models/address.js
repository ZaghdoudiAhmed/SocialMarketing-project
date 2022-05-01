const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  userName: {
      type: String,
      required: true,
      trim: true,
      
    },
    userPhone: {
      type: String,
      required: true,
      trim: true,
    },
    pinCode: {
      type: String,
      required: true,
      trim: true,
    },
    locality: {
      type: String,
      required: true,
      trim: true,
      min: 10,
      max: 100,
    },
    userAddress: {
      type: String,
      required: true,
      trim: true,
      min: 10,
      max: 100,
    },
   
    cityDistrictTown: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      required: true,
    },
   
    addressType: {
      type: String,
      required: true,
      enum: ["home", "work"],
      required: true,
    },
  });
  
  // B
  // const userAddressSchema = new mongoose.Schema(
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true,
  //       ref: "User",
  //     },
  //     address: [addressSchema],
  //   },
  //   { timestamps: true }
  // );
  
  // mongoose.model("Address", addressSchema);
  
module.exports = mongoose.model("Address", addressSchema)
  // module.exports = mongoose.model("UserAddress", userAddressSchema);