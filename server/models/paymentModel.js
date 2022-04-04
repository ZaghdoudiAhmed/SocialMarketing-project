const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const PaymentSchema  = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    paymentID:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    cart:{
        type: Array,
        default: []
    },
    status:{
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
);


const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;