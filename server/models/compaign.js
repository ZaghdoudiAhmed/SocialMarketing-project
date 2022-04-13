const mongoose = require("mongoose");
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
});
module.exports = mongoose.model("compaign", compaign);