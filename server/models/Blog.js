const mongoose = require("mongoose");
const { Schema } = mongoose;
const blog = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    Id : String,
    title: String,
    description: String,
    image :String ,
    publisher: { type: Schema.Types.ObjectId, ref: 'users' },
    date_publish : Date,
    comments : [{ type: Schema.Types.ObjectId, ref: 'commentaires' }],
    likes : Number
});
module.exports = mongoose.model("blog", blog);