const mongoose = require("mongoose");
const { Schema } = mongoose;
const ad = mongoose.Schema({
    title: String,
    description: String,
    image :String ,
    publisher: { type: Schema.Types.ObjectId, ref: 'users' },
    link : {
        type: String
    },
    expiresAt : {
        type: Date,
        //expires after 1 month
        expires: '1m',
        default: Date.now
    },
    clickes : {
        type :Number,
        default : 0
    },
    views : {
        type :Number,
        default : 0
    },
    category : String
});
module.exports = mongoose.model("Ads", ad);