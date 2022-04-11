const mongoose = require("mongoose");
const { Schema } = mongoose;
const user = require('../models/User')
const comment = require('../models/Comment')
const blog = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    Id : String,
    title: String,
    description: String,
    image :String ,
    publisher: { type: Schema.Types.ObjectId, ref: 'users' },
    date_publish : Date,
    comments : [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    likes : Number
});
module.exports = mongoose.model("blog", blog);