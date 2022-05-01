const Address = require("../models/address");
// const UserAddress = require("../models/address");
const User=require("../models/user");

const addressCtrl={
  createAddress:async (req,res)=>{
    // console.log(req.body);
    try{
     
     
      let newAddress =new Address();
      newAddress.userName = req.body.userName;
      newAddress.userPhone=req.body.userPhone;
      newAddress.userAddress=req.body.userAddress;
      newAddress.locality=req.body.locality;
      newAddress.cityDistrictTown=req.body.cityDistrictTown;
      newAddress.state=req.body.state;
      newAddress.pinCode=req.body.pinCode;
      newAddress.addressType=req.body.addressType;
      
      
      

      
      await newAddress.save();
     
      res.json({
        successMessage: `${req.body.userAddress} was created`,
        newAddress,
      });

    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  },
  retreiveAddressById: async(req, res) =>{
    try{
      const id=req.params.id;
      await Address.findById(id)
      .then(data =>{
        if(!data){
          return res.status(404).json({msg:'address is not found !'})
      }else{
        return res.json({data})

      }

      })

    } catch(err){
      return res.status(500).json({msg: err.message})
  }
  }
}
module.exports=addressCtrl
// exports.addAddress = (req, res) => {
//     //return res.status(200).json({body: req.body})
//     const { payload } = req.body;
//     if (payload.address) {
//       if (payload.address._id) {
//         UserAddress.findOneAndUpdate(
//           { user: req.user._id },
//           {
//             $push: {
//               address: payload.address,
//             },
//           },
//           { new: true, upsert: true }
//         ).exec((error, address) => {
//           if (error) return res.status(400).json({ error });
//           if (address) {
//             res.status(201).json({ address });
//           }
//         });
//       }
//     } else {
//       res.status(400).json({ error: "Params address required" });
//     }
//   };
  
//   exports.getAddress = (req, res) => {
//     UserAddress.findOne({ user: req.user._id }).exec((error, userAddress) => {
//       if (error) return res.status(400).json({ error });
//       if (userAddress) {
//         res.status(200).json({ userAddress });
//       }
//     });
//   };