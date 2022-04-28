const mongoose = require("mongoose");
const { Schema } = mongoose;
const compaign = mongoose.Schema({
    Id : String,
    title: String,
    description: String,
    nbr_total_dons: Number,
    chef: String,
    type_don:String,
    lacalisation : [],
    image :String ,
    date_debut :Date,
    date_fin :Date,
    Creator :{ type: Schema.Types.ObjectId, ref: 'users' },
    members : [{ type: Schema.Types.ObjectId, ref: "users", default: [] }],

});
module.exports = mongoose.model("compaign", compaign);