const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const ProductSchema  = new mongoose.Schema({
    // fileName: {
    //     type: 'String',
    //     required: false,
    // },
    userName: {
        type: 'String',
      
        trim: true,
        
    },
    productName: {
        type: 'String',
        required: false,
        trim: true,
        
    },
    productDesc: {
        type: 'String',
        trim: true,
    },
    productPrice: {
        type: Number,
        required: false,
    },
    productCategory: {
        type: 'String',
        trim: true,
    },
    productQty: {
        type: Number,
        required: false,
    },
    ProductImage:{
        type : Object,
        required : false
    },
    ProductPath: {
        type: 'String',
        trim: true,
    },
    sold:{
        type: Number
       
    }
},
{ timestamps: true }
);

// ProductSchema.index({ productName: 'text' });
const Product = mongoose.model('produit', ProductSchema);

module.exports = Product;